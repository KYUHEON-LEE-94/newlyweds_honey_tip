import type { Article } from "./content";
export type Filters = {
  category: string;
  region: string;
  includeNational: boolean;
  hideClosed: boolean;
  query: string;
  onlySaved: boolean;
  saved: string[];
};
export function filterArticles(articles: Article[], f: Filters) {
  const terms = f.query
    .trim()
    .toLocaleLowerCase("ko-KR")
    .split(/\s+/)
    .filter(Boolean);
  return articles.filter((a) => {
    const regionMatch =
      f.region === "전체 지역" ||
      a.region === f.region ||
      (f.includeNational && a.region === "전국");
    const text = [
      a.title,
      a.summary,
      a.category,
      a.region,
      a.sourceName || "",
      ...a.body,
    ]
      .join(" ")
      .toLocaleLowerCase("ko-KR");
    return (
      (f.category === "전체" || a.category === f.category) &&
      regionMatch &&
      (!f.hideClosed || a.status !== "closed") &&
      (!f.onlySaved || f.saved.includes(a.id)) &&
      terms.every((term) => text.includes(term))
    );
  });
}
