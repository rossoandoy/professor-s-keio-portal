/**
 * Parses Publication-by-topic.md (from repo root) and outputs TypeScript array entries.
 * Run from professor-s-keio-portal: node scripts/parse-publication-by-topic.js
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const mdPath = path.join(__dirname, "../../Publication-by-topic.md");
const md = fs.readFileSync(mdPath, "utf8");

const lines = md.split(/\r?\n/).filter((l) => /^\d+[.\s\t]+[A-G]/.test(l.trim()));

function parseTopicLabel(s) {
  let prefix = "";
  const withParen = s.match(/^(\s*[A-G][\):]\s*(\&\s*[A-G][\):]\s*)*)\s*/);
  if (withParen) {
    prefix = withParen[1];
  } else {
    const noParen = s.match(/^([A-G](\s*&\s*[A-G])*)\s*[\):]*\s*/);
    if (noParen) prefix = noParen[0];
  }
  const topicIds = [...new Set((prefix.match(/[A-G]/g) || []))];
  const subtopic = s.slice(prefix.length).replace(/^\s*:\s*/, "").replace(/\s*:\s*$/, "").trim();
  return { topicIds, subtopic };
}

const selectedTitles = new Set([
  "Large Fires and the Rise of Fire Insurance in Early Twentieth Century Japan",
  "The Bright and Dark Sides of a Central Bank's Financial Support to Local Banks after a Natural Disaster",
  "Trade, Location, and Multi-product Firms",
  "By a Silken Thread",
  "Industrial cluster policy and transaction networks",
  "Creative Destruction of Industries",
  "Why are firms that export cleaner",
  "Market Size in Globalization",
  "The spatial selection of heterogeneous firms",
  "Heterogeneous firms, agglomeration and economic geography",
]);

const dois = {
  "Large Fires and the Rise of Fire Insurance in Early Twentieth Century Japan": "10.1017/S0022050724000158",
  "The Bright and Dark Sides of a Central Bank's Financial Support to Local Banks after a Natural Disaster": "10.1111/jmcb.13141",
  "Trade, Location, and Multi-product Firms": "10.1016/j.regsciurbeco.2023.103891",
  "By a Silken Thread": "10.1016/j.jinteco.2022.103579",
  "Industrial cluster policy and transaction networks": "10.1111/caje.12575",
  "Creative Destruction of Industries": "10.1017/S0022050718000697",
  "Why are firms that export cleaner": "10.1016/j.jeem.2018.06.002",
  "Market Size in Globalization": "10.1016/j.jinteco.2018.01.005",
  "The spatial selection of heterogeneous firms": "10.1016/j.jinteco.2009.10.005",
  "Heterogeneous firms, agglomeration and economic geography": "10.1093/jeg/lbi017",
};

const result = [];

