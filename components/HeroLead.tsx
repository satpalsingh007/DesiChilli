import Link from "next/link";
import { CoverImage } from "./CoverImage";
import { HeatIndex } from "./HeatIndex";
import { formatPostDate, getAuthorInitials } from "@/lib/posts";
import type { PostSummary } from "@/lib/types";

type HeroLeadProps = {
  post: PostSummary;
};

export function HeroLead({ post }: HeroLeadProps) {
  return (
    <div className="hero-lead">
      <Link href={`/posts/${post.slug}`} aria-hidden="true" tabIndex={-1}>
        <CoverImage
          coverImage={post.coverImage}
          category={post.category}
          alt=""
          variant="hero"
        />
      </Link>
      <h2 className="hero-headline">
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>
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
    </div>
  );
}
