import React from "react";
import AboutHero from "@/components/sections/Sobre/AboutHero";
import FeaturesGrid from "@/components/shared/FeaturesGrid";
import SectionDivider from "@/components/shared/SectionDivider";
import ImageCarousel from "@/components/shared/ImageCarousel";
import EquipmentShowcase from "@/components/sections/Sobre/EquipmentShowcase";
import BenefitsCards from "@/components/shared/BenefitsCards";
import ContactLocation from "@/components/shared/ContactLocation";
import ContactSocial from "@/components/shared/ContactSocial";
import FinalCTA from "@/components/shared/FinalCTA";
import CTAInfoText from "@/components/shared/CTAInfoText";
import { ABOUT_SEO } from "@/constants/AboutContent";

export const metadata = {
  title: ABOUT_SEO.title,
  description: ABOUT_SEO.description,
  keywords: ABOUT_SEO.keywords,
};

/**
 * About Page (Sobre)
 * Complete page showcasing YourSelf Pilates story, features, equipment, and benefits
 */
const SobrePage = () => {
  return (
    <main className="min-h-screen pt-20 md:pt-15 lg:pt-0">
      <AboutHero />
      <SectionDivider title="Disponibilizamos" />
      <FeaturesGrid />
      <ImageCarousel />
      <EquipmentShowcase />
      <BenefitsCards />
      <ContactLocation />
      <FinalCTA showCTA={false} />
      <CTAInfoText />
      <ContactSocial />
    </main>
  );
};

export default SobrePage;
