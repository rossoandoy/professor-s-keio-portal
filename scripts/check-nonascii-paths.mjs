/**
 * Check for non-ASCII characters in file/directory names under dist/.
 * Exits with code 1 if any are found.
 */
import { readdir } from "node:fs/promises";
import path from "node:path";

const NON_ASCII = /[^\x00-\x7F]/;
const dist = path.resolve("dist");
const violations = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (NON_ASCII.test(entry.name)) {
      violations.push(path.join(dir, entry.name));
    }
    if (entry.isDirectory()) {
      await walk(path.join(dir, entry.name));
    }
  }
}

await walk(dist);

if (violations.length > 0) {
  console.error("❌ Non-ASCII file names found:");
  for (const v of violations) {
    console.error("  ", v.replace(dist + "/", ""));
  }
  process.exit(1);
} else {
  console.log("✅ No non-ASCII file names found.");
}
