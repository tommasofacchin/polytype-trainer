// Generates audio for the lesson curriculum (decks/lessons-*.js): every example
// sentence in a lesson's explanation, plus the correct answer of every exercise
// that has something in the course's language to pronounce. Mirrors
// generate-example-audio.cjs (voice/model/language-code resolution, Storj
// upload, retry, stop-on-quota) but reads lessons instead of the word decks.
//
// What is speakable, how it is cleaned up before it reaches the voice, and the
// key each clip is stored under all come from decks/lesson-audio.js - the same
// file js/lessons.js loads in the browser to find a clip. Never duplicate that
// logic here: a key derived two ways is a clip the player can never hear.
//
// Objects land at <prefix>/lessons/<courseId>/<key>.mp3, one flat folder per
// course, because the key is a hash of the sentence rather than a lesson id -
// two lessons using the same sentence share one clip.
//
// Usage:
//   node scripts/generate-lesson-audio.cjs --course=norwegian
//   node scripts/generate-lesson-audio.cjs --course=chinese --dryRun=true
//   node scripts/generate-lesson-audio.cjs                  (every course with lessons)
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

loadDotenv(".env");
loadDotenv(".env.local");

const lessonAudio = require(path.join(rootDir, "decks", "lesson-audio.js"));

const options = parseArgs(process.argv.slice(2));
const audioPrefix = stripSlashes(options.prefix || process.env.AUDIO_PREFIX || "audio/v1");
const outputFormat = options.outputFormat || process.env.ELEVENLABS_OUTPUT_FORMAT || "mp3_44100_128";
const force = parseBoolean(options.force || process.env.FORCE_AUDIO);
const dryRun = parseBoolean(options.dryRun || process.env.DRY_RUN);
const limit = parsePositiveInt(options.limit || process.env.LIMIT);
const delayMs = parsePositiveInt(options.delayMs || process.env.ELEVENLABS_DELAY_MS) || 250;
const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;

// Which courses to walk. Defaults to every course that ships lessons, so a bare
// run brings the whole curriculum up to date.
const requestedCourses = parseList(options.course || process.env.COURSE);

const storjConfig = {
  endpoint: stripTrailingSlash(options.storjEndpoint || process.env.STORJ_ENDPOINT || "https://gateway.storjshare.io"),
  region: options.storjRegion || process.env.STORJ_REGION || "us-east-1",
  accessKeyId: options.storjAccessKeyId || process.env.STORJ_ACCESS_KEY_ID,
  secretAccessKey: options.storjSecretAccessKey || process.env.STORJ_SECRET_ACCESS_KEY,
  bucket: options.storjBucket || process.env.STORJ_BUCKET
};

main().catch(error => {
  console.error(error.message || error);
  process.exitCode = 1;
});

async function main() {
  assertRuntime();
  assertEnv();

  const lessonsByCourse = loadLessons();
  const courses = pickCourses(lessonsByCourse);

  console.log(`Courses: ${courses.join(", ")}`);
  console.log(`Storj bucket: ${storjConfig.bucket || "dry-run"}`);
  if (dryRun) console.log("Dry run: no audio will be generated or uploaded.");

  let generated = 0;
  let skipped = 0;

  for (const courseId of courses) {
    const languageCode = options.languageCode || getDefaultLanguageCode(courseId) || "";
    const modelId = options.model || getModelIdForLanguage(courseId) || process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";
    const voiceId = options.voiceId || getVoiceIdForLanguage(courseId);

    if (!voiceId && !dryRun) throw new Error(`No ElevenLabs voice configured for ${courseId}.`);

    const { items } = lessonAudio.collectCourse(courseId, lessonsByCourse[courseId]);
    const targets = limit ? items.slice(0, limit) : items;

    console.log("");
    console.log(`=== ${courseId} ===`);
    console.log(`Lines: ${targets.length}${limit ? ` of ${items.length}` : ""}`);
    console.log(`Storage prefix: ${audioPrefix}/lessons/${courseId}/`);
    console.log(`ElevenLabs voice: ${voiceId || "dry-run"}`);
    console.log(`Model: ${modelId}`);
    if (languageCode) console.log(`Language code: ${languageCode}`);

    for (const [index, target] of targets.entries()) {
      const objectKey = `${audioPrefix}/lessons/${courseId}/${target.key}.mp3`;
      const existing = dryRun ? { exists: false } : await readStorjObjectMeta(objectKey);
      const isCurrent = existing.exists &&
        existing.voiceId === voiceId &&
        existing.modelId === modelId;

      if (isCurrent && !force) {
        skipped += 1;
        console.log(`[${index + 1}/${targets.length}] skip ${target.key}: already current`);
        continue;
      }

      console.log(`[${index + 1}/${targets.length}] generate ${target.key}: ${target.text}  <${target.source}>`);

      if (dryRun) continue;

      let audio;
      try {
        audio = await createSpeech({
          apiKey: elevenLabsApiKey,
          voiceId,
          text: target.text,
          outputFormat,
          modelId,
          languageCode
        });
      } catch (error) {
        if (error.quotaExceeded) {
          console.error(`Stopping: ElevenLabs quota exhausted. ${error.message}`);
          console.log("");
          console.log(`Done. Generated: ${generated}. Skipped: ${skipped}. Stopped early on quota.`);
          return;
        }
        throw error;
      }

      await putStorjObject(objectKey, audio, {
        "content-type": "audio/mpeg",
        "cache-control": "public, max-age=31536000, immutable",
        "x-amz-meta-course-id": courseId,
        "x-amz-meta-line-key": target.key,
        "x-amz-meta-provider": "elevenlabs",
        "x-amz-meta-voice-id": voiceId,
        "x-amz-meta-model-id": modelId
      });

      generated += 1;
      await sleep(delayMs);
    }
  }

  console.log("");
  console.log(`Done. Generated: ${generated}. Skipped: ${skipped}.`);
}

