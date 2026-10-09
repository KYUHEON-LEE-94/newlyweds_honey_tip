import type { MetadataRoute } from "next";
import { articles } from "../lib/content";
import { siteUrl, isPublicSite } from "../lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return isPublicSite
    ? [
        { url: siteUrl },
        ...articles.map((a) => ({ url: `${siteUrl}/tips/${a.id}` })),
      ]
    : [];
}
