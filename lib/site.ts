export const SITE = {
  name: "Desi Chilli",
  url: "https://desichilli.in",
  tagline: "India's reality TV, served with full masala",
  description:
    "India's reality TV recapped, explained, and occasionally roasted. Bigg Boss, India's Got Latent, Bollywood, and the formats that keep spinning off them.",
  email: "satpalsingh248007@gmail.com",
  locale: "en_IN",
  ogImage: "/logo.png",
} as const;

export function absoluteUrl(pathname = "/"): string {
  return new URL(pathname, SITE.url).toString();
}
