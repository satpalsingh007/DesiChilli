import Image from "next/image";
import { CATEGORY_ACCENT, resolveCoverSrc } from "@/lib/cover";
import type { CategorySlug } from "@/lib/types";

type CoverImageProps = {
  coverImage?: string;
  category: CategorySlug;
  alt: string;
  variant?: "card" | "hero" | "article";
  sizes?: string;
  /** Set on the above-the-fold image so it is not lazy-loaded. */
  priority?: boolean;
};

export function CoverImage({
  coverImage,
  category,
  alt,
  variant = "card",
  sizes,
  priority = false,
}: CoverImageProps) {
  const src = resolveCoverSrc(coverImage);
  const accent = CATEGORY_ACCENT[category];
  const sizeMap = {
    card: "(max-width: 560px) 100vw, (max-width: 860px) 50vw, 380px",
    hero: "(max-width: 860px) 100vw, 720px",
    article: "(max-width: 860px) 100vw, 800px",
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
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div
          className="cover-fallback"
          style={{ backgroundColor: accent }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
