"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ABOUT_INTRO } from "@/constants/AboutContent";

/**
 * About Introduction Section
 * Brand story with logo and descriptive text
 */
const AboutIntro = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="bg-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left Column - Logo/Brand Mark */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center lg:justify-start"
          >
            <div className="relative h-[300px] w-full max-w-[400px] md:h-[400px]">
              <Image
                src="/images/Logo.png"
                alt={ABOUT_INTRO.logoAlt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Decorative background circle */}
              <div className="absolute top-1/2 left-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#398ffc]/5 to-[#15467d]/5" />
            </div>
          </motion.div>

          {/* Right Column - Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl leading-tight font-semibold text-[#15467d] md:text-4xl lg:text-5xl">
              {ABOUT_INTRO.heading}
            </h2>
            <p className="text-base leading-relaxed text-[#3b3d42] md:text-lg">
              {ABOUT_INTRO.description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutIntro;
