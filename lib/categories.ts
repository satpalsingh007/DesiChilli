import type { CategorySlug } from "./types";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagLabel: string;
  navLabel: string;
  tagClass: "tag-reality" | "tag-explainer" | "tag-hottake";
  dek?: string;
};

export const SHOW_SLUGS: CategorySlug[] = [
  "bigg-boss",
  "indias-got-latent",
  "shark-tank-india",
  "splitsvilla",
  "roadies",
  "bollywood",
];

export const CATEGORIES: Category[] = [
  {
    slug: "bigg-boss",
    name: "Bigg Boss",
    tagLabel: "Bigg Boss",
    navLabel: "Bigg Boss watch",
    tagClass: "tag-reality",
    dek: "Season 20 premieres September 6 — house redesign, Old vs New, and the Extra Jeevan Daan twist.",
  },
  {
    slug: "indias-got-latent",
    name: "India's Got Latent",
    tagLabel: "India's Got Latent",
    navLabel: "India's Got Latent",
    tagClass: "tag-reality",
    dek: "Season 2 recaps, panel fights, and the clips that actually travelled.",
  },
  {
    slug: "shark-tank-india",
    name: "Shark Tank India",
    tagLabel: "Shark Tank India",
    navLabel: "Shark Tank India",
    tagClass: "tag-reality",
  },
  {
    slug: "splitsvilla",
    name: "Splitsvilla",
    tagLabel: "Splitsvilla",
    navLabel: "Splitsvilla",
    tagClass: "tag-reality",
  },
  {
    slug: "roadies",
    name: "Roadies",
    tagLabel: "Roadies",
    navLabel: "Roadies",
    tagClass: "tag-reality",
  },
  {
    slug: "bollywood",
    name: "Bollywood",
    tagLabel: "Bollywood",
    navLabel: "Bollywood",
    tagClass: "tag-reality",
    dek: "Openings, fights, and the films that actually travel.",
  },
  {
    slug: "hot-takes",
    name: "Hot takes",
    tagLabel: "Hot take",
    navLabel: "Hot takes",
    tagClass: "tag-hottake",
    dek: "Opinion, labelled as opinion — not a recap.",
  },
  {
    slug: "explainers",
    name: "Explainers",
    tagLabel: "Explainer",
    navLabel: "Explainers",
    tagClass: "tag-explainer",
    dek: "How the format works, without the viral-clip version.",
  },
];

export type NavItem = {
  href: string;
  label: string;
};

type PostRef = {
  category: CategorySlug;
  shows?: CategorySlug[];
};

export function categoryHasPosts(slug: CategorySlug, posts: PostRef[]): boolean {
  return posts.some(
    (post) => post.category === slug || post.shows?.includes(slug),
  );
}

/** Header links: Latest plus any category that currently has at least one post. */
export function getNavItems(posts: PostRef[]): NavItem[] {
  return [
    { href: "/", label: "Latest" },
    ...CATEGORIES.filter((category) => categoryHasPosts(category.slug, posts)).map(
      (category) => ({
        href: `/category/${category.slug}`,
        label: category.navLabel,
      }),
    ),
  ];
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function getCategoryOrThrow(slug: string): Category {
  const category = getCategory(slug);
  if (!category) {
    throw new Error(`Unknown category: ${slug}`);
  }
  return category;
}
