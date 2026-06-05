"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Star, Building2, MapPin } from "lucide-react";
import { PACKAGE_BENEFITS } from "@/constants/PackagesData";
import { Card, CardContent } from "@/components/ui/card";

/**
 * BenefitsGrid Component
 * Displays 4 key benefits of choosing a package
 */
const BenefitsGrid = () => {
  const iconMap = {
    Calendar: Calendar,
    Star: Star,
    Building: Building2,
    MapPin: MapPin,
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#15467d] md:text-5xl">
              Porquê Escolher Este Pack?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Descubra os benefícios de praticar Pilates no YourSelf Pilates
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {PACKAGE_BENEFITS.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon];

              return (
                <motion.div
                  key={benefit.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Card className="group h-full overflow-hidden border-none bg-gradient-to-br from-[#f0f7ff] to-white shadow-lg transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-8">
                      {/* Icon */}
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#398ffc] to-[#2878dc] shadow-lg transition-transform duration-300 group-hover:scale-110">
                        {IconComponent && (
                          <IconComponent className="h-8 w-8 text-white" />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-2xl font-bold text-[#15467d]">
                        {benefit.title}
                      </h3>

                      {/* Description */}
                      <p className="leading-relaxed text-gray-700">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsGrid;
