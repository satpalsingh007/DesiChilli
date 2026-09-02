import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HeroLead } from "@/components/HeroLead";
import { HotTakes } from "@/components/HotTakes";
import { RecapCard } from "@/components/RecapCard";
import { TrendingSidebar } from "@/components/TrendingSidebar";
import { getHomepageSlots } from "@/lib/homepage";

export const revalidate = 3600;

export default function HomePage() {
  const { heroes, recaps, hotTakes, trending } = getHomepageSlots();

  return (
    <main className="wrap" id="main">
      <section className="hero">
        <div className="hero-grid">
          <HeroCarousel>
            {heroes.map((post) => (
              <HeroLead key={post.slug} post={post} />
            ))}
          </HeroCarousel>
          <TrendingSidebar posts={trending} />
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Latest recaps</h2>
          <Link href="/posts" className="section-link">
            View all →
          </Link>
        </div>
        <div className="recap-grid">
          {recaps.map((post) => (
            <RecapCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <AdSlot slot="homepage-mid" />

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">Hot takes</h2>
          <Link href="/category/hot-takes" className="section-link">
            More opinion →
          </Link>
        </div>
        <HotTakes posts={hotTakes} />
      </section>
    </main>
  );
}