function assertRuntime() {
  if (typeof fetch !== "function") {
    throw new Error("Node 18+ is required because this script uses global fetch.");
  }
}

function assertEnv() {
  if (dryRun) return;

  const missing = [];
  if (!elevenLabsApiKey) missing.push("ELEVENLABS_API_KEY");
  if (!storjConfig.endpoint) missing.push("STORJ_ENDPOINT");
  if (!storjConfig.region) missing.push("STORJ_REGION");
  if (!storjConfig.accessKeyId) missing.push("STORJ_ACCESS_KEY_ID");
  if (!storjConfig.secretAccessKey) missing.push("STORJ_SECRET_ACCESS_KEY");
  if (!storjConfig.bucket) missing.push("STORJ_BUCKET");

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

// Every decks/lessons-*.js at once, merged the same additive way the browser
// merges them - so a course is present here exactly when it is present there.
function loadLessons() {
  global.window = global.window || {};
  for (const file of fs.readdirSync(path.join(rootDir, "decks"))) {
    if (!/^lessons-.+\.js$/.test(file)) continue;
    require(path.join(rootDir, "decks", file));
  }
  return global.window.POLYTYPE_LESSONS || {};
}

function pickCourses(lessonsByCourse) {
  const available = Object.keys(lessonsByCourse).filter(id => (lessonsByCourse[id] || []).length);
  if (!requestedCourses.length) return available;

  const unknown = requestedCourses.filter(id => !available.includes(id));
  if (unknown.length) {
    throw new Error(`No lessons for: ${unknown.join(", ")}. Available: ${available.join(", ")}`);
  }
  return requestedCourses;
}

function parseList(value) {
  if (!value || value === "true") return [];
  return String(value).split(",").map(item => item.trim().toLowerCase()).filter(Boolean);
}

async function createSpeech({ apiKey, voiceId, text, outputFormat, modelId, languageCode }) {
  const url = new URL(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`);
  url.searchParams.set("output_format", outputFormat);

  const body = {
    text,
    model_id: modelId
  };

  if (languageCode) body.language_code = languageCode;

  return retry(async () => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      const error = new Error(`ElevenLabs request failed (${response.status}) for "${text}". ${details}`);
      error.status = response.status;
      error.quotaExceeded = response.status === 401 && /quota_exceeded|quota exceeded/i.test(details);
      throw error;
    }

    return Buffer.from(await response.arrayBuffer());
  });
}

// Same contract as generate-audio.cjs's copy - see the note there for why the
// stamped voice/model matter rather than mere existence.
async function readStorjObjectMeta(objectKey) {
  const response = await retry(() => signedS3Request({
    method: "HEAD",
    objectKey,
    headers: {}
  }), { label: `Storj HEAD ${objectKey}` });

  if (response.status === 404 || response.status === 403) return { exists: false };

  if (response.status === 200) {
    return {
      exists: true,
      voiceId: response.headers.get("x-amz-meta-voice-id") || "",
      modelId: response.headers.get("x-amz-meta-model-id") || ""
    };
  }

  const details = await response.text().catch(() => "");
  throw new Error(`Storj HEAD failed (${response.status}) for ${objectKey}. ${details}`);
}

async function putStorjObject(objectKey, body, headers) {
  const response = await retry(() => signedS3Request({
    method: "PUT",
    objectKey,
    headers,
    body
  }), { label: `Storj PUT ${objectKey}` });

  if (response.ok) return;

  const details = await response.text().catch(() => "");
  throw new Error(`Storj upload failed (${response.status}) for ${objectKey}. ${details}`);
}

async function signedS3Request({ method, objectKey, headers, body = Buffer.alloc(0) }) {
  const endpoint = new URL(storjConfig.endpoint);
  const canonicalUri = `/${encodePathSegment(storjConfig.bucket)}/${encodeObjectKey(objectKey)}`;
  const url = new URL(canonicalUri, `${endpoint.protocol}//${endpoint.host}`);
  const payloadHash = sha256Hex(body);
  const now = new Date();
  const amzDate = toAmzDate(now);
  const dateStamp = amzDate.slice(0, 8);

  const requestHeaders = normalizeHeaders({
    ...headers,
    host: endpoint.host,
    "x-amz-content-sha256": payloadHash,
    "x-amz-date": amzDate
  });

  const signedHeaders = Object.keys(requestHeaders).sort().join(";");
  const canonicalHeaders = Object.keys(requestHeaders)
    .sort()
    .map(key => `${key}:${requestHeaders[key]}\n`)
    .join("");
  const canonicalRequest = [
    method,
    canonicalUri,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash
  ].join("\n");
  const credentialScope = `${dateStamp}/${storjConfig.region}/s3/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest)
  ].join("\n");
  const signingKey = getSignatureKey(storjConfig.secretAccessKey, dateStamp, storjConfig.region, "s3");
  const signature = hmacHex(signingKey, stringToSign);
  const authorization =
    `AWS4-HMAC-SHA256 Credential=${storjConfig.accessKeyId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const finalHeaders = {
    ...requestHeaders,
    authorization
  };

  delete finalHeaders.host;

  return fetch(url, {
    method,
    headers: finalHeaders,
    body: method === "HEAD" ? undefined : body
  });
}

async function retry(task, { attempts = 5, label = "request" } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      const retryable = isRetryableError(error);
      if (!retryable || attempt === attempts) break;
      const delayMs = 1000 * attempt;
      console.warn(`${label} failed (${error.message || error}). Retrying in ${delayMs}ms...`);
      await sleep(delayMs);
    }
  }

  throw lastError;
}

function isRetryableError(error) {
  if (!error || error.status === undefined) return true;
  if (error.quotaExceeded) return false;
  return error.status === 408 || error.status === 425 || error.status === 429 || error.status >= 500;
}

function normalizeHeaders(headers) {
  return Object.fromEntries(
    Object.entries(headers)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => [
        key.toLowerCase(),
        String(value).trim().replace(/\s+/g, " ")
      ])
  );
}

