"use client";

import React from "react";
import { motion } from "framer-motion";
import IconBox from "@/components/shared/IconBox";

const FeaturesGrid = () => {
  const features = [
    {
      icon: "/icons/Quality.png",
      title: "Equipamentos de Qualidade Premium",
      description: "que garantem uma melhor experiência",
    },
    {
      icon: "/icons/wifi.png",
      title: "Internet",
      description: "própria, segura e rápida",
    },
    {
      icon: "/icons/space.png",
      title: "Espaço com 80M2",
      description: "mobilado e pronto a utilizar",
    },
    {
      icon: "/icons/TV.png",
      title: "Smart TV",
      description: "para complementar as suas aulas",
    },
    {
      icon: "/icons/AC.png",
      title: "Ar Condicionado",
      description: "para controlar a temperatura do ambiente",
    },
    {
      icon: "/icons/shield.png",
      title: "Vídeovigilância",
      description: "para garantir a sua segurança e dos seus clientes",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1800px] px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="custom-grid grid grid-cols-1 gap-10 sm:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6"
        >
          {features.map((feature, index) => (
            <IconBox
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
