"use client";

import React from "react";
import { motion } from "framer-motion";
import { HOW_IT_WORKS } from "@/constants/PackagesData";

/**
 * HowItWorks Component
 * Displays 3-step process for using the package
 */
const HowItWorks = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  return (
    <section className="bg-gradient-to-b from-[#f8f9fa] to-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#15467d] md:text-5xl">
              Como Funciona?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Simples, rápido e flexível - comece a praticar Pilates em 3 passos
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="absolute top-20 left-1/2 hidden h-1 w-full -translate-x-1/2 md:block">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-[#398ffc] via-[#398ffc] to-[#398ffc] opacity-20" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
              {HOW_IT_WORKS.map((step, index) => (
                <motion.div
                  key={step.step}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step Number Circle */}
                  <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#398ffc] to-[#2878dc] shadow-xl transition-transform duration-300 hover:scale-110">
                    <span className="text-4xl font-bold text-white">
                      {step.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-2xl font-bold text-[#15467d]">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-relaxed text-gray-700">
                    {step.description}
                  </p>

                  {/* Arrow - Mobile Only */}
                  {index < HOW_IT_WORKS.length - 1 && (
                    <div className="mt-6 md:hidden">
                      <svg
                        className="h-8 w-8 text-[#398ffc]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
