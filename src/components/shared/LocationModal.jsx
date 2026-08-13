"use client";

import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLocation } from "@/context/LocationContext";
import LocationSelect from "@/components/shared/LocationSelect";

/**
 * Location picker shown when entering the website.
 * Choosing a location only changes the contacts shown on the site.
 */
const LocationModal = () => {
  const {
    locations,
    selectedLocation,
    selectLocation,
    isPickerOpen,
    closePicker,
  } = useLocation();

  const [pendingSlug, setPendingSlug] = useState(selectedLocation?.slug ?? "");

  useEffect(() => {
    if (isPickerOpen) {
      setPendingSlug(selectedLocation?.slug ?? "");
    }
  }, [isPickerOpen, selectedLocation]);

  const handleConfirm = () => {
    selectLocation(pendingSlug || selectedLocation?.slug);
  };

  return (
    <Dialog open={isPickerOpen} onOpenChange={(open) => !open && closePicker()}>
      <DialogContent className="sm:max-w-md bg-white text-[#3b3d42]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-semibold text-[#15467d]">
            <MapPin className="h-6 w-6 text-[#88a9c3]" />
            Selecione o local
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            Selecione o local do ginásio que prefere. Esta escolha altera apenas
            os contactos apresentados.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#15467d]">
            Local do ginásio
          </label>

          <LocationSelect
            locations={locations}
            value={pendingSlug}
            onChange={setPendingSlug}
            size="lg"
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleConfirm}
            className="w-full bg-[#15467d] text-white hover:bg-[#0f365f]"
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
