const { spawnSync } = require("child_process");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const generateAudioScript = path.join(__dirname, "generate-audio.cjs");
const rawArgs = process.argv.slice(2);
const continueOnError = rawArgs.includes("--continue-on-error");
const forwardedArgs = rawArgs.filter(arg => arg !== "--continue-on-error");

main();

function main() {
  if (forwardedArgs.some(arg => arg === "--deck" || arg.startsWith("--deck="))) {
    console.error("Do not pass --deck to generate-all-audio.cjs; it runs every deck automatically.");
    process.exitCode = 1;
    return;
  }

  const decks = loadDeckIndex();
  const failures = [];

  console.log(`Generating audio for ${decks.length} decks.`);
  if (forwardedArgs.length) console.log(`Forwarded args: ${forwardedArgs.join(" ")}`);

  for (const deck of decks) {
    console.log("");
    console.log(`=== ${deck.label || deck.id} (${deck.id}) ===`);

    const result = spawnSync(
      process.execPath,
      [generateAudioScript, `--deck=${deck.id}`, ...forwardedArgs],
      {
        cwd: rootDir,
        env: process.env,
        stdio: "inherit"
      }
    );

    if (result.error) {
      failures.push({ deck, status: 1, error: result.error });
      console.error(result.error.message || result.error);
      if (!continueOnError) break;
      continue;
    }

    if (result.status !== 0) {
      failures.push({ deck, status: result.status || 1 });
      if (!continueOnError) break;
    }
  }

  if (!failures.length) {
    console.log("");
    console.log("All audio jobs completed.");
    return;
  }

  console.log("");
  console.error(`Audio generation failed for ${failures.length} deck(s):`);
  failures.forEach(failure => {
    console.error(`- ${failure.deck.id} (exit ${failure.status})`);
  });
  process.exitCode = failures[0].status || 1;
}

function loadDeckIndex() {
  global.window = {};
  require(path.join(rootDir, "decks", "index.js"));

  const decks = global.window.DECK_INDEX || [];
  if (!Array.isArray(decks) || !decks.length) {
    throw new Error("No decks found in decks/index.js.");
  }

  return decks;
}
