"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BrandIntroduction from "@/components/sections/Home/BrandIntroduction";
import { Button } from "@/components/ui/button";
import {
  LocationDotIcon,
  ChevronRightIcon,
  PhoneIcon,
} from "@/components/icons/CustomIcons";
import "./style.css";

const HeroSection = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const countryCode = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1]?.toLowerCase() || 'us';

const appStoreUrl = `https://apps.apple.com/${countryCode}/app/yourself-pilates/id6752496161`;

  return (
    <section className="bg-gradient-primary relative overflow-hidden py-16 md:py-20 lg:py-3">
      {/* Container */}
      <div className="container px-4 md:px-6 lg:px-8">
        <div className="hero-grid grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:items-center lg:gap-20">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Location Badge */}
            <motion.div
              variants={itemVariants}
              className="location-badge mb-1 ml-20 flex items-center space-x-3 lg:ml-14"
            >
              <LocationDotIcon className="h-5 w-5" />
              <span className="text-lg font-medium text-[#88a9c3]">
                LOCALIZADO NAS CALDAS DA RAINHA
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="hero-heading font-accent ml-20 flex w-full lg:ml-14"
              variants={itemVariants}
            >
              Cowork de Pilates exclusivo para profissionais em equipamentos
            </motion.h1>
            <br />
            <motion.div
              variants={itemVariants}
              className="hero-button ml-14 flex flex-col  items-center gap-4 lg:items-start"
            >
              <Button
                asChild
                size="lg"
                className="rounded-29px border-2 border-[#88a9c3] bg-white ml-7 text-[#88a9c3] transition-colors duration-300 hover:bg-[#104c88] hover:text-white"
              >
                <Link
                  href="/agendar-espaco"
                  className="flex items-center space-x-2"
                >
                  <span>Agendar o Espaço</span>
                  <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <div className="flex items-center gap-4">
                <a aria-label="Download on App Store"
                  href={appStoreUrl}
                  className="transition-transform duration-300 ease-out hover:scale-105"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    src="logos/app-store-badge.png"
                    alt="App Store Badge"
                    width={135}
                    height={40}
                  ></Image>
                </a>
                <a aria-label="Get it on Google Play"
                  href="https://play.google.com/store/apps/details?id=com.yourselfpilate.app"
                  className="transition-transform duration-300 ease-out hover:scale-105"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    src="logos/google-play-badge.png"
                    alt="Google Play Badge"
                    width={135}
                    height={40}
                  ></Image>
                </a>
              </div>


            </motion.div>

            {/* Divider + Phone */}
            <motion.div
              variants={itemVariants}
              className="call-to-action cta-wrapper mt-90 -ml-8 flex w-full items-center space-x-0"
            >
              {/* Left text + divider */}
              <div className="cta-left flex items-center space-x-2">
                <div className="divider h-1px w-[68px] bg-[#88a9c3]" />
                <span className="font-heading text-lg whitespace-nowrap text-[#15467d]">
                  Ou ligue para o
                </span>
              </div>

              {/* Phone button */}
              <a
                href="tel:927078842"
                className="group cta-phone inline-flex items-center"
              >
                <div className="flex h-12 w-12 items-center justify-center text-[#15467d]">
                  <PhoneIcon className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-normal text-[#15467d]">
                    927 078 842
                  </span>
                  <span className="font-heading mt-1 text-xs text-[#15467d]">
                    (Chamada para a rede móvel nacional)
                  </span>
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-images flex w-full flex-col gap-6 md:flex-row"
          >
            {/* Left Image */}
            <div className="hero-image-left relative h-[500px] w-full md:h-[800px] md:w-1/2">
              <Image
                src="/images/15.jpg"
                alt="Yourself Pilates Studio Interior"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-[170px]"
                priority
              />
            </div>

            {/* Right Image */}
            <div className="hero-image-right relative h-[500px] w-full md:h-[800px] md:w-1/2">
              <Image
                src="/images/16.jpg"
                alt="Hero Image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-l-[100px]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
        <div className="bg-primary/5 absolute top-20 right-20 h-64 w-64 rounded-full blur-3xl" />
        <div className="bg-accent/5 absolute bottom-20 left-20 h-96 w-96 rounded-full blur-3xl" />
      </div>
      <div className="content">
        <BrandIntroduction />
      </div>
    </section>
  );
};

export default HeroSection;
