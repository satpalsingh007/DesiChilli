# Desi Chilli — Writer Brief

## What Desi Chilli is

Desi Chilli is an Indian entertainment site covering **reality TV and Bollywood** with recaps, explainers, and opinion. Voice: sharp, specific, slightly spicy — never clickbait, never filler, never “AI blog” tone.

**Beats we cover**
- Bigg Boss
- India's Got Latent
- MTV Roadies
- Bollywood (box office, releases, industry takes)
- Hot takes (opinion, clearly labelled)
- Explainers (how something works)

**Not covered yet (don’t invent posts for these unless asked):** Shark Tank India, Splitsvilla.

---

## Pick the right post type first

| Type | When to write it | Target length | Notes |
|------|------------------|---------------|-------|
| **Explainer / guide / preview** | Evergreen search intent (“how to vote”, “what is Extra Jeevan Daan”, audition guides) | **1,200–1,800 words** | Highest priority. Must be useful on its own. |
| **Episode / finale recap** | After an episode or finale | **700–1,000 words** | What happened + why it matters. |
| **Hot take / opinion** | A clear argument about a film, cast, or format | **500–800 words** | Stay opinionated. Don’t pad to hit a number. |
| **Box-office / news note** | Opening numbers, day-2, clash stories | **500–700 words** | Numbers + context + one clear takeaway. |

**Hard rule:** Do not write under **500 words** unless we explicitly ask for a short note. Thin posts hurt AdSense and SEO. Prefer one strong 1,200-word explainer over three 350-word summaries.

---

## Voice and quality bar

**Sound like**
- Someone who actually watched / followed the story
- Confident, direct, a little spicy
- Explains *why* something matters, not just *what* happened

**Do not sound like**
- Wire-agency copy (“In a latest development…”)
- Keyword-stuffed SEO (“In this article we will discuss…”)
- Fake drama (“You won’t believe what happened next”)
- Generic AI filler (empty adjectives, repeating the same claim three ways)

**Quality checklist (must pass all)**
1. First paragraph answers the reader’s question in 2–4 sentences.
2. Every H2 is a **real question** a reader would ask.
3. Confirmed facts and rumours are clearly separated.
4. At least one section adds value no aggregator has (mistakes, scams, strategy, “what this means”).
5. Sources named for numbers (Sacnilk, Bollywood Hungama, official app, on-air promo, etc.).
6. No invented dates, cast names, vote rules, or twist mechanics.
7. Ends with “what’s still unconfirmed” or “what to watch next” when relevant.

---

## Structure (required)

### 1. Opening (first paragraph)
Lead with the answer, bolded.

Good:
> **Bigg Boss 20 voting happens inside the season’s official streaming app… You vote to *save*, not to evict…**

Bad:
> In today’s entertainment world, voting has become very important for reality shows…

### 2. Ad slots (place exactly like this)
```mdx
<AdSlot slot="in-article-top" className="ad-slot-inline" />
```
After the intro, and again around the middle:
```mdx
<AdSlot slot="in-article-mid" className="ad-slot-inline" />
```
Longer pieces can also use `in-article-bottom` near the end.

### 3. Headings
Use `##` only (no random `#` in the body). Every heading = a question.

Examples:
- `## Where does Bigg Boss 20 voting happen?`
- `## How big was Mirzapur's opening day, really?`
- `## What gets auditionees cut early?`

Not:
- `## Introduction`
- `## Conclusion`
- `## Voting Process Overview`

Aim for **4–10 H2s** depending on length.

### 4. Closing
Useful next step + 2–4 internal links to related Desi Chilli posts (not only external news links).

---

## Keywords and SEO (practical, not stuffed)

**Title**
- 55–70 characters when possible
- Include the main search phrase naturally
- Prefer clarity over cleverness

Good titles:
- `How to Vote in Bigg Boss 20: Where It Happens and What Actually Counts`
- `MTV Roadies REBIRTH 2026 Auditions: Cities, Eligibility & Common Questions Asked`
- `What Is 'Extra Jeevan Daan'? Bigg Boss 20's Twist, Explained`

**Primary keyword:** one clear phrase the post owns  
**Secondary keywords:** related questions woven into H2s and FAQ

Example for a voting post:
- Primary: `how to vote bigg boss 20`
- Secondary: voting window, save or evict, fake voting sites, JioHotstar vote

