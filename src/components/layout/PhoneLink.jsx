"use client";

import { PhoneCall } from "lucide-react";
import { useLocation } from "@/context/LocationContext";

const PhoneLink = ({ variant = "mobile", className = "" }) => {
  const { selectedLocation } = useLocation();
  const phoneNumber = selectedLocation.phone.number;
  const email = selectedLocation.email.address;

  const variantClasses = {
    mobile: "phone-link-mobile hover:scale-105 py-1 px-1",
    tablet: "phone-link-tablet hover:scale-105 py-2 px-2",
    desktop: "phone-link-desktop hover:scale-110 py-[16px] ml-4",
  };

  const baseClasses =
    "flex items-center justify-center space-x-1 rounded-xl px-1 sm:px-2 md:px-3 xl:px-4 transition-all duration-200";

  const variantClass = variantClasses[variant] || variantClasses.mobile;

  return (
    <div className={`${variantClass} ${baseClasses} ${className}`}>
      <PhoneCall className="phone-icon h-2.5 w-2.5 sm:h-4 sm:w-4 md:h-4 md:w-4 xl:h-5 xl:w-5" />

      <div className="flex min-w-0 flex-col text-center leading-none">
        <a
          href={`tel:${selectedLocation.phone.formatted}`}
          className="phone-number text-[6px] leading-none sm:text-[10px] md:text-sm xl:text-base"
        >
          {phoneNumber}
        </a>

        <a
          href={`mailto:${email}`}
          className="phone-subtitle truncate text-[4px] leading-none hover:underline sm:text-[7px] md:text-[10px] xl:text-xs"
        >
          {email}
        </a>
      </div>
    </div>
  );
};

export default PhoneLink;
