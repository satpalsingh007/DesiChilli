import type { CSSProperties } from "react";
import Image from "next/image";
import { getCategoryOrThrow } from "@/lib/categories";
import { CATEGORY_ACCENT, resolveCoverSrc } from "@/lib/cover";
import type { CategorySlug } from "@/lib/types";

type CoverImageProps = {
  coverImage?: string;
  category: CategorySlug;
  /** Drawn on the generated card when a post has no photo of its own. */
  title: string;
  alt: string;
  variant?: "card" | "hero" | "article";
  sizes?: string;
  /** Set on the above-the-fold image so it is not lazy-loaded. */
  priority?: boolean;
};

export function CoverImage({
  coverImage,
  category,
  title,
  alt,
  variant = "card",
  sizes,
  priority = false,
}: CoverImageProps) {
  const src = resolveCoverSrc(coverImage);
  const accent = CATEGORY_ACCENT[category];
  const sizeMap = {
    // Sized to the real layout width so next/image doesn't over-fetch for LCP.
    card: "(max-width: 560px) 100vw, (max-width: 860px) 50vw, 360px",
    hero: "(max-width: 860px) 100vw, 640px",
    article: "(max-width: 860px) 100vw, 720px",
  };

  return (
    <div className={`cover cover-${variant}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? sizeMap[variant]}
          priority={priority}
          quality={priority ? 75 : 70}
          style={{ objectFit: "cover" }}
        />
      ) : (
        // The headline always sits next to this card, so it is decorative here.
        <div
          className="cover-art"
          style={{ "--cover-accent": accent } as CSSProperties}
          aria-hidden="true"
        >
          <span className="cover-art-label">{getCategoryOrThrow(category).tagLabel}</span>
          <span className="cover-art-title">{title}</span>
          <span className="cover-art-brand">Desi Chilli</span>
        </div>
      )}
    </div>
  );
}
