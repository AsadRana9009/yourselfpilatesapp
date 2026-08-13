"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { regionsApi } from "@/lib/api";
import {
  DEFAULT_LOCATION,
  LOCATIONS,
  findLocationContacts,
} from "@/constants/Locations";

const LocationContext = createContext(null);

// The popup asks on every entry to the website. The chosen location is kept
// in memory only, so it survives navigation between pages but a new page load
// asks again. To remember it instead, store/read the slug in
// sessionStorage (per visit) or localStorage (across visits) under
// LOCATION_STORAGE_KEY.
const readStoredSlug = () => null;

const storeSlug = () => {};

/**
 * Builds the selectable list from the dashboard regions, attaching the
 * contact details of the matching location. Falls back to the local list
 * when the dashboard has no regions or the request fails.
 */
const buildLocations = (regions) => {
  if (!Array.isArray(regions) || regions.length === 0) return LOCATIONS;

  return regions.map((region) => {
    const contacts = findLocationContacts(region);
    return {
      ...contacts,
      id: region.id ?? null,
      slug: region.slug || contacts.slug,
      name: region.name || contacts.name,
    };
  });
};

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState(LOCATIONS);
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      let available = LOCATIONS;

      try {
        const regions = await regionsApi.getRegions();
        available = buildLocations(regions);
      } catch {
        available = LOCATIONS;
      }

      if (cancelled) return;

      setLocations(available);

      const storedSlug = readStoredSlug();
      const stored = available.find((item) => item.slug === storedSlug);

      if (stored) {
        setSelectedSlug(stored.slug);
      } else {
        setSelectedSlug(available[0]?.slug ?? DEFAULT_LOCATION.slug);
        setIsPickerOpen(true);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const selectedLocation = useMemo(
    () =>
      locations.find((item) => item.slug === selectedSlug) ??
      locations[0] ??
      DEFAULT_LOCATION,
    [locations, selectedSlug],
  );

  const selectLocation = useCallback((slug) => {
    setSelectedSlug(slug);
    storeSlug(slug);
    setIsPickerOpen(false);
  }, []);

  const openPicker = useCallback(() => setIsPickerOpen(true), []);
  const closePicker = useCallback(() => setIsPickerOpen(false), []);

  const value = useMemo(
    () => ({
      locations,
      selectedLocation,
      selectLocation,
      isPickerOpen,
      openPicker,
      closePicker,
    }),
    [
      locations,
      selectedLocation,
      selectLocation,
      isPickerOpen,
      openPicker,
      closePicker,
    ],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    // Allows components to render outside the provider (e.g. isolated tests)
    return {
      locations: LOCATIONS,
      selectedLocation: DEFAULT_LOCATION,
      selectLocation: () => {},
      isPickerOpen: false,
      openPicker: () => {},
      closePicker: () => {},
    };
  }

  return context;
};
