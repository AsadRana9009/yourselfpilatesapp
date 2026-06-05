import React from "react";
import { TERMS_AND_CONDITIONS } from "@/constants/TermsAndConditions";

export const metadata = {
  title: "Termos e Condições - Yourself Pilates",
  description:
    "CONDIÇÕES GERAIS DE VENDA — Este website pertence e é operado por YOURSELF PILATES, titular de BIGPIRES IMPORTS LDA.",
  openGraph: {
    title: "Termos e Condições - Yourself Pilates",
    description:
      "Conheça os termos de utilização, reservas, pagamentos e políticas de cancelamento da Yourself Pilates.",
    type: "article",
    locale: "pt_PT",
    siteName: "Yourself Pilates",
    url: "https://www.yourselfpilates.pt/termos-e-condicoes",
  },
  alternates: {
    canonical: "https://www.yourselfpilates.pt/termos-e-condicoes",
  },
};

const TermsAndConditionsPage = () => {
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
          {TERMS_AND_CONDITIONS.title}
        </h1>

        <article>
          {TERMS_AND_CONDITIONS.sections.map((section) => (
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

export default TermsAndConditionsPage;
