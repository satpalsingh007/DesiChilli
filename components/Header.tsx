"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { getCategory, getNavItems } from "@/lib/categories";
import type { PostSummary } from "@/lib/types";

type HeaderProps = {
  posts: PostSummary[];
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Header({ posts }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [clock, setClock] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuId = useId();
  const searchTitleId = useId();

  useEffect(() => {
    const formatClock = () =>
      new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    setClock(formatClock());
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    if (!searchOpen && !menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [searchOpen, menuOpen]);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const navItems = useMemo(() => getNavItems(posts), [posts]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];
    return posts.filter((post) => {
      const category = getCategory(post.category);
      const showLabels = (post.shows ?? []).flatMap((slug) => {
        const show = getCategory(slug);
        return show ? [show.name, show.tagLabel, show.navLabel] : [];
      });
      const haystack = [
        post.title,
        post.excerpt,
        category?.name,
        category?.tagLabel,
        category?.navLabel,
        ...showLabels,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [posts, query]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function scrollToNewsletter() {
    const band = document.getElementById("newsletter");
    if (band) {
      band.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
      return;
    }
    router.push("/#newsletter");
  }

  const WordmarkTag = pathname === "/" ? "h1" : "p";

  return (
    <>
      <div className="topstrip">
        <div className="wrap">
          <span>
            <span className="tick" aria-hidden="true">
              ●
            </span>
            Trending: India&apos;s Got Latent judges spar over episode 9 twist
          </span>
          <span suppressHydrationWarning>{clock}</span>
        </div>
      </div>

      <header className="masthead">
        <div className="wrap masthead-inner">
          <div>
            <div className="wordmark">
              <WordmarkTag className="wordmark-title">
                <Link href="/">
                  <Image
                    src="/logo.png"
                    alt="Desi Chilli"
                    width={2000}
                    height={723}
                    className="wordmark-logo"
                    style={{ width: "auto", height: "80px" }}
                    priority
                  />
                </Link>
              </WordmarkTag>
            </div>
            <div className="tagline">India&apos;s reality TV, served with full masala</div>
          </div>
          <div className="mast-actions">
            <button
              type="button"
              className="search-btn"
              onClick={() => {
                setSearchOpen(true);
                setMenuOpen(false);
              }}
            >
              Search
            </button>
            <button type="button" className="subscribe-btn" onClick={scrollToNewsletter}>
              Get the daily dose
            </button>
            <button
              type="button"
              className="nav-toggle"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <nav className="primary" aria-label="Primary">
          <div className="wrap">
            <ul className="desktop-nav">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={isActive(item.href) ? "active" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div id={menuId} className={menuOpen ? "mobile-nav is-open" : "mobile-nav"}>
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={isActive(item.href) ? "active" : undefined}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {searchOpen ? (
        <div
          className="search-overlay"
          role="presentation"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="search-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={searchTitleId}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="search-close"
              onClick={() => setSearchOpen(false)}
            >
              Close
            </button>
            <h2 id={searchTitleId}>Search recaps</h2>
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title"
              aria-label="Search posts by title"
            />
            {!query.trim() ? (
              <p className="search-hint">Type a show or recap title to filter posts.</p>
            ) : results.length === 0 ? (
              <p className="search-empty">No recaps match that search.</p>
            ) : (
              <ul className="search-results">
                {results.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/posts/${post.slug}`} onClick={() => setSearchOpen(false)}>
                      <span className="recap-title">{post.title}</span>
                      <span className="recap-excerpt">{post.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
