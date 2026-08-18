/**
 * Public API for the hidden TV Show screens.
 *
 * These endpoints are unauthenticated by design — the hidden token in the URL
 * is the only credential — so they use plain fetch rather than the axios
 * instance, which would attach a student's Authorization header.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend.yourselfpilates.pt";

function displayUrl(token, suffix = "") {
  const base = API_BASE_URL.replace(/\/$/, "");
  return `${base}/api/tv/display/${encodeURIComponent(token)}/${suffix}`;
}

/**
 * Full screen payload: config, region, videos, music and the current booking.
 * Returns null when the token does not match a live screen.
 */
export async function fetchScreen(token) {
  const res = await fetch(displayUrl(token), { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Screen request failed (${res.status})`);
  return res.json();
}

/** Lightweight poll used to refresh only the welcome banner. */
export async function fetchNowPlaying(token) {
  const res = await fetch(displayUrl(token, "now/"), { cache: "no-store" });
  if (!res.ok) throw new Error(`Now-playing request failed (${res.status})`);
  return res.json();
}
