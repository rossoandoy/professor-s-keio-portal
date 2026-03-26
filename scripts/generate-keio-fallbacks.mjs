/**
 * Generate index.html copies for all SPA routes so that
 * direct URL access works on static servers without .htaccess (e.g. Keio public_html).
 *
 * Reads route definitions and slugs from source files to stay in sync.
 */
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

// --- Extract static routes from App.tsx ---
const appTsx = await readFile(path.join(root, "src/App.tsx"), "utf8");
const staticRoutes = [];
for (const m of appTsx.matchAll(/path="(\/[^"*:]+)"/g)) {
  if (m[1] !== "/") staticRoutes.push(m[1]);
}

// --- Extract topic slugs from publicationsByTopic.ts (topicIdToSlug) ---
const pubData = await readFile(
  path.join(root, "src/data/publicationsByTopic.ts"),
  "utf8"
);
const topicSlugs = [...pubData.matchAll(/:\s*"([a-z0-9-]+)"/g)]
  .map((m) => m[1])
  .filter((s) => s.includes("-")); // topic slugs contain hyphens

// --- Replicate ensureSlugs() from publicationsByTopic.ts exactly ---
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Parse publications in order: year then title (matching TS source order)
const pubEntries = [];
const entryPattern = /\{\s*(?:authors|year)[\s\S]*?\}/g;
let em;
while ((em = entryPattern.exec(pubData)) !== null) {
  const block = em[0];
  const titleMatch = block.match(/title:\s*"([^"]+)"/);
  const yearMatch = block.match(/year:\s*(\d{4})/);
  const slugMatch = block.match(/slug:\s*"([^"]+)"/);
  if (titleMatch && yearMatch) {
    pubEntries.push({
      title: titleMatch[1],
      year: parseInt(yearMatch[1]),
      explicitSlug: slugMatch ? slugMatch[1] : null,
    });
  }
}

const usedSlugs = new Set();
const pubSlugs = [];
for (const entry of pubEntries) {
  if (entry.explicitSlug) {
    usedSlugs.add(entry.explicitSlug);
    pubSlugs.push(entry.explicitSlug);
    continue;
  }
  let base = slugify(entry.title) + "-" + entry.year;
  let s = base;
  let n = 0;
  while (usedSlugs.has(s)) {
    n++;
    s = base + "-" + n;
  }
  usedSlugs.add(s);
  pubSlugs.push(s);
}

// --- Build all routes ---
const allRoutes = [
  ...staticRoutes,
  ...topicSlugs.map((s) => `/research/${s}`),
  ...pubSlugs.map((s) => `/publications/${s}`),
];

const indexHtml = await readFile(path.join(dist, "index.html"), "utf8");
let created = 0;

for (const route of allRoutes) {
  const dir = path.join(dist, route.replace(/^\//, ""));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), indexHtml);
  created++;
}

// Also ensure 404.html exists
await cp(path.join(dist, "index.html"), path.join(dist, "404.html"));

console.log(
  `✅ Created ${created} fallback index.html files + 404.html ` +
    `(${staticRoutes.length} static, ${topicSlugs.length} topics, ${pubSlugs.length} publications)`
);
