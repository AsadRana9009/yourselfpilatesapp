"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * PackageHero Component
 * Hero section for package pages with image and optional badge
 */
const PackageHero = ({ data }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Badge - Top Right */}
          {data.badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 right-4 z-10 md:top-8 md:right-8"
            >
              <div
                className={`rounded-full px-4 py-2 text-sm font-bold tracking-wider uppercase shadow-lg md:px-6 md:py-3 md:text-base ${
                  data.popular
                    ? "bg-[#398ffc] text-white"
                    : "bg-[#00d084] text-white"
                }`}
              >
                {data.badge}
              </div>
            </motion.div>
          )}

          {/* Hero Image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-xl md:rounded-3xl">
            <Image
              src={data.image}
              alt={data.imageAlt}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Package Title - Overlapping the image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative -mt-12 px-4 md:-mt-16 md:px-8"
          >
            <div className="rounded-2xl bg-white p-6 shadow-2xl md:p-8">
              <h1 className="font-display text-3xl font-bold text-[#15467d] md:text-5xl">
                {data.title}
              </h1>
              <p className="mt-3 text-lg text-gray-600 md:text-xl">
                {data.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PackageHero;
