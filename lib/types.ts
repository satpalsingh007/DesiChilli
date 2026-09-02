export type CategorySlug =
  | "bigg-boss"
  | "indias-got-latent"
  | "shark-tank-india"
  | "splitsvilla"
  | "roadies"
  | "bollywood"
  | "hot-takes"
  | "explainers";

/**
 * One question-and-answer pair. Rendered visibly on the article and mirrored
 * into FAQPage schema, which Google requires to match on-page content.
 */
export type FaqEntry = {
  q: string;
  a: string;
};

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  category: CategorySlug;
  shows?: CategorySlug[];
  heat: number;
  author: string;
  date: string;
  /** Quoted `YYYY-MM-DD` for a substantive revision; feeds schema dateModified. */
  updated?: string;
  readTime: string;
  slug: string;
  /** Local `/images/posts/{slug}-cover.jpg` or a Cloudinary https URL */
  coverImage?: string;
  /** Best on explainers and previews, where readers arrive with a direct question. */
  faq?: FaqEntry[];
};

export type Post = PostFrontmatter & {
  content: string;
};

export type PostSummary = PostFrontmatter;
