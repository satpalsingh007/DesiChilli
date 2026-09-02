import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "Which cookies Desi Chilli and its advertising partners set, and how to turn them off.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <PageShell title="Cookie policy">
      <p>
        Cookies are small files a site stores in your browser. This page explains the ones you
        may pick up on {SITE.name}. It sits alongside our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>Essential</h2>
      <p>
        Set by us or our host to keep pages loading correctly and to protect the site from
        abuse. These cannot be switched off from inside the site.
      </p>

      <h2>Advertising</h2>
      <p>
        Set by Google and other advertising partners to measure ad performance and to limit
        how often you see the same ad. Google&apos;s advertising cookies may be used to show
        ads based on your previous visits to this and other sites. You can turn personalised
        ads off at{" "}
        <a
          href="https://www.google.com/settings/ads"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          Google Ads Settings
        </a>{" "}
        or{" "}
        <a
          href="https://www.aboutads.info/choices/"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          aboutads.info
        </a>
        .
      </p>

      <h2>Analytics</h2>
      <p>
        Used to count page views and see which recaps people finish. This is aggregate traffic
        data, not a profile of you by name.
      </p>

      <h2>Managing cookies</h2>
      <p>
        Every major browser lets you block or delete cookies in its settings, and most offer a
        private window that discards them when you close it. Blocking cookies will not break
        the recaps.
      </p>
      <p>
        Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </PageShell>
  );
}
