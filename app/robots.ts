import type { MetadataRoute } from "next";
import { siteUrl, isPublicSite } from "../lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: isPublicSite
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    ...(isPublicSite ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
