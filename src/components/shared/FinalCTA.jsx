"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FinalCTA = ({ showCTA = true }) => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          className="h-56 bg-cover bg-center sm:h-64 md:h-[500px]"
          style={{ backgroundImage: 'url("/images/12.jpg")' }}
        ></div>
        <div
          className="h-56 bg-cover bg-center sm:h-64 md:h-[500px]"
          style={{ backgroundImage: 'url("/images/5.jpg")' }}
        ></div>
      </div>

      {showCTA && (
        <div className="relative z-10 bg-[#15467d] py-14 text-white sm:py-20 md:py-32">
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
              {/* LEFT TEXT */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-xl space-y-2 text-center md:text-left"
              >
                <h2 className="font-accent text-2xl leading-snug font-medium text-white sm:text-3xl md:text-4xl lg:text-5xl">
                  Gostava de entrar em contacto
                </h2>

                <p className="font-accent text-lg leading-snug text-white sm:text-xl md:text-[20px] lg:text-[25px]">
                  Ou agendar uma visita
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex w-full justify-center md:w-auto"
              >
                <Link href="/contactos">
                  <Button
                    size="lg"
                    className="h-12 w-40 rounded-full bg-gradient-to-l from-[#94b0c9] via-white to-white px-8 py-4 text-base font-semibold text-[#15467d] shadow-md transition-all duration-300 ease-in-out hover:border hover:border-white hover:text-black hover:opacity-80 hover:shadow-lg sm:w-48 sm:px-10 sm:text-lg"
                  >
                    Contact
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FinalCTA;
