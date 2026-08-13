"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, MapPin } from "lucide-react";

/**
 * Branded location dropdown used by the header switcher and the entry popup.
 * Plain React (no portal) so it can never conflict with the dialog unmount.
 */
const SIZES = {
  sm: {
    button: "h-8 gap-1.5 px-3 text-[11px]",
    icon: "h-3 w-3",
    chevron: "h-3 w-3",
    option: "px-2.5 py-1.5 text-[11px]",
  },
  md: {
    button: "h-9 gap-2 px-4 text-sm",
    icon: "h-3.5 w-3.5",
    chevron: "h-4 w-4",
    option: "px-3 py-2 text-sm",
  },
  lg: {
    button: "h-11 gap-2 px-4 text-base",
    icon: "h-4 w-4",
    chevron: "h-4 w-4",
    option: "px-3 py-2.5 text-base",
  },
};

const LocationSelect = ({
  locations = [],
  value,
  onChange,
  size = "md",
  className = "",
  placeholder = "Escolha um local",
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const sizeClasses = SIZES[size] ?? SIZES.md;
  const selected = locations.find((location) => location.slug === value);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (slug) => {
    onChange(slug);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ fontFamily: "var(--font-accent)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Local do ginásio"
        className={`flex w-full items-center rounded-full border bg-white/95 font-medium tracking-normal normal-case text-[#15467d] shadow-sm transition-all duration-200 hover:border-[#15467d] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#88a9c3] ${
          open ? "border-[#15467d] shadow-md" : "border-[#88a9c3]"
        } ${sizeClasses.button}`}
      >
        <MapPin className={`shrink-0 text-[#88a9c3] ${sizeClasses.icon}`} />

        <span className="flex-1 truncate text-left">
          {selected?.name ?? placeholder}
        </span>

        <ChevronDown
          className={`shrink-0 text-[#88a9c3] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          } ${sizeClasses.chevron}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-[calc(100%+6px)] left-0 z-[60] w-full overflow-hidden rounded-2xl border border-[#d7e3ed] bg-white p-1 shadow-[0_12px_30px_rgba(21,70,125,0.18)]"
        >
          {locations.map((location) => {
            const isSelected = location.slug === value;

            return (
              <li key={location.slug}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(location.slug)}
                  className={`flex w-full items-center gap-2 rounded-xl text-left font-medium tracking-normal normal-case transition-colors duration-150 ${
                    isSelected
                      ? "bg-[#e8eff3] font-semibold text-[#15467d]"
                      : "text-[#15467d] hover:bg-[#f2f6f9]"
                  } ${sizeClasses.option}`}
                >
                  <span className="flex-1 truncate">{location.name}</span>

                  {isSelected && (
                    <Check className={`shrink-0 text-[#88a9c3] ${sizeClasses.icon}`} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LocationSelect;
