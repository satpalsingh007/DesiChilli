import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageShell } from "@/components/PageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Desi Chilli desk with tips, corrections, pitches, or advertising enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell title="Contact">
      <p>
        Corrections, tips, pitches, and &ldquo;you missed the real fight in the kitchen&rdquo;
        emails all reach the same desk. We read everything and usually reply within two to
        three working days.
      </p>

      <h2>Email us</h2>
      <p>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      <p>
        Use one of these subject lines so it reaches the right person faster:
      </p>
      <ul>
        <li>
          <strong>Correction</strong> — a wrong name, date, number, or timeline. Include the
          article link.
        </li>
        <li>
          <strong>Tip</strong> — casting, twists, or something you saw on the live feed.
        </li>
        <li>
          <strong>Pitch</strong> — see <Link href="/write">write for us</Link> before sending.
        </li>
        <li>
          <strong>Advertising</strong> — rates and inventory, see{" "}
          <Link href="/advertise">advertise</Link>.
        </li>
        <li>
          <strong>Privacy</strong> — data questions, see our{" "}
          <Link href="/privacy">privacy policy</Link>.
        </li>
      </ul>

      <h2>Send a message</h2>
      <p>
        This form is a quick way to reach us. If you need a reply with attachments, email
        directly instead.
      </p>
      <ContactForm />
    </PageShell>
  );
}
