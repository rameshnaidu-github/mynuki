import { useEffect } from "react";

/**
 * Reveals anything marked `data-reveal` as it scrolls into view, once.
 * Runs on every route change so newly mounted pages are picked up, and
 * degrades to "just show everything" where IntersectionObserver is missing
 * or the reader has asked for reduced motion.
 */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!nodes.length) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    nodes.forEach((n) => (n.classList.contains("is-in") ? null : io.observe(n)));
    return () => io.disconnect();
  }, [dep]);
}
