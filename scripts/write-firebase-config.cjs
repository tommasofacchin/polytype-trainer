const fs = require("fs");
const path = require("path");

loadDotenv(".env");
loadDotenv(".env.local");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const outputPath = path.join(distDir, "js", "firebase-config.js");
const isVercelBuild = process.env.VERCEL === "1";
const requiredKeys = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_APP_ID"
];
const missingKeys = requiredKeys.filter(key => !process.env[key]);

if (isVercelBuild && missingKeys.length) {
  console.error(
    `Missing Firebase env vars for Vercel build: ${missingKeys.join(", ")}`
  );
  process.exit(1);
}

const useDemoConfig = missingKeys.length > 0;
const config = useDemoConfig
  ? {
      apiKey: "demo-polytype-trainer",
      authDomain: "demo-polytype-trainer-dev.firebaseapp.com",
      projectId: "demo-polytype-trainer-dev",
      appId: "1:123456789:web:polytype-trainer-dev"
    }
  : compact({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    });

const explicitUseEmulators = parseBoolean(process.env.FIREBASE_USE_EMULATORS);
const useEmulatorsExpression =
  explicitUseEmulators === null
    ? "(window.location.hostname === \"localhost\" || window.location.hostname === \"127.0.0.1\")"
    : JSON.stringify(explicitUseEmulators);
const functionsRegion = process.env.FIREBASE_FUNCTIONS_REGION || "europe-west1";
const audioBaseUrl = process.env.AUDIO_BASE_URL || "";
const audioPrefix = process.env.AUDIO_PREFIX || "audio/v1";

prepareDist();

const file = `window.POLYTYPE_FIREBASE_CONFIG = ${JSON.stringify(config, null, 4)};\n\n` +
  `window.POLYTYPE_FIREBASE_FUNCTIONS_REGION = ${JSON.stringify(functionsRegion)};\n\n` +
  `window.POLYTYPE_FIREBASE_USE_EMULATORS = ${useEmulatorsExpression};\n\n` +
  `window.POLYTYPE_AUDIO_BASE_URL = ${JSON.stringify(audioBaseUrl)};\n\n` +
  `window.POLYTYPE_AUDIO_PREFIX = ${JSON.stringify(audioPrefix)};\n`;

fs.writeFileSync(outputPath, file);

console.log(
  `Wrote dist/js/firebase-config.js for ${useDemoConfig ? "local emulator demo" : config.projectId}.`
);

function prepareDist() {
  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });

  for (const entry of ["assets", "decks", "js", "style.css", "style_to_copy.css"]) {
    copyEntry(entry);
  }

  for (const entry of fs.readdirSync(rootDir)) {
    if (entry.endsWith(".html")) copyEntry(entry);
  }
}

function copyEntry(relativePath) {
  const source = path.join(rootDir, relativePath);
  const target = path.join(distDir, relativePath);

  if (!fs.existsSync(source)) return;

  const stats = fs.statSync(source);
  if (stats.isDirectory()) {
    fs.cpSync(source, target, { recursive: true });
  } else {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
  }
}

function compact(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => Boolean(entryValue))
  );
}

function parseBoolean(value) {
  if (value === undefined || value === "") return null;
  if (/^(1|true|yes)$/i.test(value)) return true;
  if (/^(0|false|no)$/i.test(value)) return false;
  return null;
}

function loadDotenv(filename) {
  const dotenvPath = path.resolve(__dirname, "..", filename);
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
