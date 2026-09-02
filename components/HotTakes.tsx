import Link from "next/link";
import type { PostSummary } from "@/lib/types";
import { HeatIndex } from "./HeatIndex";

type HotTakesProps = {
  posts: PostSummary[];
};

export function HotTakes({ posts }: HotTakesProps) {
  return (
    <div className="takes-list">
      {posts.map((post, index) => (
        <div className="take-row" key={post.slug}>
          <span className="take-index">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="take-title">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="take-sub">{post.excerpt}</p>
          </div>
          <span className="take-heat">
            <HeatIndex rating={post.heat} />
          </span>
        </div>
      ))}
    </div>
  );
}
