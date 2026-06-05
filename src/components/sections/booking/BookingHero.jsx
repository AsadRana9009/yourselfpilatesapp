"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const LocationPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-8 w-8"
    fill="#15467d"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
  </svg>
);

const SquareClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-8 w-8"
  >
    <mask id="hands-mask">
      <rect width="24" height="24" fill="white" />
      <line x1="12" y1="12" x2="12" y2="7" stroke="black" strokeWidth="2" />
      <line x1="12" y1="12" x2="15" y2="14" stroke="black" strokeWidth="2" />
    </mask>
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      fill="#15467d"
      mask="url(#hands-mask)"
    />
  </svg>
);

const BookingHero = () => {
  return (
    <section className="relative w-full pb-10 md:pb-20">
      {/* HERO IMAGE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[450px] md:h-[700px] lg:h-[900px]"
      >
        <Image
          src="/images/yourself-pilates-booking-page.jpg"
          alt="Agendar Espaço - Yourself Pilates Studio"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={90}
        />
      </motion.div>

      {/* CARDS SECTION (STACKED ON MOBILE, GRID ON DESKTOP) */}
      <div className="mx-auto -mt-14 flex max-w-5xl flex-col gap-6 px-4 md:-mt-24 md:grid md:grid-cols-2 md:gap-8">
        {/* LOCATION CARD */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card
            className="relative h-full overflow-hidden border-none bg-cover bg-center shadow-lg"
            style={{ backgroundImage: "url('/images/5.jpg')" }}
          >
            <div className="absolute inset-0 bg-[#90adc4]/90" />

            <CardContent className="relative flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center">
                <LocationPinIcon />
              </div>

              <div>
                <p className="font-heading text-lg text-white md:text-xl lg:text-2xl">
                  Localizado
                </p>
                <p className="font-heading text-base text-white md:text-lg lg:text-2xl">
                  no centro das
                </p>
                <p className="font-heading text-base text-white md:text-lg lg:text-2xl">
                  Caldas da Rainha
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* HOURS CARD */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Card
            className="relative h-full overflow-hidden border-none bg-cover bg-center shadow-lg"
            style={{ backgroundImage: "url('/images/On/5.png')" }}
          >
            <div className="absolute inset-0 bg-[#90adc4]/90" />

            <CardContent className="relative flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center">
                <SquareClockIcon />
              </div>

              <div>
                <p className="font-heading text-lg text-white md:text-xl lg:text-2xl">
                  Disponível de
                </p>
                <p className="font-heading text-lg text-white md:text-xl lg:text-2xl">
                  Segunda a Sábado
                </p>
                <p className="font-heading text-lg text-white md:text-xl lg:text-2xl">
                  das 8h às 20h
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingHero;
