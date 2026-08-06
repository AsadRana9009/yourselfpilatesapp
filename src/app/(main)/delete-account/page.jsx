import React from "react";
import DeleteAccountPage from "@/components/sections/DeleteAccount/DeleteAccountPage";

export const metadata = {
  title: "Delete Account - Yourself Pilates",
  description:
    "Request permanent deletion of your Yourself Pilates account and associated profile data.",
  openGraph: {
    title: "Delete Account - Yourself Pilates",
    description:
      "Request permanent deletion of your Yourself Pilates account and associated profile data.",
    type: "website",
    locale: "pt_PT",
    siteName: "Yourself Pilates",
    url: "https://www.yourselfpilates.pt/delete-account",
  },
  alternates: {
    canonical: "https://www.yourselfpilates.pt/delete-account",
  },
};

const DeleteAccountRoute = () => {
  return <DeleteAccountPage />;
};

export default DeleteAccountRoute;