lines.forEach((line) => {
  const yearMatch = line.match(/[(\（](\d{4})[)\）]/);
  if (!yearMatch) return;
  const yearPos = line.indexOf(yearMatch[0]);
  const beforeYear = line.slice(0, yearPos);
  let label = "";
  let rest = "";
  const lastColon = beforeYear.lastIndexOf(": ");
  if (lastColon >= 0) {
    label = line.slice(0, lastColon).replace(/^\d+[.\s\t]+/, "").trim();
    rest = line.slice(lastColon + 2).trim();
  } else {
    const authorStart = beforeYear.match(/\s+([A-Z][a-zA-Z\-]+,?\s+[A-Z]\.?\s+.*)$/);
    if (authorStart) {
      const numPrefix = beforeYear.match(/^\d+[.\s\t]+/);
      const numLen = numPrefix ? numPrefix[0].length : 0;
      label = beforeYear.slice(0, beforeYear.length - authorStart[0].length).replace(/^\d+[.\s\t]+/, "").trim();
      rest = authorStart[1] + line.slice(yearPos);
    } else {
      return;
    }
  }
  const { topicIds, subtopic } = parseTopicLabel(label);

  const year = parseInt(yearMatch[1], 10);
  const yearPart = yearMatch[0];
  const authors = rest.slice(0, rest.indexOf(yearPart)).trim().replace(/\s+/g, " ");

  let afterYear = rest.slice(rest.indexOf(yearPart) + yearPart.length).trim();
  afterYear = afterYear.replace(/^[.\s)]*\s*/, "").replace(/\s*\.\s*$/, "").trim();

  let title = "";
  let journal = "";
  let detail = "";

  const openQuote = /^["\u201C\u201D]/.test(afterYear);
  if (openQuote) {
    const closeIdx = afterYear.slice(1).search(/["\u201C\u201D]/);
    if (closeIdx >= 0) {
      title = afterYear.slice(1, closeIdx + 1).trim();
      let tail = afterYear.slice(closeIdx + 2).trim().replace(/^,\s*/, "");
      const detailMatch = tail.match(/,\s*((?:\d|e\d+|vol\.|pp\.|p\.)[\d\s,\-\.\(\)a-zA-Z]*?)\.?\s*$/);
      if (detailMatch) {
        detail = detailMatch[1].trim();
        const beforeDetail = tail.slice(0, tail.indexOf(detailMatch[0])).trim();
        const lastComma = beforeDetail.lastIndexOf(", ");
        journal = lastComma > 0 ? beforeDetail.slice(lastComma + 2).trim() : beforeDetail;
      } else {
        const lastComma = tail.lastIndexOf(", ");
        if (lastComma > 0) {
          journal = tail.slice(0, lastComma).trim();
          detail = tail.slice(lastComma + 2).trim().replace(/\.\s*$/, "");
        } else {
          journal = tail;
        }
      }
    }
  }
  if (!title || !journal) {
    const detailMatch = afterYear.match(/,\s*((?:\d|e\d+|vol\.|pp\.|p\.)[\d\s,\-\.\(\)a-zA-Z]*?)\.?\s*$/);
    if (detailMatch) {
      detail = detailMatch[1].trim();
      const beforeDetail = afterYear.slice(0, afterYear.indexOf(detailMatch[0])).trim();
      const lastCommaBefore = beforeDetail.lastIndexOf(", ");
      if (lastCommaBefore > 0) {
        journal = beforeDetail.slice(lastCommaBefore + 2).trim();
        title = beforeDetail.slice(0, lastCommaBefore).trim().replace(/^["\u201C\u201D"]|["\u201C\u201D"]$/g, "");
      } else {
        title = beforeDetail.replace(/^["\u201C\u201D"]|["\u201C\u201D"]$/g, "");
      }
    } else {
      const lastComma = afterYear.lastIndexOf(", ");
      if (lastComma > 0) {
        detail = afterYear.slice(lastComma + 2).trim().replace(/\.\s*$/, "");
        const mid = afterYear.slice(0, lastComma);
        const firstComma = mid.indexOf(", ");
        if (firstComma > 0) {
          journal = mid.slice(firstComma + 2).trim();
          title = mid.slice(0, firstComma).trim().replace(/^["\u201C\u201D"]|["\u201C\u201D"]$/g, "");
        } else {
          title = mid.trim();
        }
      } else {
        title = afterYear;
      }
    }
  }

  result.push({
    topicIds: topicIds.length ? topicIds : ["A"],
    subtopic: subtopic || "",
    authors,
    year,
    title: title.trim(),
    journal: journal.trim(),
    detail: detail.trim(),
  });
});

function tsEntry(o) {
  const sel = selectedTitles.has(o.title) || [...selectedTitles].some((t) => o.title.includes(t));
  let doi = "";
  for (const [k, v] of Object.entries(dois)) {
    if (o.title.includes(k) || k.includes(o.title.slice(0, 40))) {
      doi = v;
      break;
    }
  }
  const extra = [];
  if (sel) extra.push("selected: true");
  if (doi) extra.push(`doi: "${doi}"`);
  const ext = extra.length ? ",\n    " + extra.join(", ") : "";
  return `  {
    authors: "${(o.authors || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}",
    year: ${o.year},
    title: "${(o.title || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}",
    journal: "${(o.journal || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}",
    detail: "${(o.detail || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}",
    topicIds: [${(o.topicIds || ["A"]).map((c) => `"${c}"`).join(", ")}],
    subtopic: "${(o.subtopic || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"${ext}
  }`;
}

console.log("export const publicationsByTopic: PublicationByTopic[] = [");
result.forEach((r, i) => {
  console.log(tsEntry(r) + (i < result.length - 1 ? "," : ""));
});
console.log("];");
