import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Advertise",
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
        <a href="mailto:ads@desichilly.com">ads@desichilly.com</a>.
      </p>
    </PageShell>
  );
}
