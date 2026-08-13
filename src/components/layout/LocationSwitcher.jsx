"use client";

import React from "react";
import { useLocation } from "@/context/LocationContext";
import LocationSelect from "@/components/shared/LocationSelect";

/**
 * Header location switcher.
 * Changing the location only changes the contacts shown on the site.
 */
const LocationSwitcher = ({ variant = "desktop", className = "" }) => {
  const { locations, selectedLocation, selectLocation } = useLocation();

  const isCompact = variant !== "desktop";

  return (
    <div
      className={`flex flex-col items-center gap-1 ${className}`}
      style={{ fontFamily: "var(--font-accent)" }}
    >
      <span
        className={`leading-none tracking-wide text-[#88a9c3] ${
          isCompact ? "text-[9px]" : "text-[11px]"
        }`}
      >
        Clique para mudar de local
      </span>

      <LocationSelect
        locations={locations}
        value={selectedLocation?.slug ?? ""}
        onChange={selectLocation}
        size={isCompact ? "sm" : "md"}
        className={isCompact ? "w-full" : "w-[205px] shrink-0"}
      />
    </div>
  );
};

export default LocationSwitcher;
