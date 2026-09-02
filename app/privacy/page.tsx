import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Desi Chilli handles your data, cookies, and third-party advertising partners such as Google AdSense.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "September 2, 2026";

export default function PrivacyPage() {
  return (
    <PageShell title="Privacy policy">
      <p>
        <em>Last updated: {UPDATED}</em>
      </p>
      <p>
        This policy explains what {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects
        when you visit <a href={SITE.url}>{SITE.url}</a>, why we collect it, and the choices
        you have. We are a content site: there are no user accounts, and we never sell your
        personal information.
      </p>

      <h2>Information we collect</h2>
      <p>
        <strong>Information you give us.</strong> If you email us or submit the contact or
        newsletter form, we receive whatever you typed — typically a name, an email address,
        and your message. We use it only to reply to you or to send the newsletter you asked
        for.
      </p>
      <p>
        <strong>Information collected automatically.</strong> Like most websites, our host
        and our service providers record standard technical data when a page loads: IP
        address, browser and device type, referring page, and the pages you viewed. This is
        used for security and to understand which recaps people read.
      </p>
      <p>
        We do not knowingly collect personal information from children under 13. If you
        believe a child has sent us personal data, email us and we will delete it.
      </p>

      <h2>Cookies</h2>
      <p>
        A cookie is a small file stored by your browser. We use two kinds:
      </p>
      <ul>
        <li>
          <strong>Essential storage</strong> that keeps the site working, such as remembering
          that you dismissed something on the page.
        </li>
        <li>
          <strong>Third-party advertising and analytics cookies</strong> set by the vendors
          listed below, used to measure traffic and to show relevant ads.
        </li>
      </ul>
      <p>
        You can block or delete cookies in your browser settings. The site will still work,
        but the ads you see may be less relevant.
      </p>

      <h2>Advertising and Google AdSense</h2>
      <p>
        We fund this site with advertising. We work with third-party ad vendors, including
        Google, to serve ads when you visit.
      </p>
      <ul>
        <li>
          Third-party vendors, including Google, use cookies to serve ads based on your prior
          visits to this website or other websites.
        </li>
        <li>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads to
          you based on your visit to this site and/or other sites on the internet.
        </li>
        <li>
          You may opt out of personalised advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            Google Ads Settings
          </a>
          . You can also opt out of a third-party vendor&apos;s use of cookies for
          personalised advertising at{" "}
          <a
            href="https://www.aboutads.info/choices/"
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            aboutads.info
          </a>
          .
        </li>
        <li>
          Third-party ad networks may also place cookies. We do not control those cookies, and
          their use is governed by the vendor&apos;s own privacy policy. See{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            how Google uses data from sites that use its services
          </a>
          .
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to see the personal data we hold
        about you, ask us to correct or delete it, or object to how it is used. Readers in the
        EU and UK have these rights under the GDPR; readers in California have similar rights
        under the CCPA. Email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will action the request.
      </p>

      <h2>Data retention and security</h2>
      <p>
        Emails and form submissions are kept only as long as needed to answer you or run the
        newsletter. The site is served over HTTPS. No website can promise perfect security,
        but we do not store payment details or sensitive personal data at all.
      </p>

      <h2>External links</h2>
      <p>
        Our recaps link to broadcasters, streaming platforms, social posts, and other
        publications. Once you follow a link, that site&apos;s privacy policy applies, not
        ours.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        When we add or remove a vendor, we update this page and change the date at the top.
        Material changes will be noted on the site.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions, access requests, and deletion requests go to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. See also our{" "}
        <Link href="/cookies">cookie policy</Link> and{" "}
        <Link href="/terms">terms of use</Link>.
      </p>
    </PageShell>
  );
}
