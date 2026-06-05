import React from "react";
import { getPackageBySlug } from "@/constants/PackagesData";
import PackageBookingForm from "@/components/sections/packs/PackageBookingForm";

export const metadata = {
  title: "Pack de 4 horas/aula - Yourself Pilates",
  description:
    "Pack de 4 horas, pode escolher o dia e hora que desejar até um limite de 4 aulas. Preço: 20€/sessão. O pack mais popular!",
  keywords: [
    "pack 4 aulas pilates",
    "pack mensal pilates",
    "pilates caldas da rainha",
    "desconto pilates",
    "pack popular pilates",
  ],
  openGraph: {
    title: "Pack de 4 horas/aula - Yourself Pilates",
    description:
      "Pack de 4 horas com total flexibilidade. Preço: 20€/sessão. Poupe 8€!",
    type: "website",
    locale: "pt_PT",
    siteName: "Yourself Pilates",
  },
};

const QuatroAulasPage = () => {
  const packageData = getPackageBySlug("quatro-aulas");

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

export default QuatroAulasPage;
