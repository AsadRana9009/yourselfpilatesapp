import { redirect } from "next/navigation";

/**
 * Root Page - Redirects to /home
 * The main landing page is at /home
 */
export default function RootPage() {
  redirect("/home");
}
