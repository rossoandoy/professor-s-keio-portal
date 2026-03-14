/**
 * Build a Google Scholar search URL from title and authors (fallback when scholar_url is not set).
 */
export function scholarSearchUrl(title: string, authors: string): string {
  const q = [title, authors].filter(Boolean).join(" ").trim();
  if (!q) return "https://scholar.google.com/";
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(q)}`;
}
