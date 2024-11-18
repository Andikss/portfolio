/** @format */

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/*", "/private/*"]
      }
    ],
    sitemap: "https://andikads.my.id/sitemap.xml"
  };
}
