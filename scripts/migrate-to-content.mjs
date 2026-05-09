/**
 * One-time migration script: extract data from TS source files into content/ JSON/MD files.
 * Run: node scripts/migrate-to-content.mjs
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

async function ensureDir(dir) {
  await mkdir(dir, { recursive: true });
}

// --- Research Agenda → JSON ---
async function migrateResearchAgenda() {
  const src = await readFile(path.join(root, "src/data/researchAgenda.ts"), "utf8");
  // Extract the array content between [ and ];
  const match = src.match(/export const researchAgendaSections[^=]*=\s*(\[[\s\S]*?\]);/);
  if (!match) throw new Error("Could not parse researchAgenda.ts");
  // Eval-safe: replace single quotes, handle template literals
  const data = eval(`(${match[1]})`);
  await ensureDir(path.join(root, "content/pages"));
  await writeFile(
    path.join(root, "content/pages/research-agenda.json"),
    JSON.stringify({ sections: data }, null, 2)
  );
  console.log("✅ Research Agenda → content/pages/research-agenda.json");
}

// --- Career / Policy → JSON ---
async function migrateCareerAndPolicy() {
  const src = await readFile(path.join(root, "src/data/cvContent.ts"), "utf8");

  // Helper to extract array
  function extractArray(varName) {
    const re = new RegExp(`export const ${varName}[^=]*=\\s*(\\[[\\s\\S]*?\\]);`);
    const m = src.match(re);
    if (!m) return [];
    return eval(`(${m[1]})`);
  }

  const career = {
    careerEn: extractArray("careerEn"),
    careerJa: extractArray("careerJa"),
    educationJa: extractArray("educationJa"),
    editorialService: extractArray("editorialService"),
    visitingPositions: extractArray("visitingPositions"),
  };

  await ensureDir(path.join(root, "content/pages"));
  await writeFile(
    path.join(root, "content/pages/career.json"),
    JSON.stringify(career, null, 2)
  );
  console.log("✅ Career → content/pages/career.json");

  const policyRoles = extractArray("policyRoles");
  await writeFile(
    path.join(root, "content/pages/policy.json"),
    JSON.stringify({ roles: policyRoles }, null, 2)
  );
  console.log("✅ Policy → content/pages/policy.json");
}

// --- Research Topics → JSON ---
async function migrateResearchTopics() {
  const src = await readFile(path.join(root, "src/data/publicationsByTopic.ts"), "utf8");
  const match = src.match(/export const topics:\s*Topic\[\]\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) throw new Error("Could not parse topics");
  const data = eval(`(${match[1]})`);

  // Also extract topicIdToSlug
  const slugMatch = src.match(/export const topicIdToSlug[^=]*=\s*(\{[\s\S]*?\});/);
  const slugMap = slugMatch ? eval(`(${slugMatch[1]})`) : {};

  await ensureDir(path.join(root, "content/pages"));
  await writeFile(
    path.join(root, "content/pages/research-topics.json"),
    JSON.stringify({ topics: data, topicIdToSlug: slugMap }, null, 2)
  );
  console.log("✅ Research Topics → content/pages/research-topics.json");
}

// --- Publications → individual MD files ---
async function migratePublications() {
  const src = await readFile(path.join(root, "src/data/publicationsByTopic.ts"), "utf8");

  // Extract the publications array
  const match = src.match(/export const publicationsByTopic:\s*PublicationByTopic\[\]\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) throw new Error("Could not parse publications");
  const pubs = eval(`(${match[1]})`);

  function slugify(text) {
    return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  }

  const usedSlugs = new Set();
  await ensureDir(path.join(root, "content/publications"));

  for (const pub of pubs) {
    // Generate slug if not present
    if (!pub.slug) {
      let base = slugify(pub.title) + "-" + pub.year;
      let s = base;
      let n = 0;
      while (usedSlugs.has(s)) { n++; s = base + "-" + n; }
      pub.slug = s;
    }
    usedSlugs.add(pub.slug);

    // Build frontmatter
    const fm = {
      title: pub.title,
      authors: pub.authors,
      year: pub.year,
      journal: pub.journal,
      detail: pub.detail,
      slug: pub.slug,
      topic_ids: pub.topicIds,
    };
    if (pub.subtopic) fm.subtopic = pub.subtopic;
    if (pub.doi) fm.doi = pub.doi;
    if (pub.scholar_url) fm.scholar_url = pub.scholar_url;
    if (pub.category) fm.category = pub.category;
    if (pub.selected) fm.selected = true;
    if (pub.top_journal) fm.top_journal = true;
    if (pub.contribution_summary) fm.contribution_summary = pub.contribution_summary;
    if (pub.abstract) fm.abstract = pub.abstract;
    if (pub.pdf_url) fm.pdf_url = pub.pdf_url;
    if (pub.preprint_url) fm.preprint_url = pub.preprint_url;
    if (pub.citation_count != null) fm.citation_count = pub.citation_count;
    if (pub.citation_source) fm.citation_source = pub.citation_source;
    if (pub.lead_article) fm.lead_article = true;

    const yaml = Object.entries(fm).map(([k, v]) => {
      if (Array.isArray(v)) return `${k}:\n${v.map(i => `  - "${i}"`).join("\n")}`;
      if (typeof v === "boolean") return `${k}: ${v}`;
      if (typeof v === "number") return `${k}: ${v}`;
      // Escape quotes in strings
      const escaped = String(v).replace(/"/g, '\\"');
      return `${k}: "${escaped}"`;
    }).join("\n");

    const content = `---\n${yaml}\n---\n`;
    await writeFile(
      path.join(root, `content/publications/${pub.slug}.md`),
      content
    );
  }
  console.log(`✅ Publications → content/publications/ (${pubs.length} files)`);
}

// --- News → MD files ---
async function migrateNews() {
  await ensureDir(path.join(root, "content/news"));
  // Only 1 item currently, write it directly
  const content = `---
title_en: "Website launched"
title_ja: "ウェブサイトを公開しました"
date: "2026-03-27"
slug: "site-launch"
tags:
  - "announcement"
---

The new research portal for Professor Toshihiro Okubo is now live, featuring research themes, publications by topic, and a research agenda.

---

大久保敏弘教授の新しい研究ポータルサイトを公開しました。研究テーマ、トピック別業績一覧、研究アジェンダなどを掲載しています。
`;
  await writeFile(path.join(root, "content/news/2026-03-27-site-launch.md"), content);
  console.log("✅ News → content/news/ (1 file)");
}

// --- Run all ---
await migrateResearchAgenda();
await migrateCareerAndPolicy();
await migrateResearchTopics();
await migratePublications();
await migrateNews();
console.log("\n🎉 Migration complete!");
