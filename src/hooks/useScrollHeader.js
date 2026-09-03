"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to track whether the page has been scrolled away from the top.
 * Used by the sticky header to switch from a transparent to a solid background.
 * @param {number} threshold - Scroll offset (px) after which the page counts as scrolled
 * @returns {boolean} - Whether the page is scrolled past the threshold
 */
export function useScrollHeader(threshold = 8) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
