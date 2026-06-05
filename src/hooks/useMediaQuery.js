"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to track media query matches
 * @param {string} query - CSS media query string (e.g., "(max-width: 768px)")
 * @returns {boolean} - Whether the media query matches
 */
export function useMediaQuery(query) {
  // Initialize with false to avoid hydration mismatch
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Early return check for window
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    // Handler function to update state
    const handler = (event) => {
      setMatches(event.matches);
    };

    // Set initial value
    handler(mediaQuery);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}
