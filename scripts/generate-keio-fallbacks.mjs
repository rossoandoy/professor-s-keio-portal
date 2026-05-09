/**
 * Generate index.html copies for all SPA routes so that
 * direct URL access works on static servers (e.g. Keio public_html).
 * Reads routes from App.tsx, topics from content/pages/research-topics.json,
 * and publication slugs from content/publications/*.md frontmatter.
 */
import { cp, mkdir, readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

// --- Static routes from App.tsx ---
const appTsx = await readFile(path.join(root, "src/App.tsx"), "utf8");
const staticRoutes = [];
for (const m of appTsx.matchAll(/path="(\/[^"*:]+)"/g)) {
  if (m[1] !== "/") staticRoutes.push(m[1]);
}

// --- Topic slugs from content/pages/research-topics.json ---
const topicsJson = JSON.parse(
  await readFile(path.join(root, "content/pages/research-topics.json"), "utf8")
);
const topicSlugs = Object.values(topicsJson.topicIdToSlug);

// --- Publication slugs from content/publications/*.md frontmatter ---
const pubDir = path.join(root, "content/publications");
const pubFiles = await readdir(pubDir);
const pubSlugs = [];
for (const file of pubFiles) {
  if (!file.endsWith(".md")) continue;
  const content = await readFile(path.join(pubDir, file), "utf8");
  const slugMatch = content.match(/^slug:\s*"?([^"\n]+)"?/m);
  if (slugMatch) {
    pubSlugs.push(slugMatch[1]);
  } else {
    // Use filename without .md as fallback
    pubSlugs.push(file.replace(".md", ""));
  }
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

await cp(path.join(dist, "index.html"), path.join(dist, "404.html"));

console.log(
  `✅ Created ${created} fallback index.html files + 404.html ` +
    `(${staticRoutes.length} static, ${topicSlugs.length} topics, ${pubSlugs.length} publications)`
);
