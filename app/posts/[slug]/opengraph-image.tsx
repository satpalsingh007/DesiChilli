import { ImageResponse } from "next/og";
import { getCategoryOrThrow } from "@/lib/categories";
import { CATEGORY_ACCENT } from "@/lib/cover";
import { getAllPostSummaries, getPostBySlug } from "@/lib/posts";
import { SITE } from "@/lib/site";

export const alt = "Desi Chilli";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPostSummaries().map((post) => ({ slug: post.slug }));
}

/**
 * Mirrors the on-page cover card, because social crawlers and Google cannot
 * render the CSS version. Satori needs explicit flex on every container.
 */
export default function OpengraphImage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const category = getCategoryOrThrow(post.category);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#fff",
          backgroundColor: CATEGORY_ACCENT[post.category],
          backgroundImage:
            "radial-gradient(120% 90% at 12% 0%, rgba(255,255,255,0.18), rgba(255,255,255,0) 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          {category.tagLabel}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: post.title.length > 78 ? 60 : 72,
            fontWeight: 700,
            lineHeight: 1.14,
            letterSpacing: -1,
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            opacity: 0.78,
          }}
        >
          <div style={{ display: "flex" }}>{SITE.name}</div>
          <div style={{ display: "flex" }}>{post.readTime}</div>
        </div>
      </div>
    ),
    size,
  );
}
