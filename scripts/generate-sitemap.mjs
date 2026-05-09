/**
 * Generate sitemap.xml in dist/ after build.
 * Reuses the same route-collection logic as generate-keio-fallbacks.mjs.
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const siteUrl = (process.env.SITE_URL || "https://rossoandoy.github.io/professor-s-keio-portal").replace(/\/$/, "");
const today = new Date().toISOString().split("T")[0];

// --- Static routes from App.tsx ---
const appTsx = await readFile(path.join(root, "src/App.tsx"), "utf8");
const staticRoutes = ["/"];
for (const m of appTsx.matchAll(/path="(\/[^"*:]+)"/g)) {
  staticRoutes.push(m[1]);
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
  pubSlugs.push(slugMatch ? slugMatch[1] : file.replace(".md", ""));
}

// --- Build all routes ---
const allRoutes = [
  ...staticRoutes,
  ...topicSlugs.map((s) => `/research/${s}`),
  ...pubSlugs.map((s) => `/publications/${s}`),
];

// --- Generate sitemap.xml ---
const urls = allRoutes
  .map(
    (route) =>
      `  <url>\n    <loc>${siteUrl}${route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile(path.join(dist, "sitemap.xml"), sitemap);
console.log(`✅ sitemap.xml generated with ${allRoutes.length} URLs`);
