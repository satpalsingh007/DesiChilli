import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Cookie policy",
};

export default function CookiesPage() {
  return (
    <PageShell title="Cookie policy">
      <p>
        This version of Desi Chilli does not set marketing cookies. The site may use the
        storage your browser needs to keep a page working.
      </p>
      <p>
        When newsletter signup, ads, or analytics move to a real backend, any cookies those
        tools set will be listed here with an opt-out path.
      </p>
    </PageShell>
  );
}
