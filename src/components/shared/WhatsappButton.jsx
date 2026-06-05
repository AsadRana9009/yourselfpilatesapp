"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Dialog, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const WhatsappButtonWithDialog = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false); // for animation
  const buttonRef = useRef(null);

  const whatsappNumber = "+351927078842";
  const defaultMessage = encodeURIComponent(
    "Olá! Gostaria de saber mais informações sobre os serviços de Pilates."
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppContact = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleOpen = () => {
    setOpen(true);
    setAnimate(true);
  };

  const handleClose = () => {
    setAnimate(false); // trigger slide-down
    setTimeout(() => setOpen(false), 300); // keep DOM for animation duration
  };

  return (
    <div className="fixed right-6 bottom-6 z-50" ref={buttonRef}>
      <Dialog
        open={open}
        onOpenChange={(value) => (value ? handleOpen() : handleClose())}
      >
        <DialogTrigger asChild>
          <button
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all duration-300 md:h-16 md:w-16"
            aria-label="Contact us on WhatsApp"
          >
            <Image
              src="/icons/whatsapp.svg"
              alt="WhatsApp"
              width={48}
              height={48}
              className="h-10 w-10 md:h-12 md:w-12"
            />
          </button>
        </DialogTrigger>

        {/* Always render, but animate in/out */}
        <div
          className={`bg-background absolute right-0 bottom-[70px] w-80 transform rounded-lg border p-6 shadow-lg transition-all duration-500 ${
            animate ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          } pointer-events-${animate ? "auto" : "none"}`}
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-xl font-bold text-gray-300 hover:text-gray-500"
            aria-label="Close"
          >
            ×
          </button>
          <DialogHeader>
            <Image
              src="/images/Logo.png"
              alt="Logo"
              width={260}
              height={80}
              className="mx-auto mb-4 w-65"
            />
          </DialogHeader>

          <div className="-mx-6 mb-2">
            <Image
              src="/images/Chat.png"
              alt="Chat Illustration"
              width={320}
              height={200}
              className="w-full object-cover"
            />
          </div>
          <Button
            onClick={handleWhatsAppContact}
            className="mx-auto flex w-full items-center justify-center rounded-full bg-[#25D366] text-white lowercase transition-colors duration-200 hover:bg-[#20b358]"
            size="sm"
          >
            <Image
              src="/icons/whatsapp.svg"
              alt="WhatsApp"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            Contacte-nos!
          </Button>

          <p className="text-muted-foreground mt-2 text-center text-sm">
            🟢 Online |{" "}
            <a href="/politica-de-privacidade" className="text-red-500">
              Política de Privacidade
            </a>
          </p>
        </div>
      </Dialog>
    </div>
  );
};

export default WhatsappButtonWithDialog;
