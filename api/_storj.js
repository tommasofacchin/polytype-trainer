const crypto = require("crypto");

const DEFAULT_PROFILE_IMAGE_PREFIX = "profiles/v1";

function getStorjConfig() {
  return {
    endpoint: stripTrailingSlash(process.env.STORJ_ENDPOINT || "https://gateway.storjshare.io"),
    region: process.env.STORJ_REGION || "us-east-1",
    accessKeyId: process.env.STORJ_ACCESS_KEY_ID,
    secretAccessKey: process.env.STORJ_SECRET_ACCESS_KEY,
    bucket: process.env.STORJ_BUCKET,
    publicBaseUrl: stripTrailingSlash(process.env.PROFILE_IMAGE_BASE_URL || process.env.AUDIO_BASE_URL || ""),
    profileImagePrefix: stripSlashes(process.env.PROFILE_IMAGE_PREFIX || DEFAULT_PROFILE_IMAGE_PREFIX)
  };
}

function assertStorjConfig(config = getStorjConfig()) {
  const missing = [];
  if (!config.endpoint) missing.push("STORJ_ENDPOINT");
  if (!config.region) missing.push("STORJ_REGION");
  if (!config.accessKeyId) missing.push("STORJ_ACCESS_KEY_ID");
  if (!config.secretAccessKey) missing.push("STORJ_SECRET_ACCESS_KEY");
  if (!config.bucket) missing.push("STORJ_BUCKET");
  if (!config.publicBaseUrl) missing.push("PROFILE_IMAGE_BASE_URL or AUDIO_BASE_URL");
  if (missing.length) {
    const error = new Error(`Missing required Storj environment variables: ${missing.join(", ")}`);
    error.status = 503;
    throw error;
  }
}

async function putStorjObject(objectKey, body, headers = {}, config = getStorjConfig()) {
  assertStorjConfig(config);

  const response = await signedS3Request({
    method: "PUT",
    objectKey,
    headers,
    body,
    config
  });

  if (response.ok) return;

  const details = await response.text().catch(() => "");
  const error = new Error(`Storj upload failed (${response.status}) for ${objectKey}. ${details}`);
  error.status = response.status;
  throw error;
}

function getPublicObjectUrl(objectKey, config = getStorjConfig()) {
  assertStorjConfig(config);
  return `${config.publicBaseUrl}/${encodeObjectKey(objectKey)}`;
}

async function signedS3Request({ method, objectKey, headers, body = Buffer.alloc(0), config }) {
  const endpoint = new URL(config.endpoint);
  const canonicalUri = `/${encodePathSegment(config.bucket)}/${encodeObjectKey(objectKey)}`;
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
  const credentialScope = `${dateStamp}/${config.region}/s3/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest)
  ].join("\n");
  const signingKey = getSignatureKey(config.secretAccessKey, dateStamp, config.region, "s3");
  const signature = hmacHex(signingKey, stringToSign);
  const authorization =
    `AWS4-HMAC-SHA256 Credential=${config.accessKeyId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const finalHeaders = {
    ...requestHeaders,
    authorization
  };

  delete finalHeaders.host;

  return fetch(url, {
    method,
    headers: finalHeaders,
    body
  });
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

function stripSlashes(value) {
  return String(value || "").replace(/^\/+|\/+$/g, "");
}

function stripTrailingSlash(value) {
  return String(value || "").replace(/\/+$/g, "");
}

module.exports = {
  getStorjConfig,
  putStorjObject,
  getPublicObjectUrl
};
