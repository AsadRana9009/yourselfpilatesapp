"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PACKAGE_FAQ } from "@/constants/PackagesData";

/**
 * PackageFAQ Component
 * Accordion-style FAQ section
 */
const PackageFAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleQuestion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#15467d] md:text-5xl">
              Perguntas Frequentes
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Tire todas as suas dúvidas sobre os nossos packs
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {PACKAGE_FAQ.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                  aria-expanded={openId === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="pr-4 text-lg font-semibold text-[#15467d]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-6 w-6 shrink-0 text-[#398ffc] transition-transform duration-300 ${
                      openId === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-200 bg-[#f8f9fa] p-6">
                        <p className="leading-relaxed text-gray-700">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="mb-4 text-lg text-gray-600">
              Não encontrou a resposta que procurava?
            </p>
            <a
              href="/contactos"
              className="inline-flex items-center gap-2 rounded-full bg-[#398ffc] px-8 py-4 font-semibold text-white transition-all hover:bg-[#2878dc] hover:shadow-lg"
            >
              Entre em Contacto
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PackageFAQ;
