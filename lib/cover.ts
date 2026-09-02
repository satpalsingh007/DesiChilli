import fs from "fs";
import path from "path";
import type { CategorySlug } from "./types";

/** Local cover convention: /images/posts/{slug}-cover.jpg — or any https URL (e.g. Cloudinary). */
export function coverImagePath(slug: string): string {
  return `/images/posts/${slug}-cover.jpg`;
}

export const CATEGORY_ACCENT: Record<CategorySlug, string> = {
  "bigg-boss": "#3A5A40",
  "indias-got-latent": "#3A5A40",
  "shark-tank-india": "#3A5A40",
  splitsvilla: "#3A5A40",
  roadies: "#3A5A40",
  bollywood: "#3A5A40",
  "hot-takes": "#D6293A",
  explainers: "#c98620",
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
