import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Advertise",
  description:
    "Reserved homepage, in-article, and category ad inventory on Desi Chilli, plus how to request a media kit.",
  alternates: { canonical: "/advertise" },
};

export default function AdvertisePage() {
  return (
    <PageShell title="Advertise">
      <p>
        Homepage, in-article, and category pages already have reserved ad slots. The dashed
        boxes you see on the site are the units a live partner can occupy without a layout
        rewrite.
      </p>
      <p>
        For a media kit and available inventory, write to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with the subject line
        &ldquo;Advertising&rdquo;.
      </p>
    </PageShell>
  );
}
