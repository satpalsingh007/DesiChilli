export type CategorySlug =
  | "bigg-boss"
  | "indias-got-latent"
  | "shark-tank-india"
  | "splitsvilla"
  | "roadies"
  | "bollywood"
  | "hot-takes"
  | "explainers";

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  category: CategorySlug;
  shows?: CategorySlug[];
  heat: number;
  author: string;
  date: string;
  readTime: string;
  slug: string;
  /** Local `/images/posts/{slug}-cover.jpg` or a Cloudinary https URL */
  coverImage?: string;
};

export type Post = PostFrontmatter & {
  content: string;
};

export type PostSummary = PostFrontmatter;
