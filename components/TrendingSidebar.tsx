import Link from "next/link";
import { trendingMeta } from "@/lib/homepage";
import type { PostSummary } from "@/lib/types";

type TrendingSidebarProps = {
  posts: PostSummary[];
};

export function TrendingSidebar({ posts }: TrendingSidebarProps) {
  return (
    <aside className="side-panel">
      <h3 className="side-title">Trending now</h3>
      {posts.map((post, index) => (
        <div className="trend-item" key={post.slug}>
          <span className="trend-num">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <p className="trend-title">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </p>
            <span className="trend-meta">{trendingMeta(post)}</span>
          </div>
        </div>
      ))}
    </aside>
  );
}
