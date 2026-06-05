import React from "react";
import ContactHero from "@/components/sections/Contactos/ContactHero";
import ContactInfo from "@/components/sections/Contactos/ContactInfo";
import ContactLocation from "@/components/shared/ContactLocation";
import ContactSocial from "@/components/shared/ContactSocial";

/**
 * Contactos Page - Contact Us
 * Full contact page with form, contact info, location map, and social media
 */

export const metadata = {
  title: "Contactos - Yourself Pilates",
  description:
    "Entre em contacto connosco. YourSelf Pilates - Estúdio de Pilates em Caldas da Rainha. Telefone: 927 078 842 | Email: yourselfpilates@gmail.com",
  keywords: [
    "contacto",
    "yourself pilates",
    "caldas da rainha",
    "pilates",
    "formulário de contacto",
    "localização",
  ],
  openGraph: {
    title: "Contactos - Yourself Pilates",
    description:
      "Entre em contacto com o YourSelf Pilates. Estúdio de Pilates em Caldas da Rainha.",
    type: "website",
    locale: "pt_PT",
    siteName: "Yourself Pilates",
  },
};

const Contactos = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Contact Form */}
      <ContactHero />

      {/* Contact Information (Phone & Email) */}
      <ContactInfo />

      {/* Location & Map */}
      <ContactLocation />

      {/* Social Media */}
      <ContactSocial />
    </main>
  );
};

export default Contactos;
