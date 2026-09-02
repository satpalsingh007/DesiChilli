# Desi Chilli — site briefing for content strategy

Use this document to advise how to source, plan, and write content for this site. Do not redesign the product. Recommend editorial process, story types, calendars, and SEO/audience tactics that fit what already exists.

---

## 1. What this site is

**Name:** Desi Chilli  
**Positioning:** An entertainment recap desk for **Indian reality television**.  
**Tagline:** India's reality TV, served with full masala.  
**Promise:** Recapped, explained, and occasionally roasted. Written by people who actually watch every episode.  
**Voice:** Sharp, specific, timeline-first. Watch the full cut, not just the viral clip. Hot takes are labelled as opinion, not reported fact. Do not hold spoilers back. Do not take show money for coverage.

**Heat index:** Every story has a chili rating from **0–5**.  
- 1 = mild explainer / low drama  
- 5 = walkout-level chaos  
The rating is the only thing that should change how “spicy” a story looks. It is not a star review of a film or a show’s quality.

**Scope decision:** Stay an **entertainment** site. Do not expand into business, international news, or other niches yet. Movies can run as hot takes until a Movies topic exists. Growth = deeper entertainment (more shows, recaps, explainers, opinions), not a general portal.

---

## 2. How the site operates (tech + publishing)

- **Stack:** Next.js (App Router) static-style blog. No CMS, no database.
- **Content lives as MDX files** in `/content/posts/{slug}.mdx`.
- **To publish a story:** add a new `.mdx` file with YAML frontmatter + article body. That is the entire CMS.
- **Homepage slots are hand-picked** by slug in `/lib/homepage.ts` (hero, latest recaps, hot takes, trending). New posts do **not** automatically become the lead story.
- **Category pages** auto-list any post whose `category` or optional `shows` field matches that slug.
- **All recaps** (`/posts`) lists every post, newest first.
- **Search** (header modal) matches title, excerpt, and the **primary category** name only.
- **Newsletter** is a frontend form (email capture / log). No paid subscriber product yet.
- **Ads:** reserved slots on homepage and in-article (`AdSlot`). Not wired to a real ad network yet.
- **Cover images:** optional. Path convention `/images/posts/{slug}-cover.jpg`. If the file is missing, a flat color block shows (green for shows, gold for explainers, red for hot takes).
- **In-body images:** MDX `![alt](/images/posts/{slug}-1.jpg)` etc.

There is no author login, no draft workflow, no comments, no social embed pipeline. Editorial process is file-based.

---

## 3. Navigation / tabs (what the audience can click)

### Primary nav (header)

1. **Latest** → `/` (homepage)
2. **Bigg Boss watch** → `/category/bigg-boss`
3. **India's Got Latent** → `/category/indias-got-latent`
4. **Shark Tank India** → `/category/shark-tank-india`
5. **Splitsvilla** → `/category/splitsvilla`
6. **Roadies** → `/category/roadies`
7. **Hot takes** → `/category/hot-takes`
8. **Explainers** → `/category/explainers`

Also in the header (not nav tabs):

- Search
- “Get the daily dose” (scrolls to newsletter)
- Trending ticker (promo line)
- Hamburger on smaller screens

### Homepage modules (in order)

