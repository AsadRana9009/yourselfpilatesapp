import React from "react";
import Link from "next/link";

export default function BookingCTA() {
  return (
    <section className="bg-background py-16 text-center md:py-20">
      <div className="container mx-auto px-4">
        <p className="text-muted-foreground text-lg md:text-xl">
          Gostava de agendar uma visita ou entrar em contacto
        </p>
        <Link
          href="/contactos"
          className="text-primary hover:text-primary-hover mt-4 inline-block text-lg font-medium underline md:text-xl"
        >
          Entre em contacto
        </Link>
      </div>
    </section>
  );
}
