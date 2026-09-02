import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Write for us",
  description:
    "Pitch a reported recap, voting explainer, or argued hot take to the Desi Chilli desk.",
  alternates: { canonical: "/write" },
};

export default function WritePage() {
  return (
    <PageShell title="Write for us">
      <p>
        We take reported recaps, voting explainers, and argued hot takes. If you watched the
        episode twice and still have notes in your phone, you are in the right place.
      </p>
      <h2>What we want</h2>
      <p>
        A clear timeline, named sources where you have them, and a point of view that is not
        just the comment section restated. Pitch the story, not a season-long column idea.
      </p>
      <p>
        Send 150 words and two published clips to the{" "}
        <Link href="/contact">contact form</Link>, subject line: “Pitch.”
      </p>
    </PageShell>
  );
}