function sha256Hex(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function hmac(key, value) {
  return crypto.createHmac("sha256", key).update(value).digest();
}

function hmacHex(key, value) {
  return crypto.createHmac("sha256", key).update(value).digest("hex");
}

function getSignatureKey(secretKey, dateStamp, regionName, serviceName) {
  const kDate = hmac(`AWS4${secretKey}`, dateStamp);
  const kRegion = hmac(kDate, regionName);
  const kService = hmac(kRegion, serviceName);
  return hmac(kService, "aws4_request");
}

function toAmzDate(date) {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, "");
}

function encodePathSegment(value) {
  return encodeURIComponent(value).replace(/[!'()*]/g, char =>
    `%${char.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

function encodeObjectKey(objectKey) {
  return objectKey.split("/").map(encodePathSegment).join("/");
}

function parseArgs(args) {
  const parsed = {};

  for (const arg of args) {
    if (!arg.startsWith("--")) continue;

    const [key, ...valueParts] = arg.slice(2).split("=");
    parsed[toCamelCase(key)] = valueParts.length ? valueParts.join("=") : "true";
  }

  return parsed;
}

function parseBoolean(value) {
  if (value === undefined || value === null || value === "") return false;
  return /^(1|true|yes)$/i.test(String(value));
}

function parsePositiveInt(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function getDefaultLanguageCode(language) {
  const codes = {
    chinese: "zh",
    german: "de",
    italian: "it",
    japanese: "ja",
    norwegian: "no",
    spanish: "es",
    swedish: "sv"
  };

  return codes[language] || "";
}

function getVoiceIdForLanguage(language) {
  const defaults = {
    chinese: "bhJUNIXWQQ94l8eI2VUf",
    german: "qAVuy3NdMTW0CZ8uA7M9",
    italian: "BZc8d1MPTdZkyGbE9Sin",
    japanese: "WQz3clzUdMqvBf0jswZQ",
    norwegian: "uNsWM1StCcpydKYOjKyu",
    spanish: "ajOR9IDAaubDK5qtLUqQ",
    swedish: "1Iztu4UHnTb9SUjJcpS1"
  };
  const envKey = `ELEVENLABS_${String(language || "").toUpperCase()}_VOICE_ID`;

  return process.env[envKey] || defaults[language] || process.env.ELEVENLABS_VOICE_ID || "";
}

function getModelIdForLanguage(language) {
  // Same pair, same reason, as generate-audio.cjs - see the note there.
  const defaults = {
    chinese: "eleven_flash_v2_5",
    norwegian: "eleven_flash_v2_5"
  };
  const envKey = `ELEVENLABS_${String(language || "").toUpperCase()}_MODEL_ID`;

  return process.env[envKey] || defaults[language] || "";
}

function toCamelCase(value) {
  return value.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function stripSlashes(value) {
  return String(value || "").replace(/^\/+|\/+$/g, "");
}

function stripTrailingSlash(value) {
  return String(value || "").replace(/\/+$/g, "");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function loadDotenv(filename) {
  const dotenvPath = path.resolve(rootDir, filename);
  if (!fs.existsSync(dotenvPath)) return;

  for (const line of fs.readFileSync(dotenvPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    const rawValue = trimmed.slice(equalsIndex + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");

    if (!process.env[key]) process.env[key] = value;
  }
}
