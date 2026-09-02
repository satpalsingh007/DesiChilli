import Link from "next/link";
import Image from "next/image";
import { SHOW_SLUGS, categoryHasPosts, getCategoryOrThrow } from "@/lib/categories";
import { getAllPostSummaries } from "@/lib/posts";

export function Footer() {
  const posts = getAllPostSummaries();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <h4>
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Desi Chilli"
                  width={133}
                  height={48}
                  className="footer-logo"
                />
              </Link>
            </h4>
            <p>
              India&apos;s reality TV recapped, explained, and occasionally roasted. Written
              by people who actually watch every episode.
            </p>
          </div>
          <div className="footer-col">
            <h5>Shows</h5>
            <ul>
              {SHOW_SLUGS.map((slug) => {
                const show = getCategoryOrThrow(slug);
                const live = categoryHasPosts(slug, posts);
                return (
                  <li key={slug}>
                    {live ? (
                      <Link href={`/category/${slug}`}>{show.name}</Link>
                    ) : (
                      <span className="footer-soon">
                        {show.name} <em>Soon</em>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Site</h5>
            <ul>
              <li>
                <Link href="/about">About us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/write">Write for us</Link>
              </li>
              <li>
                <Link href="/advertise">Advertise</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li>
                <Link href="/privacy">Privacy policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of use</Link>
              </li>
              <li>
                <Link href="/cookies">Cookie policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Desi Chilli. All rights reserved.</span>
          <span>Made with too much chai and zero spoilers held back</span>
        </div>
      </div>
    </footer>
  );
}
