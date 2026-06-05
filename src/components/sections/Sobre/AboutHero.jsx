"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ABOUT_INTRO } from "@/constants/AboutContent";

const OvalWrapper = ({ children, side = "left", className = "" }) => {
  const shape =
    side === "left"
      ? "rounded-r-[160px] rounded-l-[0px]"
      : "rounded-l-[160px] rounded-r-[0px]";

  return (
    <div className={`relative overflow-hidden ${shape} ${className}`}>
      {children}
    </div>
  );
};

const ScrollAnimatedImage = ({ children, side }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const [width, setWidth] = React.useState(1200);

  React.useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const x = useTransform(scrollYProgress, (v) => {
    if (width < 768) {
      return side === "left" ? -40 * v : 40 * v;
    }

    if (width < 1024) {
      return side === "left" ? -80 * v : 80 * v;
    }

    return side === "left" ? -150 - 200 * v : 150 + 200 * v;
  });

  return (
    <motion.div ref={ref} style={{ x }}>
      {children}
    </motion.div>
  );
};

const AboutHero = () => {
  return (
    <section className="relative mt-[100px] w-full overflow-hidden bg-white pt-10 pb-20">
      {/* -------------------------------- ROW 1 -------------------------------- */}
      <div className="grid grid-cols-1 gap-10 px-6 md:grid-cols-2 md:px-16">
        {/* LEFT */}
        <ScrollAnimatedImage side="left">
          <OvalWrapper
            side="left"
            className="about-hero-left1 h-[180px] w-full sm:h-[200px] sm:w-[420px] md:h-[180px] md:w-[450px] md:-translate-x-12 lg:h-[200px] lg:w-[800px] xl:h-[300px] xl:w-[1200px] xl:-translate-x-[300px]"
          >
            <Image
              src="/images/On/1.jpg"
              alt="Neon Pilates Sign"
              fill
              className="object-cover"
            />
          </OvalWrapper>
        </ScrollAnimatedImage>

        {/* RIGHT */}
        <ScrollAnimatedImage side="right">
          <div className="relative w-full">
            <OvalWrapper
              side="right"
              className="about-hero-right1 right-0 h-[180px] w-full sm:h-[200px] sm:w-[420px] md:h-[180px] md:w-[250px] md:translate-x-12 lg:h-[200px] lg:w-[800px] lg:-translate-x-[250px] xl:h-[300px] xl:w-[1000px] xl:-translate-x-[250px]"
            >
              <Image
                src="/images/On/2.png"
                alt="Pilates Wood Texture"
                fill
                className="object-cover"
              />
            </OvalWrapper>
          </div>
        </ScrollAnimatedImage>
      </div>

      {/* -------------------------------- ROW 2 -------------------------------- */}
      <div className="mt-14 grid grid-cols-1 gap-10 px-6 md:grid-cols-2 md:px-16">
        {/* LEFT */}
        <ScrollAnimatedImage ScrollAnimatedImage side="left">
          <OvalWrapper
            side="left"
            className="about-hero-left2 h-[180px] w-full sm:h-[200px] sm:w-[420px] md:h-[180px] md:w-[400px] md:-translate-x-10 lg:h-[200px] lg:w-[600px] xl:h-[300px] xl:w-[1000px] xl:-translate-x-[300px]"
          >
            <Image
              src="/images/On/3.png"
              alt="Small Pilates detail"
              fill
              className="object-cover"
            />
          </OvalWrapper>
        </ScrollAnimatedImage>

        {/* RIGHT */}
        <ScrollAnimatedImage ScrollAnimatedImage side="right">
          <div className="relative w-full">
            <OvalWrapper
              side="right"
              className="about-hero-right2 right-0 h-[180px] w-full sm:h-[200px] sm:w-[420px] lg:h-[200px] lg:w-[800px] lg:-translate-x-[300px] xl:h-[300px] xl:w-[1000px] xl:-translate-x-[270px]"
            >
              <Image
                fill
                src="/images/On/4.jpg"
                alt="Pilates Wood Texture"
                className="object-cover"
              />
            </OvalWrapper>
          </div>
        </ScrollAnimatedImage>
      </div>

      {/* -------------------------------- ROW 3 -------------------------------- */}
      <div className="mt-16 grid grid-cols-1 gap-10 px-6 md:grid-cols-2 md:px-16">
        {/* LEFT */}
        <ScrollAnimatedImage ScrollAnimatedImage side="left">
          <OvalWrapper
            side="left"
            className="about-hero-left3 h-[200px] w-full sm:h-[230px] sm:w-[440px] md:h-[200px] md:w-[300px] md:-translate-x-17 lg:h-[200px] lg:w-[600px] xl:h-[300px] xl:w-[1000px] xl:-translate-x-[300px]"
          >
            <Image
              src="/images/On/5.png"
              alt="Pilates full"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-gray-500/40">
              <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-56 md:w-56 lg:h-72 lg:w-72">
                <Image
                  src="/images/On/yourself-pilates-header-logo@2x.png"
                  alt="logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </OvalWrapper>
        </ScrollAnimatedImage>

        <div className="flex max-w-lg items-center md:pl-10">
          <p className="text-center text-[17px] font-normal text-[#15467d] sm:text-[18px] md:text-left md:text-[19px]">
            {ABOUT_INTRO.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
