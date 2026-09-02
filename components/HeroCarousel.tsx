"use client";

import {
  Children,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

const AUTOPLAY_MS = 3000;

type HeroCarouselProps = {
  children: ReactNode;
};

export function HeroCarousel({ children }: HeroCarouselProps) {
  const slides = Children.toArray(children);
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const count = slides.length;

  const go = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    function sync() {
      setPrefersReduced(media.matches);
    }
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const enter = () => setHovered(true);
    const leave = () => setHovered(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  useEffect(() => {
    if (count < 2 || hovered || focused || prefersReduced) return;
    const id = window.setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [count, focused, go, hovered, index, prefersReduced]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
  }

  if (count === 0) return null;

  if (count === 1) {
    return (
      <div>
        <span className="eyebrow">Lead story</span>
        {slides[0]}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onKeyDown={onKeyDown}
      onFocus={(event) => {
        if (
          event.target instanceof HTMLElement &&
          event.target.matches(":focus-visible")
        ) {
          setFocused(true);
        }
      }}
      onBlur={(event) => {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          setFocused(false);
        }
      }}
    >
      <div className="hero-carousel-head">
        <span className="eyebrow" id={labelId}>
          Lead story
        </span>
        <div className="hero-carousel-controls">
          <button
            type="button"
            className="hero-carousel-btn"
            aria-label="Previous lead story"
            onClick={() => go(index - 1)}
          >
            ←
          </button>
          <span className="hero-carousel-count" aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="hero-carousel-btn"
            aria-label="Next lead story"
            onClick={() => go(index + 1)}
          >
            →
          </button>
        </div>
      </div>

      <div className="hero-carousel-track">
        {slides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <div
              key={slideIndex}
              className="hero-carousel-slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${count}`}
              aria-hidden={!active}
              {...(!active ? { inert: "" } : {})}
            >
              {slide}
            </div>
          );
        })}
      </div>

      <div className="hero-carousel-dots">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            type="button"
            aria-label={`Show lead story ${slideIndex + 1}`}
            aria-current={slideIndex === index ? "true" : undefined}
            className={
              slideIndex === index ? "hero-carousel-dot is-active" : "hero-carousel-dot"
            }
            onClick={() => setIndex(slideIndex)}
          />
        ))}
      </div>
    </div>
  );
}
