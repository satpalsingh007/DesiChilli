import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Privacy policy",
};

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy policy">
      <p>
        Desi Chilli is a content site. We do not sell a subscriber list, and we do not run a
        user account system in this version of the site.
      </p>
      <h2>What we collect</h2>
      <p>
        If you submit the newsletter or contact form, we receive the email address and message
        you typed. In this first version those submissions are logged in the browser only —
        nothing is stored on a server yet.
      </p>
      <h2>Ads and analytics</h2>
      <p>
        Ad slots on the site are placeholders. When live ad or analytics scripts are added,
        this page will name the vendors and what they set.
      </p>
      <h2>Contact</h2>
      <p>
        Privacy questions can go to <a href="mailto:desk@desichilly.com">desk@desichilly.com</a>.
      </p>
    </PageShell>
  );
}
