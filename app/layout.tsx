import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Public_Sans } from "next/font/google";
// import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsletterBand } from "@/components/NewsletterBand";
import { getAllPostSummaries } from "@/lib/posts";
import { SITE, absoluteUrl } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Desi Chilli — India's spiciest reality TV recaps",
    template: "%s — Desi Chilli",
  },
  description: SITE.description,
  manifest: "/site.webmanifest",
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: "Desi Chilli — India's spiciest reality TV recaps",
    description: SITE.description,
    images: [{ url: SITE.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desi Chilli — India's spiciest reality TV recaps",
    description: SITE.description,
    images: [SITE.ogImage],
  },
};

export const viewport = {
  themeColor: "#D6293A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPostSummaries();

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/logo.png"),
    description: SITE.description,
    email: SITE.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "editorial",
      email: SITE.email,
      availableLanguage: ["en", "hi"],
    },
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "en-IN",
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${publicSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        {/*
          AdSense — uncomment after replacing ca-pub-XXXXXXXXXXXXXXXX
          with your publisher ID from AdSense → Account → Account information.
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        */}
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header posts={posts} />
        {children}
        <NewsletterBand />
        <Footer />
      </body>
    </html>
  );
}
