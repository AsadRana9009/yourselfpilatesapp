"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to handle header visibility on scroll
 * Shows header only when at the top of the page (scrollY === 0)
 * Hides header when scrolled down, doesn't show when scrolling up
 * @returns {boolean} - Whether the header should be visible
 */
export function useScrollHeader() {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Only show header when at the top of the page
      if (currentY === 0) {
        setShowHeader(true);
      } else {
        // Hide header when scrolled down (any amount)
        setShowHeader(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return showHeader;
}
