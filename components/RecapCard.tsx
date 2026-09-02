import Link from "next/link";
import { getCategoryOrThrow } from "@/lib/categories";
import type { PostSummary } from "@/lib/types";
import { CoverImage } from "./CoverImage";
import { HeatIndex } from "./HeatIndex";

type RecapCardProps = {
  post: PostSummary;
};

export function RecapCard({ post }: RecapCardProps) {
  const category = getCategoryOrThrow(post.category);

  return (
    <article className="recap-card">
      <Link href={`/posts/${post.slug}`} aria-hidden="true" tabIndex={-1}>
        <CoverImage
          coverImage={post.coverImage}
          category={post.category}
          alt=""
          variant="card"
        />
      </Link>
      <Link href={`/category/${category.slug}`} className={`cat-tag ${category.tagClass}`}>
        {category.tagLabel}
      </Link>
      <h3 className="recap-title">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="recap-excerpt">{post.excerpt}</p>
      <div className="card-foot">
        <HeatIndex rating={post.heat} />
        <span className="meta-row">
          <span className="dot" />
          {post.readTime}
        </span>
      </div>
    </article>
  );
}
