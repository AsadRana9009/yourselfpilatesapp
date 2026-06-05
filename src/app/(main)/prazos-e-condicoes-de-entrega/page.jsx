import React from "react";
import { DELIVERY_TERMS } from "@/constants/DeliveryTerms";

export const metadata = {
  title: "Prazos e Condições de Entrega - Yourself Pilates",
  description:
    "Regras de prestação de serviços, prazos de entrega e contactos de apoio da Yourself Pilates.",
  openGraph: {
    title: "Prazos e Condições de Entrega - Yourself Pilates",
    description:
      "Saiba como funcionam os prazos de prestação de serviços, reagendamentos e entrega de produtos na Yourself Pilates.",
    type: "article",
    locale: "pt_PT",
    siteName: "Yourself Pilates",
    url: "https://www.yourselfpilates.pt/prazos-e-condicoes-de-entrega",
  },
  alternates: {
    canonical: "https://www.yourselfpilates.pt/prazos-e-condicoes-de-entrega",
  },
};

const DeliveryTermsPage = () => {
  const renderContent = (content) => {
    switch (content.type) {
      case "heading":
        return (
          <h3 className="font-heading mt-6 mb-3 text-[18px] font-normal text-[#15467d]">
            {content.text}
          </h3>
        );
      case "paragraph":
        return (
          <p className="font-heading mb-3 text-[18px] leading-[1.9] text-[#15467d]">
            {content.text}
          </p>
        );
      case "list":
        return (
          <ul className="font-heading mb-4 ml-6 space-y-1 text-[18px] leading-[1.9] text-[#15467d]">
            {content.items.map((item, idx) => (
              <li
                key={idx}
                className="leading-[1.9]"
                style={{
                  listStyleType: "none",
                  textIndent: "-1em",
                  paddingLeft: "1em",
                }}
              >
                – {item}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-white pt-16 pb-20 md:pt-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <h1 className="font-accent mb-6 text-4xl font-light text-[#88a9c3] md:text-5xl">
          {DELIVERY_TERMS.title}
        </h1>

        <article>
          {DELIVERY_TERMS.sections.map((section) => (
            <section key={section.id} className="mb-8">
              {section.content.map((content, idx) => (
                <div key={idx}>{renderContent(content)}</div>
              ))}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
};

export default DeliveryTermsPage;
