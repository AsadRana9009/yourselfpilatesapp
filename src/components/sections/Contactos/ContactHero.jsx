"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTACT_FORM_CONFIG } from "@/constants/ContactInfo";

const ContactHero = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
    consentimento: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: "success",
          text: CONTACT_FORM_CONFIG.messages.success,
        });
        setFormData({
          nome: "",
          email: "",
          mensagem: "",
          consentimento: false,
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || CONTACT_FORM_CONFIG.messages.error,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: CONTACT_FORM_CONFIG.messages.error,
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#e8f1fa] via-[#f0f5fb] to-[#ffffff] py-12 md:py-16 lg:py-24">
      <div className="container">
        <div className="mt-[200px] grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 xl:gap-160">
          <motion.div className="contact-hero-image relative h-[500px] w-full">
            <Image
              src="/images/Contact.png"
              alt="Contact - YourSelf Pilates"
              fill
              className="rounded-lg object-cover"
              priority
            />
          </motion.div>

          {/* Right Column / Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="contact-hero-form order-2 mt-[50px] flex w-full flex-col justify-start"
          >
            {/* Heading */}
            <motion.div variants={itemVariants} className="mb-6 lg:mb-8">
              <p className="mb-2 text-lg font-normal text-[#88a9c3] md:text-xl">
                Agende uma visita ou entre em
              </p>
              <h1 className="font-accent text-4xl leading-snug text-[#15467d] sm:text-5xl md:text-6xl lg:text-7xl">
                Contacto
              </h1>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <Input
                  type="text"
                  name="nome"
                  id="nome"
                  placeholder={CONTACT_FORM_CONFIG.fields.nome.placeholder}
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-none border-0 border-b-2 border-[#c8d4e0] px-0 pt-2 pb-3 text-base text-[#3b3d42] placeholder:text-[#8b9daf] focus:border-transparent focus:ring-0"
                />

                {/* Email */}
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={CONTACT_FORM_CONFIG.fields.email.placeholder}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-none border-0 border-b-2 border-[#c8d4e0] px-0 pt-2 pb-3 text-base text-[#3b3d42] placeholder:text-[#8b9daf] focus:border-transparent focus:ring-0"
                />

                {/* Mensagem */}
                <textarea
                  name="mensagem"
                  id="mensagem"
                  placeholder={CONTACT_FORM_CONFIG.fields.mensagem.placeholder}
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none rounded-none border-0 border-b-2 border-[#c8d4e0] px-0 pt-2 pb-3 text-base text-[#3b3d42] placeholder:text-[#8b9daf] focus:border-transparent focus:ring-0"
                />

                {/* Checkbox */}
                <div className="flex items-start space-x-3 pt-2">
                  <input
                    type="checkbox"
                    name="consentimento"
                    id="consentimento"
                    checked={formData.consentimento}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 rounded border-[#15467d] accent-[#15467d] focus:ring-[#15467d]"
                  />
                  <label
                    htmlFor="consentimento"
                    className="cursor-pointer text-sm leading-relaxed text-[#88a9c3]"
                  >
                    Aceito os{" "}
                    <Link href="/termos-e-condicoes" className="text-[#88a9c3]">
                      termos e condições
                    </Link>{" "}
                    e a{" "}
                    <Link
                      href="/politica-de-privacidade"
                      className="text-[#88a9c3]"
                    >
                      política de privacidade
                    </Link>
                    .
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-40 rounded-[29px] bg-[#15467d] text-base text-white transition-none hover:bg-[#15467d] focus:bg-[#15467d] active:bg-[#15467d]"
                  size="lg"
                >
                  {loading ? "Sending..." : "Enviar"}
                </Button>

                {message.text && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-lg p-4 text-sm ${
                      message.type === "success"
                        ? "border border-green-200 bg-green-50 text-green-700"
                        : "border border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {message.text}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
