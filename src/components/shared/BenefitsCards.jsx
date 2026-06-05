"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import FeatureCard from "@/components/shared/FeatureCard";

const BenefitsCards = () => {
  const benefits = [
    {
      title: "Baixo Custo Inicial",
      description:
        "Na Yourself Pilates, pagas apenas pelo tempo de uso. Mais flexibilidade, sem despesas fixas!",
      logo: "/icons/LightLogo.png",
      image: "/images/WhyYourself/1.jpg",
      accent: true,
      textColor: "white",
    },
    {
      title: "Foco total no aluno",
      description:
        "Concentre-se no que importa, a prática e o progresso dos seus alunos, sem preocupações administrativas.",
      logo: "/icons/DarkLogo.png",
      image: "/images/WhyYourself/2.jpg",
      accent: false,
      textColor: "#15467d",
    },
    {
      title: "Ambiente Profissional",
      description:
        "Um espaço que transmite profissionalismo e conforto, ideal para fortalecer a sua imagem e fidelizar os seus alunos.",
      logo: "/icons/DarkLogo.png",
      image: "/images/WhyYourself/3.jpg",
      accent: true,
      textColor: "#15467d",
    },
    {
      title: "Networking",
      description:
        "Construa uma rede de contatos valiosa, troque experiências e cresça junto com a comunidade do Pilates.",
      logo: "/icons/LightLogo.png",
      image: "/images/WhyYourself/1.jpg",
      accent: false,
      textColor: "white",
    },
    {
      title: "Horários Flexíveis",
      description:
        "Agende as suas aulas de acordo com a sua agenda e a dos seus alunos. Maior controlo e liberdade para si!",
      logo: "/icons/LightLogo.png",
      image: "/images/WhyYourself/5.jpg",
      accent: true,
      textColor: "white",
    },
    {
      title: "Financeiro controlado",
      description:
        "Em momentos de baixa procura, paga apenas pelo que utiliza. Simples e sem surpresas.",
      logo: "/icons/DarkLogo.png",
      image: "/images/WhyYourself/6.jpg",
      accent: false,
      textColor: "#15467d",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20">
      <div className="flex flex-col items-center space-y-4 text-center">
        <h1 className="font-accent mb-9 text-center text-5xl font-light">
          <span className="text-[#88a9c3]">Porquê a </span>
          <span className="font-light text-[#0f3660]">YourSelf </span>
          <span className="text-[#88a9c3]">?</span>
        </h1>

        <Link
          href="/contactos"
          className="group mb-16 inline-block text-lg font-normal text-[#88a9c3] underline decoration-2 underline-offset-4 transition-all duration-200"
        >
          Saber mais sobre a YourSelf
        </Link>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto grid max-w-[1200px] grid-cols-1 justify-items-center gap-6 md:grid-cols-2"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants} className="w-full">
              <FeatureCard
                className="w-full"
                title={benefit.title}
                description={benefit.description}
                icon={
                  <Image
                    src={benefit.logo}
                    alt={benefit.title}
                    width={40}
                    height={40}
                    style={{ width: "auto", height: "auto" }}
                  />
                }
                image={benefit.image}
                accent={benefit.accent}
                textColor={benefit.textColor}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsCards;
