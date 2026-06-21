const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

loadDotenv(".env");
loadDotenv(".env.local");

const options = parseArgs(process.argv.slice(2));
const deckId = options.deck || process.env.DECK_ID || "norwegian-a1";
const audioPrefix = stripSlashes(options.prefix || process.env.AUDIO_PREFIX || "audio/v1");
const outputFormat = options.outputFormat || process.env.ELEVENLABS_OUTPUT_FORMAT || "mp3_44100_128";
const modelId = options.model || process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";
const force = parseBoolean(options.force || process.env.FORCE_AUDIO);
const dryRun = parseBoolean(options.dryRun || process.env.DRY_RUN);
const limit = parsePositiveInt(options.limit || process.env.LIMIT);
const delayMs = parsePositiveInt(options.delayMs || process.env.ELEVENLABS_DELAY_MS) || 250;
const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;
const elevenLabsVoiceName =
  options.voiceName ||
  process.env.ELEVENLABS_VOICE_NAME ||
  "Mia Starset- Clear and Friendly";
let elevenLabsVoiceId = options.voiceId || process.env.ELEVENLABS_VOICE_ID;

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

  const deck = loadDeckMeta(deckId);
  const defaultLanguageCode = getDefaultLanguageCode(deck.language);
  const languageCode = options.languageCode || defaultLanguageCode || process.env.ELEVENLABS_LANGUAGE_CODE || "";
  const records = loadDeckRecords(deck);
  const targets = limit ? records.slice(0, limit) : records;

  if (!elevenLabsVoiceId && !dryRun) {
    elevenLabsVoiceId = await resolveVoiceId(elevenLabsApiKey, elevenLabsVoiceName);
  }

  console.log(`Deck: ${deck.id}`);
  console.log(`Words: ${targets.length}${limit ? ` of ${records.length}` : ""}`);
  console.log(`Storj bucket: ${storjConfig.bucket || "dry-run"}`);
  console.log(`Storage prefix: ${audioPrefix}/${deck.id}/`);
  console.log(`ElevenLabs voice: ${elevenLabsVoiceName} (${elevenLabsVoiceId || "dry-run"})`);
  console.log(`Model: ${modelId}`);
  if (languageCode) console.log(`Language code: ${languageCode}`);
  if (dryRun) console.log("Dry run: no audio will be generated or uploaded.");

  let generated = 0;
  let skipped = 0;

  for (const [index, record] of targets.entries()) {
    const objectKey = `${audioPrefix}/${deck.id}/${record.id}.mp3`;
    const exists = dryRun ? false : await storjObjectExists(objectKey);

    if (exists && !force) {
      skipped += 1;
      console.log(`[${index + 1}/${targets.length}] skip ${record.id}: already exists`);
      continue;
    }

    console.log(`[${index + 1}/${targets.length}] generate ${record.id}: ${record.text}`);

    if (dryRun) continue;

    const audio = await createSpeech({
      apiKey: elevenLabsApiKey,
      voiceId: elevenLabsVoiceId,
      text: record.text,
      outputFormat,
      modelId,
      languageCode
    });

    await putStorjObject(objectKey, audio, {
      "content-type": "audio/mpeg",
      "cache-control": "public, max-age=31536000, immutable",
      "x-amz-meta-deck-id": deck.id,
      "x-amz-meta-word-id": record.id,
      "x-amz-meta-provider": "elevenlabs",
      "x-amz-meta-voice-id": elevenLabsVoiceId,
      "x-amz-meta-model-id": modelId
    });

    generated += 1;
    await sleep(delayMs);
  }

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

function loadDeckMeta(id) {
  global.window = {};
  require(path.join(rootDir, "decks", "index.js"));

  const deck = global.window.DECK_INDEX.find(item => item.id === id);
  if (!deck) throw new Error(`Deck not found: ${id}`);
  return deck;
}

function loadDeckRecords(deck) {
  const csvPath = path.join(rootDir, deck.path);
  const rows = parseCsv(fs.readFileSync(csvPath, "utf8").trim());
  const headers = rows.shift() || [];

  return rows
    .map((row, index) => {
      const record = Object.fromEntries(
        headers.map((header, headerIndex) => [header.trim(), row[headerIndex] || ""])
      );

      return {
        id: record[deck.columns.wordId]?.trim() || `${deck.id}-${index + 1}`,
        text: record[deck.columns.script]?.trim() || ""
      };
    })
    .filter(record => record.id && record.text);
}

async function resolveVoiceId(apiKey, voiceName) {
  const response = await fetch("https://api.elevenlabs.io/v2/voices", {
    headers: { "xi-api-key": apiKey }
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`Could not list ElevenLabs voices (${response.status}). ${details}`);
  }

  const data = await response.json();
  const voices = data.voices || [];
  const target = normalizeName(voiceName);
  const exact = voices.find(voice => normalizeName(voice.name) === target);
  const partial = voices.find(voice => normalizeName(voice.name).includes(target));
  const voice = exact || partial;

  if (!voice) {
    throw new Error(
      `Could not find ElevenLabs voice "${voiceName}". Add it to your voices or set ELEVENLABS_VOICE_ID.`
    );
  }

  return voice.voice_id;
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
      throw error;
    }

    return Buffer.from(await response.arrayBuffer());
  });
}

async function storjObjectExists(objectKey) {
  const response = await retry(() => signedS3Request({
    method: "HEAD",
    objectKey,
    headers: {}
  }), { label: `Storj HEAD ${objectKey}` });

  if (response.status === 200) return true;
  if (response.status === 404 || response.status === 403) return false;

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
  return error.status === 408 || error.status === 425 || error.status === 429 || error.status >= 500;
}

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i += 1) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === "\"" && inQuotes && nextChar === "\"") {
      field += "\"";
      i += 1;
    } else if (char === "\"") {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  row.push(field);
  rows.push(row);
  return rows.filter(values => values.some(value => value.trim() !== ""));
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
    norwegian: "",
    spanish: "es",
    swedish: "sv"
  };

  return codes[language] || "";
}

function normalizeName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s*-\s*/g, "-")
    .replace(/\s+/g, " ")
    .trim();
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
