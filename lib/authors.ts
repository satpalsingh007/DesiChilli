import { getCategory } from "./categories";
import { getAllPostSummaries } from "./posts";
import { SITE } from "./site";
import type { CategorySlug, PostSummary } from "./types";

export type Author = {
  slug: string;
  name: string;
  bio: string;
  /** Desks this writer has actually filed to, newest post first. */
  beats: CategorySlug[];
  posts: PostSummary[];
};

export function authorSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Beat lines keyed by author slug. These describe what each writer covers on
 * this site and nothing more — no credentials or history, which would be
 * unverifiable. Unlisted bylines fall back to a generated description.
 */
const BIOS: Record<string, string> = {
  "aarav-sen":
    "Writes opinion on Bollywood's release-date strategy and the India's Got Latent judging panel.",
  "kabir-rao":
    "Covers Bigg Boss casting, Bollywood box-office clashes, and India's Got Latent episodes.",
  "meera-iyer":
    "Runs the explainers desk — format twists and rule changes — alongside Bollywood and Latent coverage.",
  "riya-malhotra":
    "Reports on Bigg Boss and India's Got Latent as each season rolls out.",
  "tanya-deshpande":
    "Writes opinion on India's Got Latent and how the show packages its episodes.",
  "vikram-shah":
    "Hot takes on Bollywood sequels and the India's Got Latent panel.",
};

function formatList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function describeBeats(beats: CategorySlug[]): string {
  const names = beats
    .map((beat) => getCategory(beat)?.name)
    .filter((name): name is string => Boolean(name));

  if (names.length === 0) return `Writes for ${SITE.name}.`;
  return `Covers ${formatList(names)} for ${SITE.name}.`;
}

export function getAllAuthors(): Author[] {
  const bySlug = new Map<string, Author>();

  // getAllPostSummaries() is already newest-first, so each author's posts and
  // beats inherit that ordering.
  for (const post of getAllPostSummaries()) {
    const slug = authorSlug(post.author);
    const author =
      bySlug.get(slug) ??
      ({ slug, name: post.author, bio: "", beats: [], posts: [] } as Author);

    author.posts.push(post);
    for (const beat of [post.category, ...(post.shows ?? [])]) {
      if (!author.beats.includes(beat)) author.beats.push(beat);
    }
    bySlug.set(slug, author);
  }

  return Array.from(bySlug.values())
    .map((author) => ({
      ...author,
      bio: BIOS[author.slug] ?? describeBeats(author.beats),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return getAllAuthors().find((author) => author.slug === slug);
}
