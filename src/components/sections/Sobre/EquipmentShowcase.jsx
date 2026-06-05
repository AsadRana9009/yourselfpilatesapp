"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ABOUT_EQUIPMENT } from "@/constants/AboutContent";

/**
 * Equipment Showcase Section
 * Grid layout with images on top and text below
 */
const EquipmentShowcase = () => {
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
    <section className="bg-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="font-accent text-3xl font-normal text-[#88a9c3] md:text-4xl lg:text-5xl">
            Conheça os nossos equipamentos
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
        >
          {ABOUT_EQUIPMENT.equipment.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative mx-auto mb-6 aspect-square w-full max-w-[300px] overflow-hidden rounded-lg bg-white sm:max-w-[220px] md:max-w-[256px] lg:max-w-[280px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col items-center space-y-3 text-center">
                <div className="relative mb-4 h-6 w-6 sm:h-8 sm:w-8 md:h-9 md:w-9">
                  <Image
                    src="/images/Ylogo.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>

                <h3 className="font-accent text-xl font-normal text-[#88a9c3] sm:text-2xl md:text-3xl lg:text-4xl">
                  {item.name}
                </h3>

                <p className="mt-4 max-w-[90%] text-sm text-[#5a7a94] sm:max-w-[400px] sm:text-base md:max-w-[450px]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EquipmentShowcase;
