import { cache } from "react";
import { articles as initialArticles, type Article } from "./content";
function validArticle(value: unknown): value is Article {
  if (!value || typeof value !== "object") return false;
  const a = value as Record<string, unknown>;
  return (
    ["id", "category", "title", "summary", "region", "tag", "color"].every(
      (k) => typeof a[k] === "string",
    ) &&
    typeof a.id === "string" &&
    /^[a-z0-9-]+$/.test(a.id) &&
    Array.isArray(a.body) &&
    a.body.every((p) => typeof p === "string") &&
    (a.source === undefined ||
      (typeof a.source === "string" && a.source.startsWith("https://"))) &&
    (a.sourceName === undefined || typeof a.sourceName === "string") &&
    (a.checkedAt === undefined ||
      (typeof a.checkedAt === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(a.checkedAt))) &&
    (a.status === undefined ||
      ["guide", "check", "closed"].includes(String(a.status))) &&
    (a.applicationEnd === undefined ||
      (typeof a.applicationEnd === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(a.applicationEnd))) &&
    (a.checklist === undefined ||
      (Array.isArray(a.checklist) &&
        a.checklist.every((x) => typeof x === "string"))) &&
    (a.relatedSource === undefined ||
      (a.relatedSource !== null &&
        typeof a.relatedSource === "object" &&
        typeof (a.relatedSource as Record<string, unknown>).label ===
          "string" &&
        typeof (a.relatedSource as Record<string, unknown>).url === "string" &&
        String((a.relatedSource as Record<string, unknown>).url).startsWith(
          "https://",
        )))
  );
}
export const getArticles = cache(async (): Promise<Article[]> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
    key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    if (process.env.VERCEL_ENV === "production")
      throw new Error("Missing Supabase public configuration");
    return initialArticles;
  }
  const response = await fetch(
    `${url}/rest/v1/articles?select=id,content,updated_at&published=eq.true&order=updated_at.desc,id.asc`,
    {
      headers: { apikey: key },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10000),
    },
  );
  if (!response.ok)
    throw new Error(`Content service unavailable (${response.status})`);
  const rows: unknown = await response.json();
  if (!Array.isArray(rows)) throw new Error("Invalid content response");
  return rows
    .map((row) => ({ ...row.content, id: row.id, modifiedAt: row.updated_at }))
    .filter(validArticle);
});
