import Image from "next/image";
import type { ImgHTMLAttributes } from "react";

export function MdxImage({
  src,
  alt,
  width,
  height,
}: ImgHTMLAttributes<HTMLImageElement>) {
  if (!src || typeof src !== "string") return null;

  const parsedWidth = typeof width === "string" ? Number(width) : width;
  const parsedHeight = typeof height === "string" ? Number(height) : height;

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={parsedWidth || 1200}
      height={parsedHeight || 675}
      className="article-image"
      sizes="(max-width: 860px) 100vw, 680px"
    />
  );
}
