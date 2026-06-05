"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LOGO_CONFIG, logoMotionVariants } from "./HeaderConstants";

const Logo = ({ variant = "mobile", className = "" }) => {
  const config = LOGO_CONFIG[variant] || LOGO_CONFIG.mobile;

  return (
    <Link href="/home">
      <motion.div
        className={`logo-container ${className}`}
        whileHover={logoMotionVariants.whileHover}
        transition={logoMotionVariants.transition}
      >
        <Image
          src={LOGO_CONFIG.src}
          alt={LOGO_CONFIG.alt}
          width={config.width}
          height={config.height}
          className={config.className}
          priority
        />
      </motion.div>
    </Link>
  );
};

export default Logo;
