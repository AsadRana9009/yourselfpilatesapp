"use client";

import { PhoneCall } from "lucide-react";
import { PHONE_NUMBER, PHONE_SUBTITLE } from "./HeaderConstants";

const PhoneLink = ({ variant = "mobile", className = "" }) => {
  const variantClasses = {
    mobile: "phone-link-mobile hover:scale-105 py-1 px-1",
    tablet: "phone-link-tablet hover:scale-105 py-2 px-2",
    desktop: "phone-link-desktop hover:scale-110 py-[16px] ml-4",
  };

  const baseClasses =
    "flex items-center justify-center space-x-1 rounded-xl px-1 sm:px-2 md:px-3 xl:px-4 transition-all duration-200";

  const variantClass = variantClasses[variant] || variantClasses.mobile;

  return (
    <a
      href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
      className={`${variantClass} ${baseClasses} ${className}`}
    >
      <PhoneCall className="phone-icon h-2.5 w-2.5 sm:h-4 sm:w-4 md:h-4 md:w-4 xl:h-5 xl:w-5" />

      <div className="flex min-w-0 flex-col text-center leading-none">
        <span className="phone-number text-[6px] leading-none sm:text-[10px] md:text-sm xl:text-base">
          {PHONE_NUMBER}
        </span>

        <span className="phone-subtitle text-[4px] leading-none sm:text-[7px] md:text-[10px] xl:text-xs">
          {PHONE_SUBTITLE}
        </span>
      </div>
    </a>
  );
};

export default PhoneLink;
