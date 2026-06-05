import React from "react";
import { getPackageBySlug } from "@/constants/PackagesData";
import PackageBookingForm from "@/components/sections/packs/PackageBookingForm";

export const metadata = {
  title: "Pack de 8 horas/aula - Yourself Pilates",
  description:
    "Pack de 8 horas, pode escolher o dia e hora que desejar até um limite de 8 aulas. Preço: 18€/sessão. Melhor preço!",
  keywords: [
    "pack 8 aulas pilates",
    "pack semestral pilates",
    "pilates caldas da rainha",
    "melhor preço pilates",
    "desconto pilates",
  ],
  openGraph: {
    title: "Pack de 8 horas/aula - Yourself Pilates",
    description:
      "Pack de 8 horas com máxima flexibilidade. Preço: 18€/sessão. Poupe 32€!",
    type: "website",
    locale: "pt_PT",
    siteName: "Yourself Pilates",
  },
};

const OitoAulasPage = () => {
  const packageData = getPackageBySlug("oito-aulas");

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

export default OitoAulasPage;
