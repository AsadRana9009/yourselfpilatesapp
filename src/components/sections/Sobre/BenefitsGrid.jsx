"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  WalletIcon,
  TargetIcon,
  BriefcaseIcon,
  UsersIcon,
  ClockIcon,
  ChartIcon,
} from "@/components/icons/CustomIcons";
import { ABOUT_BENEFITS } from "@/constants/AboutContent";

/**
 * Benefits Grid Section
 * 6 benefits in a 2x3 grid explaining "Why YourSelf?"
 */
const BenefitsGrid = () => {
  // Icon mapping
  const iconMap = {
    wallet: WalletIcon,
    focus: TargetIcon,
    professional: BriefcaseIcon,
    network: UsersIcon,
    schedule: ClockIcon,
    finances: ChartIcon,
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="text-3xl font-semibold text-[#3b3d42] md:text-4xl lg:text-5xl">
            {ABOUT_BENEFITS.sectionTitle}{" "}
            <span className="text-[#15467d]">
              {ABOUT_BENEFITS.sectionHighlight}
            </span>
            ?
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {ABOUT_BENEFITS.benefits.map((benefit) => {
            const IconComponent = iconMap[benefit.icon];
            return (
              <motion.div
                key={benefit.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="rounded-[26px] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-8"
              >
                {/* Icon */}
                <div className="mb-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#398ffc]/10">
                    <IconComponent className="h-8 w-8 text-[#398ffc]" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-3">
                  <h3 className="text-xl leading-snug font-semibold text-[#15467d] md:text-2xl">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#3b3d42] md:text-base">
                    {benefit.description}
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

export default BenefitsGrid;
