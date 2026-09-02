import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { RecapCard } from "@/components/RecapCard";
import { CATEGORIES, SHOW_SLUGS, getCategory } from "@/lib/categories";
import { getAllPostSummaries, getPostsByCategory } from "@/lib/posts";
import type { CategorySlug } from "@/lib/types";

type CategoryPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = getCategory(params.slug);
  if (!category) return { title: "Category" };

  const description =
    category.dek ?? `Recaps, explainers, and hot takes from ${category.name}.`;
  const url = `/category/${category.slug}`;

  return {
    title: category.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${category.name} — Desi Chilli`,
      description,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const posts = getPostsByCategory(params.slug as CategorySlug);
  const suggestions = getAllPostSummaries()
    .filter((post) => {
      const keys = [post.category, ...(post.shows ?? [])];
      return keys.some((key) => SHOW_SLUGS.includes(key));
    })
    .slice(0, 2);

  return (
    <main className="wrap" id="main">
      <section className="section">
        <div className="section-head">
          <h1 className="section-title">{category.name}</h1>
          <span className="section-link">
            {posts.length} {posts.length === 1 ? "story" : "stories"}
          </span>
        </div>
        {category.dek ? <p className="category-dek">{category.dek}</p> : null}
        {posts.length === 0 ? (
          <>
            <p className="page-prose">
              We&apos;re not covering this season yet. Start with{" "}
              <Link href="/category/bigg-boss">Bigg Boss</Link> or{" "}
              <Link href="/category/indias-got-latent">India&apos;s Got Latent</Link>{" "}
              while this desk warms up.
            </p>
            {suggestions.length > 0 ? (
              <div className="recap-grid">
                {suggestions.map((post) => (
                  <RecapCard key={post.slug} post={post} />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="recap-grid">
            {posts.map((post) => (
              <RecapCard key={post.slug} post={post} />
            ))}
          </div>
        )}
        <AdSlot slot="category-mid" />
      </section>
    </main>
  );
}
