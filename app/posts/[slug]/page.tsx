import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverImage } from "@/components/CoverImage";
import { HeatIndex } from "@/components/HeatIndex";
import { MdxContent } from "@/components/MdxContent";
import { RecapCard } from "@/components/RecapCard";
import { getCategory } from "@/lib/categories";
import {
  formatPostDate,
  getAuthorInitials,
  getPostBySlug,
  getPostSlugs,
  getRelatedPostSummaries,
} from "@/lib/posts";

type PostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  try {
    const post = getPostBySlug(params.slug);
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return { title: "Recap not found" };
  }
}

export default function PostPage({ params }: PostPageProps) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const category = getCategory(post.category);
  const related = getRelatedPostSummaries(post.slug);

  return (
    <main className="wrap" id="main">
      <article>
        <header className="article-hero">
          <nav className="article-crumb" aria-label="Breadcrumb">
            <Link href="/">Latest</Link>
            {category ? (
              <>
                <span aria-hidden="true"> / </span>
                <Link href={`/category/${category.slug}`}>{category.tagLabel}</Link>
              </>
            ) : null}
          </nav>
          <CoverImage
            coverImage={post.coverImage}
            category={post.category}
            alt={post.title}
            variant="article"
          />
          {category ? (
            <Link href={`/category/${category.slug}`} className={`cat-tag ${category.tagClass}`}>
              {category.tagLabel}
            </Link>
          ) : null}
          <h1 className="hero-headline">{post.title}</h1>
          <p className="hero-dek">{post.excerpt}</p>
          <div className="heat-row">
            <span className="heat-label">Heat index</span>
            <HeatIndex rating={post.heat} />
          </div>
          <div className="meta-row">
            <span className="avatar">{getAuthorInitials(post.author)}</span>
            <span>{post.author}</span>
            <span className="dot" />
            <span>{formatPostDate(post.date)}</span>
            <span className="dot" />
            <span>{post.readTime} read</span>
          </div>
        </header>
        <div className="article-body">
          <MdxContent source={post.content} />
        </div>
      </article>
      {related.length > 0 ? (
        <section className="section related-section">
          <div className="section-head">
            <h2 className="section-title">More from this show</h2>
          </div>
          <div className="recap-grid">
            {related.map((item) => (
              <RecapCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
