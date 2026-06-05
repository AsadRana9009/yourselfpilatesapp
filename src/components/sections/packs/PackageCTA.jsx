"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";

/**
 * PackageCTA Component
 * Final call-to-action section at the bottom of package pages
 */
const PackageCTA = ({ packageName }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#15467d] via-[#1a5a8f] to-[#398ffc] py-20 md:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-4xl font-bold text-white md:text-6xl"
          >
            Pronto para Começar?
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-12 text-xl text-white/90 md:text-2xl"
          >
            Reserve o seu{" "}
            <span className="font-bold">{packageName || "pack"}</span> agora e
            aproveite o melhor espaço de Pilates em Caldas da Rainha
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-white px-8 py-6 text-lg font-semibold text-[#15467d] transition-all hover:bg-gray-100 hover:shadow-2xl"
            >
              <Link href="/contactos">
                Agendar Agora
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-white bg-transparent px-8 py-6 text-lg font-semibold text-white transition-all hover:bg-white hover:text-[#15467d]"
            >
              <Link href="/sobre">Saber Mais</Link>
            </Button>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col items-center justify-center gap-6 border-t border-white/20 pt-12 sm:flex-row sm:gap-12"
          >
            {/* Phone */}
            <a
              href="tel:927078842"
              className="group flex items-center gap-3 transition-transform hover:scale-105"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors group-hover:bg-white/20">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm text-white/80">Ligar Agora</p>
                <p className="text-lg font-semibold text-white">927 078 842</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/351927078842"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 transition-transform hover:scale-105"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors group-hover:bg-white/20">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm text-white/80">WhatsApp</p>
                <p className="text-lg font-semibold text-white">
                  Enviar Mensagem
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:yourselfpilates@gmail.com"
              className="group flex items-center gap-3 transition-transform hover:scale-105"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors group-hover:bg-white/20">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm text-white/80">Email</p>
                <p className="text-lg font-semibold text-white">Enviar Email</p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PackageCTA;
