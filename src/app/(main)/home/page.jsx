import React from "react";
import HeroSection from "@/components/sections/Home/HeroSection";
// import BrandIntroduction from "@/components/sections/Home/BrandIntroduction";
import SectionDivider from "@/components/shared/SectionDivider";
import FeaturesGrid from "@/components/shared/FeaturesGrid";
import ImageCarousel from "@/components/shared/ImageCarousel";
import PackagesListing from "@/components/shared/PackagesListing";
import BenefitsCards from "@/components/shared/BenefitsCards";
import FinalCTA from "@/components/shared/FinalCTA";
import Availibility from "@/components/sections/Home/Availability";

/**
 * Home Page - YourSelf Pilates
 * Complete landing page with all sections
 */
export const metadata = {
  title: "YourSelf Pilates | Cowork de Pilates nas Caldas da Rainha",
  description:
    "Cowork de Pilates exclusivo para profissionais em equipamentos. Espaço totalmente equipado com aparelhos premium, internet, ar condicionado e mais. Caldas da Rainha.",
  keywords:
    "pilates, cowork, caldas da rainha, estúdio pilates, aluguer espaço pilates, equipamentos pilates",
};

const HomePage = () => {
  return (
    <main className="min-h-screen pt-40 md:pt-40 lg:pt-40">
      <HeroSection />
      <SectionDivider title="O seu studio de Pilates" />
      <FeaturesGrid />
      <ImageCarousel />
      <PackagesListing title="Agendar o espaço" />
      <BenefitsCards />
      <Availibility />
      <FinalCTA showCTA={true} />
    </main>
  );
};

export default HomePage;
