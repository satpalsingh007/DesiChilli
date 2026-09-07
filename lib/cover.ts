import fs from "fs";
import path from "path";
import type { CategorySlug } from "./types";

/** Local cover convention: /images/posts/{slug}-cover.jpg — or any https URL (e.g. Cloudinary). */
export function coverImagePath(slug: string): string {
  return `/images/posts/${slug}-cover.jpg`;
}

/**
 * Ground colour for a post's generated cover card. Each stays dark enough to
 * clear 4.5:1 against the white title text the card draws on top.
 */
export const CATEGORY_ACCENT: Record<CategorySlug, string> = {
  "bigg-boss": "#2F4A35",
  "indias-got-latent": "#8A3A16",
  "shark-tank-india": "#1F4B4E",
  splitsvilla: "#6E2247",
  roadies: "#2B2118",
  bollywood: "#92600f",
  "hot-takes": "#a71d2b",
  explainers: "#3A3F63",
};

function isRemoteUrl(src: string): boolean {
  return /^https?:\/\//i.test(src);
}

/** Accepts a Cloudinary/https URL, or a path under /public that exists on disk. */
export function resolveCoverSrc(coverImage?: string): string | null {
  if (!coverImage) return null;
  if (isRemoteUrl(coverImage)) return coverImage;

  const relative = coverImage.replace(/^\//, "");
  const filePath = path.join(process.cwd(), "public", relative);
  return fs.existsSync(filePath) ? coverImage : null;
}
