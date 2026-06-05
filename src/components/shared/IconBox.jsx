"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const IconBox = ({ icon, title, description, className }) => {
  const isImage = typeof icon === "string";
  const Icon = icon;

  return (
    <motion.div
      initial={false}
      animate={false}
      transition={false}
      className={cn(
        "flex flex-col items-center space-y-10 p-6 text-center",
        className
      )}
    >
      <div className="mb-2 flex h-32 w-32 items-center justify-center rounded-full bg-[#f3f6f9]">
        {isImage ? (
          <Image
            src={icon}
            alt={title}
            width={60}
            height={60}
            className="h-16 w-16 object-contain"
          />
        ) : (
          <Icon className="h-16 w-16 text-[#15467d]" />
        )}
      </div>

      <div className="flex w-full max-w-[250px] flex-col justify-center space-y-1 sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px]">
        <h3 className="text-sm leading-tight font-semibold text-[#15467d]">
          {title}
        </h3>
        {description && (
          <p className="text-sm leading-relaxed text-[#15467d] opacity-80 md:text-base">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default IconBox;
