"use client";

import React from "react";
import Link from "next/link";
import { PRIVACY_POLICY } from "@/constants/PrivacyPolicy";

const PoliticaDePrivacidade = () => {
  const renderContent = (content) => {
    switch (content.type) {
      case "heading":
        return (
          <h3 className="font-heading mt-6 mb-3 text-[18px] font-normal text-[#15467d]">
            {content.text}
          </h3>
        );

      case "subheading":
        return (
          <h4 className="mt-4 mb-2 text-[16px] font-semibold text-[#15467d]">
            {content.text}
          </h4>
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
          POLÍTICA DE PRIVACIDADE
        </h1>

        <article>
          {PRIVACY_POLICY.sections.map((section) => (
            <section key={section.id} className="mb-10">
              <div>
                {section.content.map((content, idx) => (
                  <div key={idx}>{renderContent(content)}</div>
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
};

export default PoliticaDePrivacidade;
