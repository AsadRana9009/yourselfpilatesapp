"use client";

import React from "react";
import PackageCard from "./PackageCard";

const packages = [
  {
    id: 1,
    title: "1 sessão hora/aula",
    description: "Pack de 1 hora, para maior flexibilidade de horários.",
    price: "22€/sessão",
    priceValue: 22,
    image: "/yourself-pilates-agendar-pack-uma-sessao@2x.jpg",
    link: "/packs/uma-sessao",
    features: [
      "1 hora de utilização",
      "Máxima flexibilidade",
      "Sem compromisso",
    ],
  },
  {
    id: 2,
    title: "Pack de 4 horas/aula",
    description:
      "Pack de 4 horas, pode escolher o dia e hora que desejar até um limite de 4 aulas.",
    price: "20€/sessão",
    priceValue: 20,
    discount: "9% de desconto",
    image: "/yourself-pilates-agendar-pack-mensal@2x.jpg",
    link: "/packs/quatro-aulas",
    features: [
      "4 horas de utilização",
      "Escolha dias e horários",
      "Economize 8€",
    ],
  },
  {
    id: 3,
    title: "Pack de 8 horas/aula",
    description:
      "Pack de 8 horas, pode escolher o dia e hora que desejar até um limite de 8 aulas.",
    price: "18€/sessão",
    priceValue: 18,
    discount: "18% de desconto",
    badge: "Melhor Valor",
    image: "/yourself-pilates-agendar-pack-semestral@2x.jpg",
    link: "/packs/oito-aulas",
    features: ["8 horas de utilização", "Máxima economia", "Economize 32€"],
  },
];

export default function PackageGrid() {
  return (
    <section className="bg-muted/5 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
