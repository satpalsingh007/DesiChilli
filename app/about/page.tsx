import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About us",
  description: "Why Desi Chilli exists, and who is writing the recaps.",
};

export default function AboutPage() {
  return (
    <PageShell title="About us">
      <p>
        Desi Chilli is a recap desk for Indian reality television — the fights, the
        callbacks, the captaincy tasks, and the deals that actually changed the episode.
      </p>
      <p>
        We watch the full cut, not the viral clip. Every story carries a heat index so you
        know whether you are walking into a mild explainer or a five-chili walkout.
      </p>
      <h2>What we cover</h2>
      <p>
        Bigg Boss, India&apos;s Got Latent, Shark Tank India, Splitsvilla, Roadies, and the
        formats that keep spinning off them. Recaps land the morning after. Explainers unpack
        voting math. Hot takes are labelled as opinion, not reported fact.
      </p>
      <h2>Who writes this</h2>
      <p>
        A small group of people who have been arguing about elimination nights since SMS
        voting was a landline activity. We do not take show money for coverage, and we do not
        hold spoilers back.
      </p>
    </PageShell>
  );
}
