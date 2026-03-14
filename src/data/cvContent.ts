/**
 * CV content (career, education, committees, editorial).
 * Used by CareerSection.
 * EN: minimal career, no education. JA: full detail (Keio faculty-profile style).
 */

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

export interface GovernmentCommitteeItem {
  role: string;
  org: string;
  detail: string;
}

export const careerEn: CareerItem[] = [
  { position: "Professor", period: "2015 – Present", institution: "Faculty of Economics, Keio University" },
  { position: "Associate Professor", period: "2011 – 2015", institution: "Faculty of Economics, Keio University" },
  { position: "Associate Professor", period: "2008 – 2011", institution: "RIEB, Kobe University" },
  { position: "Research Associate", period: "2006 – 2008", institution: "IPEG, University of Manchester" },
];

export const careerJa: CareerItem[] = [
  { position: "教授", period: "2015年 – 現在", institution: "慶應義塾大学 経済学部" },
  { position: "准教授", period: "2011 – 2015年", institution: "慶應義塾大学 経済学部" },
  { position: "准教授", period: "2008 – 2011年", institution: "神戸大学 経済経営研究所" },
  { position: "研究員", period: "2006 – 2008年", institution: "マンチェスター大学 IPEG" },
  { position: "博士研究員", period: "2005 – 2006年", institution: "ジュネーヴ高等国際問題研究所" },
];

/** Education: JA only. EN does not show education (per feedback). */
export const educationJa: EducationItem[] = [
  { degree: "博士（国際関係学・経済学）", year: "2005年", institution: "ジュネーヴ高等国際問題研究所・ジュネーヴ大学", note: "指導教員: Richard E. Baldwin 教授" },
  { degree: "修士（経済学）", year: "2003年", institution: "ミシガン大学" },
  { degree: "修士（経済学）", year: "2000年", institution: "一橋大学" },
  { degree: "学士（経済学）", year: "1999年", institution: "一橋大学" },
];

export const editorialService: EditorialItem[] = [
  { role: "Associate Editor", journal: "Journal of Regional Science", period: "2010 – Present" },
  { role: "Editorial Board", journal: "Review of Urban and Regional Development Studies", period: "2017 – 2019" },
];

export const visitingPositions: string[] = [
  "Stockholm University (2023)",
  "University of Zurich (2023, 2014, 2010–)",
  "University of Birmingham (2022)",
  "Kyoto University (2019–2020)",
  "University of Tokyo / CREPE (2020–)",
  "Oxford University (2010)",
  "CORE, UCLouvain (2011, 2009)",
];

export const governmentCommittees: GovernmentCommitteeItem[] = [
  { role: "委員", org: "内閣府 経済社会総合研究所", detail: "テレワークに関する研究会" },
  { role: "委員", org: "総務省", detail: "テレワーク推進に関する検討会" },
  { role: "委員", org: "経済産業省", detail: "通商白書執筆協力" },
];
