import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Public_Sans } from "next/font/google";
// import Script from "next/script";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NewsletterBand } from "@/components/NewsletterBand";
import { getAllPostSummaries } from "@/lib/posts";
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
  title: {
    default: "Desi Chilli — India's spiciest reality TV recaps",
    template: "%s — Desi Chilli",
  },
  description:
    "India's reality TV recapped, explained, and occasionally roasted. Written by people who actually watch every episode.",
  manifest: "/site.webmanifest",
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

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${publicSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
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
