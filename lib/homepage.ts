import { getCategoryOrThrow } from "@/lib/categories";
import { getAllPostSummaries } from "@/lib/posts";
import type { PostSummary } from "@/lib/types";

const HERO_COUNT = 3;
const RECAP_COUNT = 3;
const HOT_TAKE_COUNT = 3;
const TRENDING_COUNT = 4;
const IST = "Asia/Kolkata";

export type HomepageSlots = {
  heroes: PostSummary[];
  recaps: PostSummary[];
  hotTakes: PostSummary[];
  trending: PostSummary[];
};

function calendarDate(iso: string): string {
  return iso.slice(0, 10);
}

function todayInKolkata(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: IST }).format(new Date());
}

function addDays(iso: string, days: number): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function inRange(iso: string, start: string, end: string): boolean {
  const day = calendarDate(iso);
  return day >= start && day <= end;
}

function byDateThenHeat(a: PostSummary, b: PostSummary): number {
  const dateDiff = +new Date(b.date) - +new Date(a.date);
  if (dateDiff !== 0) return dateDiff;
  return b.heat - a.heat;
}

function byHeatThenDate(a: PostSummary, b: PostSummary): number {
  if (b.heat !== a.heat) return b.heat - a.heat;
  return +new Date(b.date) - +new Date(a.date);
}

function pickHeroes(posts: PostSummary[]): PostSummary[] {
  const today = todayInKolkata();
  const fromToday = posts
    .filter((post) => calendarDate(post.date) === today)
    .slice(0, HERO_COUNT);

  const chosen = new Set(fromToday.map((post) => post.slug));
  const fillers = posts
    .filter((post) => !chosen.has(post.slug))
    .sort(byHeatThenDate);

  return [...fromToday, ...fillers].slice(0, Math.min(HERO_COUNT, posts.length));
}

function pickLatestRecaps(posts: PostSummary[], exclude: Set<string>): PostSummary[] {
  return posts
    .filter((post) => post.category !== "hot-takes" && !exclude.has(post.slug))
    .sort(byDateThenHeat)
    .slice(0, RECAP_COUNT);
}

function pickHotTakes(posts: PostSummary[], exclude: Set<string>): PostSummary[] {
  return posts
    .filter((post) => post.category === "hot-takes" && !exclude.has(post.slug))
    .sort(byDateThenHeat)
    .slice(0, HOT_TAKE_COUNT);
}

function pickTrending(posts: PostSummary[], exclude: Set<string>): PostSummary[] {
  const today = todayInKolkata();
  const thisWeekStart = addDays(today, -6);
  const prevWeekStart = addDays(today, -13);
  const prevWeekEnd = addDays(today, -7);

  const available = posts.filter((post) => !exclude.has(post.slug));
  const thisWeek = available
    .filter((post) => inRange(post.date, thisWeekStart, today))
    .sort(byHeatThenDate);
  const previousWeek = available
    .filter((post) => inRange(post.date, prevWeekStart, prevWeekEnd))
    .sort(byHeatThenDate);
  const older = available
    .filter((post) => calendarDate(post.date) < prevWeekStart)
    .sort(byHeatThenDate);

  const picked: PostSummary[] = [];
  const seen = new Set<string>();

  for (const pool of [thisWeek, previousWeek, older]) {
    for (const post of pool) {
      if (picked.length >= TRENDING_COUNT) return picked;
      if (seen.has(post.slug)) continue;
      seen.add(post.slug);
      picked.push(post);
    }
  }

  return picked;
}

export function getHomepageSlots(): HomepageSlots {
  const posts = getAllPostSummaries();
  if (posts.length === 0) {
    throw new Error("No posts found in content/posts.");
  }

  const heroes = pickHeroes(posts);
  const heroSlugs = new Set(heroes.map((post) => post.slug));
  const recaps = pickLatestRecaps(posts, heroSlugs);
  const hotTakes = pickHotTakes(posts, heroSlugs);
  const used = new Set(
    [...heroes, ...recaps, ...hotTakes].map((post) => post.slug),
  );

  return {
    heroes,
    recaps,
    hotTakes,
    trending: pickTrending(posts, used),
  };
}

export function trendingMeta(post: PostSummary): string {
  const category = getCategoryOrThrow(post.category);
  return `${category.tagLabel} · ${post.readTime}`;
}
