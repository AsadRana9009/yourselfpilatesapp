"use client";

import { PhoneCall } from "lucide-react";
import { useLocation } from "@/context/LocationContext";

const PhoneLink = ({ variant = "mobile", className = "" }) => {
  const { selectedLocation } = useLocation();
  const phoneNumber = selectedLocation.phone.number;
  const email = selectedLocation.email.address;

  const variantClasses = {
    // Used inside the mobile/tablet drawer, where there is room for readable text.
    mobile: "phone-link-mobile py-2 px-3 gap-2",
    tablet: "phone-link-tablet hover:scale-105 py-2 px-3 gap-2",
    // Desktop metrics are intentionally left exactly as they were.
    desktop: "phone-link-desktop hover:scale-110 py-[16px] px-4 ml-4 space-x-1",
  };

  const baseClasses =
    "flex items-center justify-center rounded-xl transition-all duration-200";

  const variantClass = variantClasses[variant] || variantClasses.mobile;
  const isDesktop = variant === "desktop";

  return (
    <div className={`${variantClass} ${baseClasses} ${className}`}>
      <PhoneCall
        className={`phone-icon shrink-0 ${
          isDesktop ? "h-5 w-5" : "h-4 w-4"
        }`}
      />

      <div className="flex min-w-0 flex-col text-center leading-none">
        <a
          href={`tel:${selectedLocation.phone.formatted}`}
          className={`phone-number ${
            isDesktop ? "text-[20px] leading-4" : "text-[15px] leading-tight"
          }`}
        >
          {phoneNumber}
        </a>

        <a
          href={`mailto:${email}`}
          className={`phone-subtitle truncate hover:underline ${
            isDesktop ? "mt-2 text-[10px] leading-3" : "text-[11px] leading-tight"
          }`}
        >
          {email}
        </a>
      </div>
    </div>
  );
};

export default PhoneLink;
