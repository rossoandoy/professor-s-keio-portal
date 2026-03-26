export interface NewsItem {
  id: string;
  date: string;
  titleEn: string;
  titleJa: string;
  bodyEn: string;
  bodyJa: string;
  tags?: string[];
}

export const newsItems: NewsItem[] = [
  {
    id: "2026-03-site-launch",
    date: "2026-03-27",
    titleEn: "Website launched",
    titleJa: "ウェブサイトを公開しました",
    bodyEn: "The new research portal for Professor Toshihiro Okubo is now live, featuring research themes, publications by topic, and a research agenda.",
    bodyJa: "大久保敏弘教授の新しい研究ポータルサイトを公開しました。研究テーマ、トピック別業績一覧、研究アジェンダなどを掲載しています。",
    tags: ["announcement"],
  },
];

/** Get all news sorted by date descending. */
export function getAllNews(): NewsItem[] {
  return [...newsItems].sort((a, b) => b.date.localeCompare(a.date));
}

/** Get latest N news items. */
export function getLatestNews(n: number): NewsItem[] {
  return getAllNews().slice(0, n);
}
