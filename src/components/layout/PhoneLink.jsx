"use client";

import { PhoneCall } from "lucide-react";
import { PHONE_NUMBER, PHONE_SUBTITLE } from "./HeaderConstants";

const PhoneLink = ({ variant = "mobile", className = "" }) => {
  // Variant-specific classes
  const variantClasses = {
    mobile: "phone-link-mobile hover:scale-105 py-4",
    tablet: "phone-link-tablet hover:scale-105 py-4",
    desktop: "phone-link-desktop hover:scale-110 py-[18px]",
  };

  const baseClasses =
    "flex items-center justify-center space-x-2 rounded-2xl px-4 transition-all duration-200";
  const variantClass = variantClasses[variant] || variantClasses.mobile;

  return (
    <a
      href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
      className={`${variantClass} ${baseClasses} ${className}`}
    >
      <PhoneCall className="phone-icon h-5 w-5" />
      <div className="flex flex-col text-center leading-none">
        <span className="phone-number">{PHONE_NUMBER}</span>
        <span className="phone-subtitle">{PHONE_SUBTITLE}</span>
      </div>
    </a>
  );
};

export default PhoneLink;
