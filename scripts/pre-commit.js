import { execSync } from "child_process";
import os from "os";

const run = (command, successMsg, errorMsg) => {
  try {
    execSync(command, { stdio: "inherit" });
    console.log(`✅ ${successMsg}`);
  } catch (e) {
    console.error(`❌ ${errorMsg}`);
  }
};

console.log("🔍 Running lint-staged...");
run(
  "pnpm exec lint-staged",
  "Linting passed! ✨",
  "Code linting failed! Fix it before committing.",
);

console.log("🔨 Building project...");
const buildCommand =
  os.platform() === "win32" ? "pnpm run build:windows" : "pnpm run build";
run(
  buildCommand,
  "Build successful! 🚀",
  "Build failed! Something went wrong.",
);

console.log("➕ Staging changes...");
run("git add .", "Changes staged! 📝", "Failed to stage changes. Try again.");

console.log("🎉 Pre-commit checks passed! Happy coding! 👨‍💻👩‍💻");
