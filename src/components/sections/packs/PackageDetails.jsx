"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * PackageDetails Component
 * Displays pricing, features, and CTA buttons
 */
const PackageDetails = ({ data }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column: Pricing & Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col"
          >
            {/* Price Display */}
            <div className="mb-8 rounded-2xl bg-gradient-to-br from-[#f0f7ff] to-white p-8 shadow-lg">
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-6xl font-bold text-[#398ffc]">
                  {data.pricePerSession}€
                </span>
                <span className="text-2xl text-gray-600">/sessão</span>
              </div>

              {data.sessions > 1 && (
                <div className="mb-4 border-t border-gray-200 pt-4">
                  <p className="text-lg text-gray-600">
                    Total:{" "}
                    <span className="font-semibold">{data.totalPrice}€</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {data.sessions} sessões de 1 hora cada
                  </p>
                </div>
              )}

              {/* Savings Badge */}
              {data.savings > 0 && (
                <div className="mt-4 inline-block rounded-full bg-[#00d084] px-4 py-2 text-sm font-bold text-white">
                  Poupe {data.savings}€ ({data.savingsPercentage}%)
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#398ffc]/10">
                  <Calendar className="h-5 w-5 text-[#398ffc]" />
                </div>
                <div>
                  <p className="font-semibold text-[#15467d]">Validade</p>
                  <p className="text-sm text-gray-600">{data.validity}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#398ffc]/10">
                  <Clock className="h-5 w-5 text-[#398ffc]" />
                </div>
                <div>
                  <p className="font-semibold text-[#15467d]">Duração</p>
                  <p className="text-sm text-gray-600">
                    {data.sessions} {data.sessions === 1 ? "hora" : "horas"} de
                    Pilates
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features List */}
            <div className="space-y-3">
              <h3 className="mb-4 text-xl font-bold text-[#15467d]">
                Características
              </h3>
              {data.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#00d084]" />
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Description & CTAs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col"
          >
            {/* Description */}
            <div className="mb-8">
              <h2 className="mb-4 text-3xl font-bold text-[#15467d]">
                Sobre Este Pack
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                {data.fullDescription}
              </p>
              <p className="text-base text-gray-600">
                <span className="font-semibold">Ideal para:</span>{" "}
                {data.bestFor}
              </p>
            </div>

            {/* What's Included Section */}
            <div className="mb-8 rounded-2xl bg-[#f8f9fa] p-6">
              <h3 className="mb-4 text-xl font-bold text-[#15467d]">
                O que está incluído?
              </h3>
              <ul className="space-y-2">
                {data.whatsIncluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#398ffc]" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="mt-auto flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="flex-1 rounded-full bg-[#398ffc] px-8 py-6 text-lg font-semibold text-white transition-all hover:bg-[#2878dc] hover:shadow-lg"
              >
                <Link href="/contactos">{data.ctaText}</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex-1 rounded-full border-2 border-[#15467d] px-8 py-6 text-lg font-semibold text-[#15467d] transition-all hover:bg-[#15467d] hover:text-white"
              >
                <Link href="/contactos">Contactar</Link>
              </Button>
            </div>

            {/* Trust Signal */}
            <p className="mt-6 text-center text-sm text-gray-500">
              📞 Dúvidas? Contacte-nos: 927 078 842
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PackageDetails;
