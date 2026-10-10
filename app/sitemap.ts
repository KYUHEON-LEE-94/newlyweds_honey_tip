import type { MetadataRoute } from "next";
import { getArticles } from "../lib/articles";
import { siteUrl, isPublicSite } from "../lib/site";
export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  return isPublicSite
    ? [
        { url: siteUrl },
        ...articles.map((a) => ({
          url: `${siteUrl}/tips/${a.id}`,
          ...(a.modifiedAt ? { lastModified: a.modifiedAt } : {}),
        })),
      ]
    : [];
}
