"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import "./style.css";

/**
 * Brand Introduction Section
 * Two-column layout with logo and company description
 */
const BrandIntroduction = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="-mt-12 -ml-10 flex justify-center md:mt-0 md:ml-0 md:justify-start lg:justify-start"
          >
            <Image
              src="/images/HeroSectionLogo.png"
              alt="Logo"
              width={192}
              height={192}
              className="brand-logo h-auto w-48"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-[455px] space-y-6 md:mx-0"
          >
            <p className="font-heading text-[17px] font-medium text-[#104c88]">
              Na Yourself Pilates, acreditamos na liberdade de ensinar ao seu
              estilo, com qualidade e estrutura de excelência. Um espaço pensado
              para quem quer oferecer mais, com flexibilidade e total controle
              sobre o seu próprio trabalho.
            </p>

            <Link
              href="/contactos"
              className="hover:text-primary hover:decoration-primary group inline-block text-lg font-normal text-[#88a9c3] underline decoration-2 underline-offset-4 transition-all duration-200"
            >
              Saber mais sobre a YourSelf
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandIntroduction;