**Do not**
- Repeat the same keyword every paragraph
- Write “keyword: …” sections
- Stuff the title with every synonym

**GEO / AI-search friendly writing (required)**
- Front-load answers
- Question-form headings
- Short direct definitions
- Tables when comparing confirmed vs reported
- Clear “still unconfirmed” section
- FAQ block on explainers

---

## File format (MDX frontmatter)

Deliver as an `.mdx` file with YAML frontmatter:

```yaml
---
title: "Exact title here"
excerpt: "1–2 sentences. Specific. No teaser vagueness."
category: explainers          # or hot-takes, roadies, bigg-boss, indias-got-latent, bollywood
shows: [bigg-boss]           # optional; use when category is hot-takes/explainers but about a show
heat: 3                      # 1–5; higher = hotter/more urgent
author: Riya Malhotra        # use an existing house author unless told otherwise
date: "2026-09-09"           # YYYY-MM-DD in quotes
readTime: "7 min"            # roughly words ÷ 200
slug: how-to-vote-bigg-boss-20-explained
# coverImage: leave blank unless we give a rights-safe image
faq:                         # required for explainers; optional elsewhere
  - q: "Question the reader would Google?"
    a: "Direct 1–3 sentence answer."
---
```

### Field rules

| Field | Rule |
|------|------|
| `slug` | lowercase, hyphens only, matches filename |
| `excerpt` | concrete facts; not “everything you need to know” |
| `heat` | 1 calm → 5 urgent/viral |
| `readTime` | `"X min"` (quote it) |
| `shows` | when main `category` is `hot-takes` or `explainers`, tag the show |
| `faq` | 3–5 Q&As for explainers; answers must match the article |
| `coverImage` | **do not add** unless given a rights-safe asset (site auto-generates covers) |
| `updated` | only when substantially revising an old post |

### Existing authors (prefer these)
Aarav Sen, Kabir Rao, Meera Iyer, Riya Malhotra, Tanya Deshpande, Vikram Shah, Devika Nair, Meher Chadha, Aryan Kapoor

---

## Confirmed vs rumour (non-negotiable)

Always separate:
- **Confirmed** = channel / streaming platform / on-air promo / official app
- **Reported** = outlets citing sources
- **Speculation** = fans / aggregators adding detail

Never present a leaked cast list, unconfirmed twist detail, or guessed audition date as fact.

When unsure, write:
> As of this writing, this has not been confirmed by Colors / MTV / JioHotstar.

---

## Internal linking

Every post should include **2–4 contextual links** to existing Desi Chilli posts, like:

```md
we've broken down [how Extra Jeevan Daan is expected to work](/posts/what-is-extra-jeevan-daan-bigg-boss-20-explained)
```

Link natural phrases, not “click here”.

---

## Images and copyright

**Do not scrape / download / re-upload**
- News site photos
- BookMyShow posters
- Reddit screenshots of posters
- Studio stills without permission

The site generates typographic covers automatically. Writers should focus on text. If an image is needed, only use assets we approve (own graphic / licensed / AI we own).

---

## What “good” looks like by type

### Explainer (gold standard)
- 1,200–1,800 words
- Opening answer bolded
- Process steps, mistakes, scams/caveats, unconfirmed list
- FAQ frontmatter
- Tables if useful (confirmed vs reported)

### Recap
- What happened, in order
- Why it matters for next episode / season
- One opinion line, not a full rant

### Hot take
- One thesis in the title and first paragraph
- Evidence, then implication
- Don’t stretch a 500-word argument into 1,200 words of fluff

---

## Delivery checklist for the writer (send with each draft)

- [ ] Word count in target range for the type
- [ ] Bolded answer in first paragraph
- [ ] All H2s are questions
- [ ] AdSlots placed
- [ ] Frontmatter complete and valid
- [ ] Slug = filename without `.mdx`
- [ ] 2–4 internal links
- [ ] Confirmed vs reported clearly marked
- [ ] No copyrighted images added
- [ ] FAQ included if explainer
- [ ] No invented facts
- [ ] Reads like a human who watched the show / followed the story

---

## Priority topics (what to assign first)

Highest payoff right now:
1. Evergreen explainers (voting, format twists, how X works)
2. Roadies audition / process guides
3. Bigg Boss weekly deep posts during the season
4. Recaps of high-heat episodes
5. Hot takes only when there is a real argument

Avoid: more 300–400 word box-office stubs unless they have a strong angle.
