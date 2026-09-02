import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Desi Chilli is an independent recap desk for Indian reality television — who writes it, what we cover, and how we handle corrections.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageShell title="About us">
      <p>
        Desi Chilli is an independent recap desk for Indian reality television. We cover the
        fights, the callbacks, the captaincy tasks, and the deals that actually changed an
        episode — written the same way you would explain it to a friend who missed the show.
      </p>
      <p>
        We watch the full cut, not the viral clip. Every story carries a heat index from one
        to five chilies so you know whether you are opening a mild explainer or a
        five-chili walkout before you start reading.
      </p>

      <h2>What we cover</h2>
      <p>
        Our regular desks are <Link href="/category/bigg-boss">Bigg Boss</Link>,{" "}
        <Link href="/category/indias-got-latent">India&apos;s Got Latent</Link>, and{" "}
        <Link href="/category/bollywood">Bollywood</Link>, with Shark Tank India,
        Splitsvilla, and Roadies opening as those seasons return. Recaps land after the
        episode. <Link href="/category/explainers">Explainers</Link> unpack formats, twists,
        and voting math. <Link href="/category/hot-takes">Hot takes</Link> are clearly
        labelled as opinion, never presented as reporting.
      </p>

      <h2>How we work</h2>
      <p>
        Every recap is written by a person who watched the episode. We do not publish
        AI-generated filler, we do not rewrite other outlets&apos; scoops and call them our
        own, and we do not take payment from a show, network, or streamer in exchange for
        coverage. When we quote another publication, we say so and link out.
      </p>
      <p>
        Reality television runs on rumour. When something is unconfirmed, we write that it is
        unconfirmed. Casting lists, twist leaks, and elimination spoilers are labelled as
        reports until a broadcaster or the show itself confirms them.
      </p>

      <h2>Corrections</h2>
      <p>
        If we get a name, a date, a vote count, or a timeline wrong, we want to fix it. Email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with the article link and what is
        wrong. Corrections are made on the article itself, and significant ones are noted at
        the bottom of the piece.
      </p>

      <h2>Who runs it</h2>
      <p>
        Desi Chilli is a small independent team based in India, run by people who have been
        arguing about elimination nights since SMS voting was a landline activity. It is not
        affiliated with, endorsed by, or operated by any television network, production
        house, or streaming platform. All show names, formats, and logos belong to their
        respective rights holders; we write about them as commentary and criticism.
      </p>

      <h2>Contact</h2>
      <p>
        Tips, corrections, pitches, and advertising enquiries all go to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, or through the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </PageShell>
  );
}