1. **Lead story** — one featured post (currently an India's Got Latent episode recap)
2. **Trending now** — 4 hand-picked links (sidebar)
3. **Latest recaps** — 6 cards → “View all” goes to `/posts`
4. **Mid-page ad slot**
5. **Hot takes** — 3 numbered opinion items → “More opinion” goes to `/category/hot-takes`
6. **Newsletter band** — “Never miss a masala moment”
7. **Footer**

### Footer

**Shows:** Bigg Boss, India's Got Latent, Shark Tank India, Splitsvilla, Roadies  

**Site:**

- About us → `/about`
- Contact → `/contact`
- Write for us → `/write`
- Advertise → `/advertise`

**Legal:** Privacy, Terms, Cookies

---

## 4. Story types (this is the editorial taxonomy)

The site mixes two kinds of “category.” This matters for how you assign content.

### A. Show desks (topic pages)

A recap or show-specific story uses the **show slug as `category`**. One tag on the card. Lands on that show’s page.

| Slug | Nav label | Tag on card | Best for |
|---|---|---|---|
| `bigg-boss` | Bigg Boss watch | Bigg Boss | Nominations, evictions, captaincy, house fights |
| `indias-got-latent` | India's Got Latent | India's Got Latent | Episode recaps, judge walk-offs, callbacks |
| `shark-tank-india` | Shark Tank India | Shark Tank India | Pitches, deals, finale recaps |
| `splitsvilla` | Splitsvilla | Splitsvilla | Connection week, breakups, couple recaps |
| `roadies` | Roadies | Roadies | Tasks, votes, season recaps |

### B. Formats (not shows)

| Slug | Nav label | Tag on card | Best for |
|---|---|---|---|
| `hot-takes` | Hot takes | Hot take | Opinion, argument, “here's why.” Not a recap. |
| `explainers` | Explainers | Explainer | Voting math, how a format works, first-timer guides |

### Cross-listing (`shows`)

A post has **one primary `category`** (the tag + color).  
Optional `shows: [slug]` also lists it on that show page.

Examples already on the site:

- Hot take about Latent judges → `category: hot-takes` + `shows: [indias-got-latent]`  
  → appears on Hot takes **and** India's Got Latent.
- Roadies first-timer guide → `category: explainers` + `shows: [roadies]`  
  → appears on Explainers **and** Roadies.

**Movies / other entertainment:** there is no Movies tab yet. A movie opinion should use `category: hot-takes`. It will show on Hot takes and Latest only, not on a show page.

Do **not** invent slugs. Allowed values only:

`bigg-boss` | `indias-got-latent` | `shark-tank-india` | `splitsvilla` | `roadies` | `hot-takes` | `explainers`

---

## 5. How to file a post (frontmatter contract)

Every MDX file starts with:

```yaml
---
title: "Headline — specific, spoiler-okay, episode-aware"
excerpt: "1–2 sentences. What happened and why it matters."
category: bigg-boss          # required, one of the 7 slugs
shows: [indias-got-latent]   # optional, extra listing page(s)
heat: 3                      # integer 0–5
author: Riya Malhotra
date: "2026-08-29"           # ISO date, sorts Latest
readTime: "6 min"
slug: judges-walked-off-indias-got-latent-episode-9
coverImage: /images/posts/judges-walked-off-indias-got-latent-episode-9-cover.jpg
---
```

**URL:** `/posts/{slug}`  
**Filename:** `{slug}.mdx` (must match `slug`)

**Heat guide (use this when assigning):**

| Heat | Typical story |
|---|---|
| 1 | Explainer, voting math, first-timer guide, calm deal recap |
| 2 | Standard nominations / mild house drama |
| 3 | Strong opinion or a notable panel fight |
| 4 | Walk-off, triple breakup, major on-air blowup |
| 5 | Season-defining scandal (use rarely) |

**Authors currently in rotation:** Riya Malhotra, Aarav Sen, Kabir Rao, Meera Iyer, Tanya Deshpande, Vikram Shah.

**Write-for-us standard (from `/write`):** reported recaps, voting explainers, argued hot takes. Pitch = 150 words + two published clips. Want a clear timeline, named sources where possible, a point of view that is not just the comment section restated. Pitch a story, not a season-long column.

---

## 6. Current content inventory (seed / examples)

Homepage hero is hard-coded to the Latent episode 9 recap.

| Title | Category | Shows | Heat | Type |
|---|---|---|---|---|
| Judges walked off the India's Got Latent set — episode 9 | indias-got-latent | — | 4 | Recap / lead |
| Week 6 nominations explained | bigg-boss | — | 2 | Recap |
| How reality show elimination voting actually works in India | explainers | — | 1 | Explainer (all shows) |
| India's Got Latent's judging panel needs a shake-up | hot-takes | indias-got-latent | 3 | Opinion + show page |
| The pitch that made all five sharks say yes | shark-tank-india | — | 1 | Recap |
| Connection week ends in the season's messiest triple breakup | splitsvilla | — | 4 | Recap |
| A first-timer's guide to watching Roadies | explainers | roadies | 1 | Explainer + show page |
| Reality TV recaps shouldn't need to be mean | hot-takes | — | 2 | Industry opinion |
| Judging panels are becoming more famous than the contestants | hot-takes | — | 3 | Industry opinion |
| Season lengths keep growing. Viewer patience isn't | hot-takes | — | 1 | Industry opinion |

Gaps a content plan should notice: Bigg Boss and Latent have more depth; Shark Tank / Splitsvilla / Roadies are thin; no weekly series yet; no movie topic; no cricket/entertainment-adjacent desk; homepage recap grid and trending list are manual.

---

## 7. Audience and distribution surfaces (what content must serve)

**Primary reader:** Indian (and diaspora) viewers who watch these shows and want the morning-after recap, the voting math, or a sharable opinion.

**On-site destinations a story can feed:**

- Homepage lead (one story — pick the highest-heat / most timely)
- Latest recaps grid
- Show page (loyal weekly readers)
- Hot takes list (opinion browsers)
- Explainers page (evergreen / search)
- `/posts` index
- Search modal
- Trending sidebar
- Newsletter (“one email a day… recaps, hot takes, and elimination news”)

**SEO / share shape that already fits the design:**

- Recaps: “what actually happened in episode N” + timeline
- Explainers: “how X voting works” / “first-timer’s guide”
- Hot takes: a claim in the headline, argued in the body

---

## 8. What to ask ChatGPT / a content strategist

Please propose:

1. A **weekly editorial calendar** for a 1–3 person desk covering the five shows + hot takes + explainers.
2. How to **get raw material** the right way: watch full episodes, official apps, press notes, social clips — without inventing quotes or relying only on viral cuts (the site’s stated rule).
3. A **story mix** per week (e.g. 1 lead recap, 2 show recaps, 1 explainer, 1 hot take) and how to choose the homepage hero.
4. When to use `category: {show}` vs `category: hot-takes` + `shows: [...]` vs `explainers`.
5. How to handle **movies or other entertainment** until there is a Movies tab (use hot takes; do not fake a show slug).
6. **Evergreen vs timely** — which explainers to write once and keep ranking.
7. **Heat-index assignment** rules so ratings stay consistent.
8. How to grow audience **without** turning the site into general news (stay entertainment).
9. Contributor pipeline that matches `/write` (150-word pitch, two clips).
10. Headline and excerpt formulas that match the existing voice (specific, spoiler-okay, no vague clickbait).

Do not recommend a new CMS, a redesign, or new top-level niches (business, international, sports news) unless framed as a later phase.
