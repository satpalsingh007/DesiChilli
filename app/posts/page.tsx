import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { RecapCard } from "@/components/RecapCard";
import { getAllPostSummaries } from "@/lib/posts";

export const metadata: Metadata = {
  title: "All recaps",
  description: "Every Desi Chilli recap, explainer, and hot take in one place.",
};

export default function PostsIndexPage() {
  const posts = getAllPostSummaries();

  return (
    <main className="wrap" id="main">
      <section className="section">
        <div className="section-head">
          <h1 className="section-title">Latest recaps</h1>
          <span className="section-link">
            {posts.length} {posts.length === 1 ? "story" : "stories"}
          </span>
        </div>
        <div className="recap-grid">
          {posts.map((post) => (
            <RecapCard key={post.slug} post={post} />
          ))}
        </div>
        <AdSlot slot="posts-index-mid" />
      </section>
    </main>
  );
}
