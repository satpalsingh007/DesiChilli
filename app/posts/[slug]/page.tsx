import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoverImage } from "@/components/CoverImage";
import { HeatIndex } from "@/components/HeatIndex";
import { MdxContent } from "@/components/MdxContent";
import { RecapCard } from "@/components/RecapCard";
import { authorSlug } from "@/lib/authors";
import { getCategory } from "@/lib/categories";
import { resolveCoverSrc } from "@/lib/cover";
import {
  formatPostDate,
  getAuthorInitials,
  getPostBySlug,
  getPostSlugs,
  getRelatedPostSummaries,
} from "@/lib/posts";
import { SITE, absoluteUrl } from "@/lib/site";

type PostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PostPageProps): Metadata {
  try {
    const post = getPostBySlug(params.slug);
    const url = `/posts/${post.slug}`;
    const image = resolveCoverSrc(post.coverImage) ?? SITE.ogImage;

    return {
      title: post.title,
      description: post.excerpt,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        url,
        title: post.title,
        description: post.excerpt,
        siteName: SITE.name,
        locale: SITE.locale,
        publishedTime: post.date,
        modifiedTime: post.updated ?? post.date,
        authors: [post.author],
        images: [{ url: image }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: [image],
      },
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
  const cover = resolveCoverSrc(post.coverImage);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "en-IN",
    mainEntityOfPage: absoluteUrl(`/posts/${post.slug}`),
    image: [cover ? absoluteUrl(cover) : absoluteUrl(SITE.ogImage)],
    author: {
      "@type": "Person",
      name: post.author,
      url: absoluteUrl(`/author/${authorSlug(post.author)}`),
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    articleSection: category?.name ?? "Recaps",
  };

  const faqLd = post.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((entry) => ({
          "@type": "Question",
          name: entry.q,
          acceptedAnswer: { "@type": "Answer", text: entry.a },
        })),
      }
    : null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      ...(category
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: category.name,
              item: absoluteUrl(`/category/${category.slug}`),
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: category ? 3 : 2,
        name: post.title,
        item: absoluteUrl(`/posts/${post.slug}`),
      },
    ],
  };

  return (
    <main className="wrap" id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}
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
            priority
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
            <Link href={`/author/${authorSlug(post.author)}`} rel="author">
              {post.author}
            </Link>
            <span className="dot" />
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {post.updated ? (
              <>
                <span className="dot" />
                <time dateTime={post.updated}>
                  Updated {formatPostDate(post.updated)}
                </time>
              </>
            ) : null}
            <span className="dot" />
            <span>{post.readTime} read</span>
          </div>
        </header>
        <div className="article-body">
          <MdxContent source={post.content} />
        </div>
      </article>
      {post.faq ? (
        <section className="section faq-section" aria-labelledby="faq-heading">
          <div className="section-head">
            <h2 className="section-title" id="faq-heading">
              Quick answers
            </h2>
          </div>
          <dl className="faq-list">
            {post.faq.map((entry) => (
              <div className="faq-item" key={entry.q}>
                <dt className="faq-q">{entry.q}</dt>
                <dd className="faq-a">{entry.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
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
