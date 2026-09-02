import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to the Desi Chilli desk.",
};

export default function ContactPage() {
  return (
    <PageShell title="Contact">
      <p>
        Corrections, tips, and “you missed the real fight in the kitchen” emails all go here.
        We reply when the episode is over.
      </p>
      <p>
        Press and partnerships:{" "}
        <a href="mailto:desk@desichilly.com">desk@desichilly.com</a>
      </p>
      <ContactForm />
    </PageShell>
  );
}
