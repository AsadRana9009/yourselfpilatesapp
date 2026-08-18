import { notFound } from "next/navigation";

import TVScreen from "@/components/tv/TVScreen";
import { fetchScreen } from "@/lib/tvApi";

/**
 * Hidden TV Show page, e.g. /zqq4ztn7na2cl9mzqy0eukohhle7
 *
 * One unguessable token per gym location. Static routes (/home, /sobre, …)
 * always win over this dynamic segment, so unknown paths simply 404 here.
 */

export const dynamic = "force-dynamic";

export const metadata = {
  title: "YourSelf Pilates",
  robots: { index: false, follow: false },
};

export default async function TVScreenPage({ params }) {
  const { screenToken } = await params;

  let data = null;
  try {
    data = await fetchScreen(screenToken);
  } catch {
    // Backend unreachable at render time — the client retries on its own.
    data = null;
  }

  if (!data) notFound();

  return <TVScreen token={screenToken} initialData={data} />;
}
