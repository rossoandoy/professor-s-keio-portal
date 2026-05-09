/**
 * Content loader — reads all data from content/ directory at build time.
 * Uses Vite's import.meta.glob for static imports.
 * No runtime API calls; everything is bundled at build.
 */

// ==================== Types ====================

export type TopicId = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export interface Topic {
  id: TopicId;
  nameEn: string;
  nameJa: string;
  subtopics?: { labelEn: string; labelJa: string }[];
}

export interface Publication {
  authors: string;
  year: number;
  title: string;
  journal: string;
  detail: string;
  topicIds: TopicId[];
  subtopic?: string;
  doi?: string;
  scholar_url?: string;
  slug: string;
  abstract?: string;
  pdf_url?: string;
  preprint_url?: string;
  citation_count?: number;
  citation_source?: string;
  selected?: boolean;
  contribution_summary?: string;
  top_journal?: boolean;
  category?: "Refereed" | "Books" | "Policy" | "Japanese";
  lead_article?: boolean;
}

export interface NewsItem {
  id: string;
  date: string;
  titleEn: string;
  titleJa: string;
  bodyEn: string;
  bodyJa: string;
  tags?: string[];
}

export interface ResearchAgendaSection {
  id: string;
  titleEn: string;
  titleJa: string;
  bodyEn: string;
  bodyJa: string;
}

export interface CareerItem {
  position: string;
  period: string;
  institution: string;
}

export interface EducationItem {
  degree: string;
  year: string;
  institution: string;
  note?: string;
}

export interface EditorialItem {
  role: string;
  journal: string;
  period: string;
}

export interface PolicyRole {
  orgEn: string;
  orgJa: string;
  roleEn: string;
  roleJa: string;
  detailEn: string;
  detailJa: string;
  category: "Government" | "Research Institute" | "Academic";
}

export interface HeroContent {
  nameEn: string;
  nameJa: string;
  titleEn: string;
  titleJa: string;
  affiliationEn: string;
  affiliationJa: string;
  statementEn: string;
  statementJa: string;
  email: string;
  locationEn: string;
  locationJa: string;
}

export interface ContactContent {
  email: string;
  phone: string;
  addressEn: string;
  addressJa: string;
  institutionEn: string;
  institutionJa: string;
  externalLinks: { label: string; url: string }[];
}

export interface NavItem {
  labelEn: string;
  labelJa: string;
  to: string;
  children: { labelEn: string; labelJa: string; to: string }[];
}

export type PublicationCategory = "Refereed" | "Books" | "Policy" | "Japanese";
export const publicationCategories: PublicationCategory[] = ["Refereed", "Books", "Policy", "Japanese"];

// ==================== JSON Loaders ====================

import heroJson from "../../content/settings/hero.json";
import contactJson from "../../content/settings/contact.json";
import navigationJson from "../../content/settings/navigation.json";
import researchAgendaJson from "../../content/pages/research-agenda.json";
import careerJson from "../../content/pages/career.json";
import policyJson from "../../content/pages/policy.json";
import researchTopicsJson from "../../content/pages/research-topics.json";

export function loadHero(): HeroContent {
  return heroJson as HeroContent;
}

export function loadContact(): ContactContent {
  return contactJson as ContactContent;
}

export function loadNavigation(): NavItem[] {
  return (navigationJson as { items: NavItem[] }).items;
}

export function loadResearchAgenda(): ResearchAgendaSection[] {
  return (researchAgendaJson as { sections: ResearchAgendaSection[] }).sections;
}

export function loadCareer() {
  const data = careerJson as {
    careerEn: CareerItem[];
    careerJa: CareerItem[];
    educationJa: EducationItem[];
    editorialService: EditorialItem[];
    visitingPositions: string[];
  };
  return data;
}

export function loadPolicyRoles(): PolicyRole[] {
  return (policyJson as { roles: PolicyRole[] }).roles;
}

export function loadResearchTopics(): { topics: Topic[]; topicIdToSlug: Record<TopicId, string> } {
  return researchTopicsJson as { topics: Topic[]; topicIdToSlug: Record<TopicId, string> };
}

// ==================== Publication Loader (Markdown frontmatter) ====================

