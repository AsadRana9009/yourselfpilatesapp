"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrophyIcon,
  WifiIcon,
  BuildingIcon,
  AmenitiesIcon,
  YLogoIcon,
} from "@/components/icons/CustomIcons";
import { ABOUT_FEATURES } from "@/constants/AboutContent";

/**
 * About Features Section
 * 4 icon boxes showing what the space offers
 */
const AboutFeatures = () => {
  // Icon mapping
  const iconMap = {
    trophy: TrophyIcon,
    wifi: WifiIcon,
    building: BuildingIcon,
    amenities: AmenitiesIcon,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="bg-[#f8f9fa] py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header with Y Logo Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-6 text-center md:mb-16"
        >
          {/* Y Logo Icon */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#88a9c3]/10 md:h-20 md:w-20">
              <YLogoIcon className="h-10 w-10 text-[#88a9c3] opacity-60 md:h-12 md:w-12" />
            </div>
          </div>

          {/* Section Title */}
          <h2 className="text-3xl font-semibold text-[#15467d] md:text-4xl lg:text-5xl">
            {ABOUT_FEATURES.sectionTitle}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4"
        >
          {ABOUT_FEATURES.features.map((feature) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="rounded-[26px] bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-xl md:p-8"
              >
                {/* Icon with circular background */}
                <div className="mb-6 flex justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#88a9c3]/10 md:h-28 md:w-28">
                    <IconComponent className="h-12 w-12 text-[#15467d] md:h-14 md:w-14" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-lg leading-snug font-semibold text-[#15467d] md:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#3b3d42] md:text-base">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutFeatures;
