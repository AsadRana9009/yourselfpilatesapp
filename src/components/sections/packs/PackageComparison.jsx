"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { PACKAGES } from "@/constants/PackagesData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * PackageComparison Component
 * Displays comparison table/cards for all packages
 */
const PackageComparison = ({ currentPackage }) => {
  const packages = Object.values(PACKAGES);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };

  return (
    <section className="bg-gradient-to-b from-white to-[#f8f9fa] py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#15467d] md:text-5xl">
              Compare os Packs
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Escolha o pack que melhor se adequa às suas necessidades e
              objetivos
            </p>
          </div>

          {/* Mobile: Cards Layout */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card
                  className={`overflow-hidden transition-all ${
                    pkg.slug === currentPackage
                      ? "border-2 border-[#398ffc] shadow-xl"
                      : "border border-gray-200 shadow-md"
                  }`}
                >
                  <CardContent className="p-6">
                    {pkg.badge && (
                      <div
                        className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase ${
                          pkg.popular
                            ? "bg-[#398ffc] text-white"
                            : "bg-[#00d084] text-white"
                        }`}
                      >
                        {pkg.badge}
                      </div>
                    )}

                    <h3 className="mb-2 text-2xl font-bold text-[#15467d]">
                      {pkg.name}
                    </h3>
                    <p className="mb-4 text-3xl font-bold text-[#398ffc]">
                      {pkg.pricePerSession}€
                      <span className="text-base font-normal text-gray-600">
                        /sessão
                      </span>
                    </p>

                    <div className="mb-4 space-y-2 border-t border-gray-200 pt-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-semibold">{pkg.totalPrice}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sessões:</span>
                        <span className="font-semibold">
                          {pkg.sessions} {pkg.sessions === 1 ? "hora" : "horas"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Validade:</span>
                        <span className="font-semibold">{pkg.validity}</span>
                      </div>
                      {pkg.savings > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Poupança:</span>
                          <span className="font-semibold text-[#00d084]">
                            {pkg.savings}€
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#00d084]" />
                        <span className="text-sm">Horários flexíveis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-[#00d084]" />
                        <span className="text-sm">Equipamentos premium</span>
                      </div>
                    </div>

                    {pkg.slug === currentPackage ? (
                      <div className="rounded-full bg-[#15467d] px-4 py-3 text-center font-semibold text-white">
                        Pack Atual
                      </div>
                    ) : (
                      <Button
                        asChild
                        className="w-full rounded-full bg-[#398ffc] hover:bg-[#2878dc]"
                      >
                        <Link href={pkg.url}>Ver Pack</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden overflow-hidden rounded-2xl shadow-xl md:block">
            <table className="w-full">
              <thead>
                <tr className="bg-[#15467d]">
                  <th className="p-4 text-left text-white">Característica</th>
                  {packages.map((pkg) => (
                    <th
                      key={pkg.id}
                      className={`p-4 text-center ${
                        pkg.slug === currentPackage
                          ? "bg-[#398ffc]"
                          : "bg-[#15467d]"
                      }`}
                    >
                      <div className="text-lg font-bold text-white">
                        {pkg.name}
                      </div>
                      {pkg.badge && (
                        <div className="mt-1 text-xs font-normal text-white/90">
                          {pkg.badge}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {/* Price per session */}
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-700">
                    Preço/Sessão
                  </td>
                  {packages.map((pkg) => (
                    <td
                      key={pkg.id}
                      className={`p-4 text-center ${
                        pkg.slug === currentPackage ? "bg-blue-50" : ""
                      }`}
                    >
                      <span className="text-2xl font-bold text-[#398ffc]">
                        {pkg.pricePerSession}€
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Total */}
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-700">Total</td>
                  {packages.map((pkg) => (
                    <td
                      key={pkg.id}
                      className={`p-4 text-center ${
                        pkg.slug === currentPackage ? "bg-blue-50" : ""
                      }`}
                    >
                      <span className="font-semibold">{pkg.totalPrice}€</span>
                    </td>
                  ))}
                </tr>

                {/* Savings */}
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-700">Poupança</td>
                  {packages.map((pkg) => (
                    <td
                      key={pkg.id}
                      className={`p-4 text-center ${
                        pkg.slug === currentPackage ? "bg-blue-50" : ""
                      }`}
                    >
                      {pkg.savings > 0 ? (
                        <span className="font-semibold text-[#00d084]">
                          {pkg.savings}€
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Validity */}
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-700">Validade</td>
                  {packages.map((pkg) => (
                    <td
                      key={pkg.id}
                      className={`p-4 text-center ${
                        pkg.slug === currentPackage ? "bg-blue-50" : ""
                      }`}
                    >
                      {pkg.validity}
                    </td>
                  ))}
                </tr>

                {/* Sessions */}
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-700">
                    Nº de Sessões
                  </td>
                  {packages.map((pkg) => (
                    <td
                      key={pkg.id}
                      className={`p-4 text-center ${
                        pkg.slug === currentPackage ? "bg-blue-50" : ""
                      }`}
                    >
                      {pkg.sessions} {pkg.sessions === 1 ? "hora" : "horas"}
                    </td>
                  ))}
                </tr>

                {/* Flexibility */}
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-700">
                    Flexibilidade
                  </td>
                  {packages.map((pkg) => (
                    <td
                      key={pkg.id}
                      className={`p-4 text-center ${
                        pkg.slug === currentPackage ? "bg-blue-50" : ""
                      }`}
                    >
                      <Check className="mx-auto h-6 w-6 text-[#00d084]" />
                    </td>
                  ))}
                </tr>

                {/* Best for */}
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-700">
                    Melhor Para
                  </td>
                  {packages.map((pkg) => (
                    <td
                      key={pkg.id}
                      className={`p-4 text-center ${
                        pkg.slug === currentPackage ? "bg-blue-50" : ""
                      }`}
                    >
                      {pkg.bestFor}
                    </td>
                  ))}
                </tr>

                {/* CTA Row */}
                <tr>
                  <td className="p-4"></td>
                  {packages.map((pkg) => (
                    <td
                      key={pkg.id}
                      className={`p-4 text-center ${
                        pkg.slug === currentPackage ? "bg-blue-50" : ""
                      }`}
                    >
                      {pkg.slug === currentPackage ? (
                        <div className="rounded-full bg-[#15467d] px-4 py-3 font-semibold text-white">
                          Pack Atual
                        </div>
                      ) : (
                        <Button
                          asChild
                          className="w-full rounded-full bg-[#398ffc] hover:bg-[#2878dc]"
                        >
                          <Link href={pkg.url}>Ver Pack</Link>
                        </Button>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageComparison;
