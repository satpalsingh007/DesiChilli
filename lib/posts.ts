import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  CategorySlug,
  FaqEntry,
  Post,
  PostFrontmatter,
  PostSummary,
} from "./types";
import { SHOW_SLUGS } from "./categories";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function isFaqEntry(value: unknown): value is FaqEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Partial<FaqEntry>;
  return typeof entry.q === "string" && typeof entry.a === "string";
}

/** Drops malformed entries so a frontmatter typo cannot emit broken schema. */
function readFaq(value: unknown): FaqEntry[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const entries = value.filter(isFaqEntry);
  return entries.length > 0 ? entries : undefined;
}

function toSummary(data: PostFrontmatter): PostSummary {
  return {
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    shows: data.shows,
    heat: data.heat,
    author: data.author,
    date: data.date,
    updated: data.updated,
    readTime: data.readTime,
    slug: data.slug,
    coverImage: data.coverImage,
    faq: data.faq,
  };
}

function readPostFile(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  return {
    title: frontmatter.title,
    excerpt: frontmatter.excerpt,
    category: frontmatter.category,
    shows: frontmatter.shows,
    heat: frontmatter.heat,
    author: frontmatter.author,
    date: frontmatter.date,
    updated: frontmatter.updated,
    readTime: frontmatter.readTime,
    slug: frontmatter.slug ?? slug,
    coverImage: frontmatter.coverImage,
    faq: readFaq(frontmatter.faq),
    content,
  };
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post {
  return readPostFile(slug);
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => readPostFile(slug))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getAllPostSummaries(): PostSummary[] {
  return getAllPosts().map(toSummary);
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return getAllPosts().filter(
    (post) => post.category === category || post.shows?.includes(category),
  );
}

export function getPostSummariesBySlugs(slugs: string[]): PostSummary[] {
  const posts = getAllPosts();
  return slugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is Post => Boolean(post))
    .map(toSummary);
}

export function getRelatedPostSummaries(slug: string, limit = 3): PostSummary[] {
  const current = readPostFile(slug);
  const showDesks = [current.category, ...(current.shows ?? [])].filter((key) =>
    SHOW_SLUGS.includes(key),
  );

  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .filter((post) => {
      const keys = [post.category, ...(post.shows ?? [])];
      if (showDesks.length > 0) {
        return showDesks.some((desk) => keys.includes(desk));
      }
      return keys.includes(current.category);
    })
    .slice(0, limit)
    .map(toSummary);
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getAuthorInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
