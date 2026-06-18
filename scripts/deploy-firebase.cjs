const { spawnSync } = require("child_process");
const path = require("path");

const project = readProjectArg(process.argv.slice(2));

if (!project) {
  console.error("Missing Firebase project id.");
  console.error("Usage: npm run deploy -- --project <firebase-project-id>");
  process.exit(1);
}

const rootDir = path.resolve(__dirname, "..");
const firebaseArgs = [
  "firebase-tools",
  "deploy",
  "--project",
  project,
  "--only",
  "functions,firestore:rules,firestore:indexes"
];

console.log(`Deploying Firebase backend to project "${project}"...`);
console.log(`Running: npx ${firebaseArgs.join(" ")}`);

const result = process.platform === "win32"
  ? spawnSync(
      "cmd.exe",
      ["/d", "/s", "/c", `npx ${firebaseArgs.map(quoteWindowsArg).join(" ")}`],
      {
        cwd: rootDir,
        stdio: "inherit",
        shell: false
      }
    )
  : spawnSync(
      "npx",
      firebaseArgs,
      {
        cwd: rootDir,
        stdio: "inherit",
        shell: false
      }
    );

if (result.error) {
  console.error(`Failed to start Firebase CLI: ${result.error.message}`);
}

if (result.signal) {
  console.error(`Firebase deploy stopped with signal: ${result.signal}`);
}

process.exit(result.status ?? 1);

function readProjectArg(args) {
  const projectIndex = args.indexOf("--project");
  if (projectIndex !== -1) return args[projectIndex + 1];

  const equalsArg = args.find(arg => arg.startsWith("--project="));
  if (equalsArg) return equalsArg.slice("--project=".length);

  const positionalProject = args.find(arg => !arg.startsWith("-"));
  if (positionalProject) return positionalProject;

  return process.env.FIREBASE_PROJECT_ID || "";
}

function quoteWindowsArg(arg) {
  if (!/[\s"]/u.test(arg)) return arg;
  return `"${arg.replace(/"/g, '\\"')}"`;
}
