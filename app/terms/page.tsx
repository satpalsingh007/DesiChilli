import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Terms of use",
};

export default function TermsPage() {
  return (
    <PageShell title="Terms of use">
      <p>
        The recaps, explainers, and opinions on Desi Chilli are for readers. Do not scrape the
        site to train a model or republish a piece in full without asking.
      </p>
      <p>
        Show names, formats, and contestant names belong to their rights holders. We write
        about televised episodes as commentary and reporting, not as an official partner of
        any network.
      </p>
      <p>
        Heat index scores are editorial judgments, not a scientific measurement of anyone&apos;s
        blood pressure — though some episodes come close.
      </p>
    </PageShell>
  );
}
