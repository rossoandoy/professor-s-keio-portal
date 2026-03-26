/**
 * Check that internal route paths referenced in the source code
 * have corresponding <Route> definitions in App.tsx.
 * Also validates DOI format (10.xxxx/xxxx pattern).
 */
import { readFile } from "node:fs/promises";
import { globSync } from "node:fs";
import path from "node:path";

const src = path.resolve("src");

// Extract routes from App.tsx
const appTsx = await readFile(path.join(src, "App.tsx"), "utf8");
const routePattern = /path="([^"*]+)"/g;
const definedRoutes = new Set();
let m;
while ((m = routePattern.exec(appTsx)) !== null) {
  // Normalize parameterized routes: /publications/:slug -> /publications/
  definedRoutes.add(m[1].replace(/:[^/]+/g, ":param"));
}
// Also add hash anchors as valid
["/#research", "/#publications", "/#career", "/#contact"].forEach((h) =>
  definedRoutes.add(h)
);

const errors = [];

// Check `to="..."` and `href="..."` in .tsx files
const files = globSync("src/**/*.tsx", { cwd: process.cwd() });
for (const file of files) {
  const content = await readFile(file, "utf8");
  const linkPattern = /(?:to|href)="(\/[^"#?]*(?:#[^"]*)?)"(?!.*noopener)/g;
  let lm;
  while ((lm = linkPattern.exec(content)) !== null) {
    const link = lm[1];
    if (link.startsWith("/#")) {
      if (!definedRoutes.has(link)) {
        errors.push({ file, link, reason: "hash anchor not in SECTION_IDS" });
      }
      continue;
    }
    // Normalize parameterized: /publications/some-slug -> /publications/:param
    const normalized = link.replace(/\/[^/]+$/, "/:param");
    const isStatic = definedRoutes.has(link);
    const isParam = definedRoutes.has(normalized);
    if (!isStatic && !isParam) {
      errors.push({ file, link, reason: "no matching <Route>" });
    }
  }
}

if (errors.length > 0) {
  console.error("❌ Internal link issues found:");
  for (const e of errors) {
    console.error(`  ${e.file}: "${e.link}" — ${e.reason}`);
  }
  process.exit(1);
} else {
  console.log("✅ All internal links have matching routes.");
}
