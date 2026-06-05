"use client";

import React from "react";
import { Award, Wifi, Home, Tv, Wind, ShieldCheck } from "lucide-react";

const amenities = [
  {
    id: 1,
    icon: Award,
    title: "Equipamentos de Qualidade Premium",
    description: "que garantem uma melhor experiência",
  },
  {
    id: 2,
    icon: Wifi,
    title: "Internet",
    description: "própria, segura e rápida",
  },
  {
    id: 3,
    icon: Home,
    title: "Espaço com 80M²",
    description: "mobilado e pronto a utilizar",
  },
  {
    id: 4,
    icon: Tv,
    title: "Smart TV",
    description: "para complementar as suas aulas",
  },
  {
    id: 5,
    icon: Wind,
    title: "Ar Condicionado",
    description: "para controlar a temperatura do ambiente",
  },
  {
    id: 6,
    icon: ShieldCheck,
    title: "Vídeovigilância",
    description: "para garantir a sua segurança e dos seus clientes",
  },
];

export default function AmenitiesGrid() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {amenities.map((amenity) => {
            const Icon = amenity.icon;
            return (
              <div
                key={amenity.id}
                className="group flex flex-col items-center space-y-4 text-center"
              >
                {/* Icon Circle */}
                <div className="bg-accent/10 relative flex h-32 w-32 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
                  <Icon
                    className="text-secondary h-12 w-12"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-secondary text-base font-semibold">
                    {amenity.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-light">
                    {amenity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
