import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";
import { getAllPostSummaries, getPostsByCategory } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

const STATIC_PATHS = [
  "/about",
  "/contact",
  "/write",
  "/advertise",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostSummaries();
  const newest = posts[0]?.date ? new Date(posts[0].date) : new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: newest,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/posts"),
      lastModified: newest,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const categories: MetadataRoute.Sitemap = CATEGORIES.filter(
    (category) => getPostsByCategory(category.slug).length > 0,
  ).map((category) => ({
    url: absoluteUrl(`/category/${category.slug}`),
    lastModified: newest,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articles: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/posts/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const pages: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: newest,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [...home, ...categories, ...articles, ...pages];
}
