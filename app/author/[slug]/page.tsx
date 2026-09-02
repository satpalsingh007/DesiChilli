import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecapCard } from "@/components/RecapCard";
import { getAllAuthors, getAuthorBySlug } from "@/lib/authors";
import { getCategory } from "@/lib/categories";
import { SITE, absoluteUrl } from "@/lib/site";

type AuthorPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllAuthors().map((author) => ({ slug: author.slug }));
}

export function generateMetadata({ params }: AuthorPageProps): Metadata {
  const author = getAuthorBySlug(params.slug);
  if (!author) return { title: "Writer not found" };

  const url = `/author/${author.slug}`;

  return {
    title: author.name,
    description: author.bio,
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      url,
      title: `${author.name} — ${SITE.name}`,
      description: author.bio,
      siteName: SITE.name,
      locale: SITE.locale,
    },
  };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = getAuthorBySlug(params.slug);
  if (!author) notFound();

  const beatNames = author.beats
    .map((beat) => getCategory(beat)?.name)
    .filter((name): name is string => Boolean(name));

  const profileLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: author.name,
      url: absoluteUrl(`/author/${author.slug}`),
      description: author.bio,
      knowsAbout: beatNames,
      worksFor: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
      },
    },
  };

  return (
    <main className="wrap" id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }}
      />
      <section className="section">
        <div className="section-head">
          <h1 className="section-title">{author.name}</h1>
          <span className="section-link">
            {author.posts.length}{" "}
            {author.posts.length === 1 ? "story" : "stories"}
          </span>
        </div>
        <p className="category-dek">{author.bio}</p>
        <div className="recap-grid">
          {author.posts.map((post) => (
            <RecapCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