// Vite glob import: all .md files in content/publications/ as raw strings
const pubModules = import.meta.glob("../../content/publications/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseFrontmatter(raw: string): Record<string, unknown> {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const yaml = match[1];
  const result: Record<string, unknown> = {};
  let currentKey = "";
  let currentList: string[] | null = null;

  for (const line of yaml.split("\n")) {
    // List item
    const listMatch = line.match(/^\s+-\s+"?([^"]*)"?$/);
    if (listMatch && currentList) {
      currentList.push(listMatch[1]);
      continue;
    }

    // If we were building a list, save it
    if (currentList) {
      result[currentKey] = currentList;
      currentList = null;
    }

    // Key: value pair
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      const value = kvMatch[2].trim();

      if (value === "") {
        // Start of a list
        currentKey = key;
        currentList = [];
      } else if (value === "true") {
        result[key] = true;
      } else if (value === "false") {
        result[key] = false;
      } else if (/^\d+$/.test(value)) {
        result[key] = parseInt(value, 10);
      } else {
        // Remove surrounding quotes
        result[key] = value.replace(/^"(.*)"$/, "$1");
      }
    }
  }

  // Save last list
  if (currentList) {
    result[currentKey] = currentList;
  }

  return result;
}

let _publicationsCache: Publication[] | null = null;

function loadPublicationsInternal(): Publication[] {
  if (_publicationsCache) return _publicationsCache;

  const pubs: Publication[] = [];

  for (const [, raw] of Object.entries(pubModules)) {
    const fm = parseFrontmatter(raw);
    pubs.push({
      title: fm.title as string,
      authors: fm.authors as string,
      year: fm.year as number,
      journal: fm.journal as string,
      detail: fm.detail as string,
      slug: fm.slug as string,
      topicIds: (fm.topic_ids as string[] || []) as TopicId[],
      subtopic: fm.subtopic as string | undefined,
      doi: fm.doi as string | undefined,
      scholar_url: fm.scholar_url as string | undefined,
      category: fm.category as Publication["category"],
      selected: fm.selected as boolean | undefined,
      top_journal: fm.top_journal as boolean | undefined,
      contribution_summary: fm.contribution_summary as string | undefined,
      abstract: fm.abstract as string | undefined,
      pdf_url: fm.pdf_url as string | undefined,
      preprint_url: fm.preprint_url as string | undefined,
      citation_count: fm.citation_count as number | undefined,
      citation_source: fm.citation_source as string | undefined,
      lead_article: fm.lead_article as boolean | undefined,
    });
  }

  // Sort by year descending (most recent first)
  pubs.sort((a, b) => b.year - a.year);
  _publicationsCache = pubs;
  return pubs;
}

// ==================== Publication API (compatible with old publicationsByTopic.ts) ====================

export function getAllPublications(): Publication[] {
  return loadPublicationsInternal();
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  return loadPublicationsInternal().find((p) => p.slug === slug);
}

export function getPublicationsForTopic(topicId: TopicId): Publication[] {
  return loadPublicationsInternal().filter((p) => p.topicIds.includes(topicId));
}

export function getSelectedPublications(): Publication[] {
  const all = loadPublicationsInternal();
  const withFlag = all.filter((p) => p.selected);
  const list = withFlag.length > 0 ? withFlag : all.slice(0, 10);
  return [...list].sort((a, b) => b.year - a.year);
}

export function getCategory(pub: Publication): PublicationCategory {
  return pub.category ?? "Refereed";
}

export function getTopicBySlug(slug: string): { topic: Topic; topicId: TopicId } | undefined {
  const { topics, topicIdToSlug } = loadResearchTopics();
  const slugToId = Object.fromEntries(
    Object.entries(topicIdToSlug).map(([id, s]) => [s, id])
  ) as Record<string, TopicId>;
  const topicId = slugToId[slug];
  if (!topicId) return undefined;
  const topic = topics.find((t) => t.id === topicId);
  if (!topic) return undefined;
  return { topic, topicId };
}

// ==================== News Loader (Markdown frontmatter + body) ====================

const newsModules = import.meta.glob("../../content/news/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export function loadNews(): NewsItem[] {
  const items: NewsItem[] = [];

  for (const [filePath, raw] of Object.entries(newsModules)) {
    const fm = parseFrontmatter(raw);

    // Extract body after frontmatter — split by "---" separator for EN/JA
    const bodyMatch = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
    const body = bodyMatch ? bodyMatch[1].trim() : "";
    const [bodyEn, bodyJa] = body.split(/\n---\n/).map((s) => s.trim());

    // Extract filename as id
    const fileName = filePath.split("/").pop()?.replace(".md", "") || "";

    items.push({
      id: fileName,
      date: fm.date as string,
      titleEn: fm.title_en as string,
      titleJa: fm.title_ja as string,
      bodyEn: bodyEn || "",
      bodyJa: bodyJa || "",
      tags: fm.tags as string[] | undefined,
    });
  }

  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export function getLatestNews(n: number): NewsItem[] {
  return loadNews().slice(0, n);
}
