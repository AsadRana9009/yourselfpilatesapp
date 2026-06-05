import React from "react";
import BookingHero from "@/components/sections/booking/BookingHero";
import FeaturesGrid from "@/components/shared/FeaturesGrid";
import PackagesListing from "@/components/shared/PackagesListing";
import CTAInfoText from "@/components/shared/CTAInfoText";
import ContactLocation from "@/components/shared/ContactLocation";
import FinalCTA from "@/components/shared/FinalCTA";

export const metadata = {
  title: "Agendar Espaço - Yourself Pilates",
  description:
    "Agende as suas aulas de acordo com a sua agenda e dos seus alunos, de forma flexível. Escolha um dos packs disponíveis.",
  icons: {
    icon: "/HeaderIcon.png",
  },
};

export default function AgendarEspacoPage() {
  return (
    <div className="min-h-screen pt-30 md:pt-2 lg:pt-0">
      <BookingHero />
      <FeaturesGrid />
      <PackagesListing
        title="Agendar o espaço"
        subtitle="Agende as suas aulas de acordo com a sua agenda e dos seus alunos, de forma flexível.
        Fortaleça a relação com os seus alunos e garanta a fidelização de futuros alunos."
      />
      <CTAInfoText />
      <ContactLocation showTitle={false} />
      <FinalCTA showCTA={false} />
    </div>
  );
}
