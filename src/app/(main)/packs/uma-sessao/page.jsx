import React from "react";
import { getPackageBySlug } from "@/constants/PackagesData";
import PackageBookingForm from "@/components/sections/packs/PackageBookingForm";

export const metadata = {
  title: "1 sessão hora/aula - Yourself Pilates",
  description:
    "Pack de 1 hora, para maior flexibilidade de horários. Preço: 22€/sessão. Experimente o nosso espaço sem compromisso.",
  keywords: [
    "uma sessão pilates",
    "aula avulsa pilates",
    "pilates caldas da rainha",
    "flexibilidade de horários",
    "experimentar pilates",
  ],
  openGraph: {
    title: "1 sessão hora/aula - Yourself Pilates",
    description:
      "Pack de 1 hora, para maior flexibilidade de horários. Preço: 22€/sessão",
    type: "website",
    locale: "pt_PT",
    siteName: "Yourself Pilates",
  },
};

const UmaSessaoPage = () => {
  const packageData = getPackageBySlug("uma-sessao");

  if (!packageData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Package not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <PackageBookingForm packageData={packageData} />
    </main>
  );
};

export default UmaSessaoPage;
