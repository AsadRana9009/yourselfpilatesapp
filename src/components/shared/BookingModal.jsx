"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bookingApi, regionsApi } from "@/lib/api";

const TIME_SLOTS = [
  "06:00 - 07:00","07:00 - 08:00","08:00 - 09:00","09:00 - 10:00",
  "10:00 - 11:00","11:00 - 12:00","12:00 - 13:00","13:00 - 14:00",
  "14:00 - 15:00","15:00 - 16:00","16:00 - 17:00","17:00 - 18:00",
  "18:00 - 19:00","19:00 - 20:00","20:00 - 21:00","21:00 - 22:00",
];

const today = () => new Date().toISOString().split("T")[0];

const selectClass =
  "h-12 w-full rounded-md border-2 border-[#c8d4e0] bg-white px-3 text-sm text-[#3b3d42] appearance-none focus:border-[#88a9c3] focus:outline-none focus:ring-2 focus:ring-[#88a9c3]/20 disabled:cursor-not-allowed disabled:opacity-50";

const NativeSelect = ({ value, onChange, disabled, children, placeholder }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={selectClass}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children}
    </select>
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </span>
  </div>
);

const BookingModal = ({ open, onOpenChange, role, onSuccess }) => {
  const [regionId, setRegionId] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [title, setTitle] = useState("");
  const [bookingType, setBookingType] = useState("pro");
  const [notes, setNotes] = useState("");
  const [regions, setRegions] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [professorsLoading, setProfessorsLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isProfessor = role === "professor" || role === "teacher";

  // Reset all state when modal closes
  useEffect(() => {
    if (!open) {
      setRegionId("");
      setProfessorId("");
      setDate("");
      setTimeSlot("");
      setTitle("");
      setBookingType("pro");
      setNotes("");
      setProfessors([]);
      setAvailableSlots([]);
      setError("");
      setSuccess(false);
    }
  }, [open]);

  // Load regions once on open
  useEffect(() => {
    if (open) {
      regionsApi.getRegions().then(setRegions).catch(() => setRegions([]));
    }
  }, [open]);

  // When region changes (student flow): reload professors filtered by region
  useEffect(() => {
    if (!open || isProfessor) return;
    setProfessorId("");
    setProfessorsLoading(true);
    bookingApi
      .getProfessors(regionId || undefined)
      .then(setProfessors)
      .catch(() => setProfessors([]))
      .finally(() => setProfessorsLoading(false));
  }, [open, isProfessor, regionId]);

  // Load available slots when date changes
  useEffect(() => {
    if (!date) { setAvailableSlots([]); setTimeSlot(""); return; }
    setSlotsLoading(true);
    setTimeSlot("");
    bookingApi
      .getAvailableSlots(date)
      .then((slots) => setAvailableSlots(slots))
      .catch(() => setAvailableSlots(TIME_SLOTS.map((s) => ({ value: s, display: s }))))
      .finally(() => setSlotsLoading(false));
  }, [date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isProfessor && !regionId) {
      setError("Please select a region.");
      return;
    }
    if (!isProfessor && !professorId) {
      setError("Please select a professor.");
      return;
    }
    if (!date || !timeSlot) {
      setError("Please select a date and time slot.");
      return;
    }

    setLoading(true);
    try {
      const region = regionId ? Number(regionId) : null;
      if (isProfessor) {
        await bookingApi.createBooking({
          booking_date: date,
          time_slot: timeSlot,
          booking_type: bookingType,
          title: title || undefined,
          notes: notes || undefined,
          region,
          students: [],
        });
      } else {
        await bookingApi.studentBook({
          professor: Number(professorId),
          booking_date: date,
          time_slot: timeSlot,
          notes: notes || undefined,
          title: title || undefined,
          region,
        });
      }
      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#15467d]">
            {success ? "Booking Confirmed!" : "Book a Space"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {success
              ? "Your booking was created successfully."
              : isProfessor
              ? "Reserve a slot for your class."
              : "Select a region, professor and time slot."}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-center text-gray-600">
              Your booking for <strong>{date}</strong> at <strong>{timeSlot}</strong> has been created.
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              className="rounded-full bg-[#398ffc] px-8 py-2 text-white hover:bg-[#2878dc]"
            >
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-1">
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* 1. Region — shown for both students and professors */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#15467d]">
                Region {isProfessor && <span className="text-gray-400 font-normal">(optional)</span>}
              </label>
              <div className="relative">
                <select
                  value={regionId}
                  onChange={(e) => setRegionId(e.target.value)}
                  disabled={loading}
                  className={selectClass}
                >
                  <option value="">{isProfessor ? "No specific region" : "Select a region"}</option>
                  {regions
                    .filter((r) => r.is_active)
                    .map((r) => (
                      <option key={r.id} value={String(r.id)}>
                        {r.name}
                      </option>
                    ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* 2. Professor — students only, filtered by selected region */}
            {!isProfessor && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#15467d]">Professor</label>
                <NativeSelect
                  value={professorId}
                  onChange={setProfessorId}
                  disabled={loading || professorsLoading || !regionId}
                  placeholder={
                    !regionId
                      ? "Select a region first"
                      : professorsLoading
                      ? "Loading professors…"
                      : professors.length === 0
                      ? "No professors in this region"
                      : "Select a professor"

                  }
                >
                  {professors.map((p) => (
                    <option key={p.id} value={String(p.id)}>
                      {p.full_name}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            )}

            {/* 3. Date */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#15467d]">Date</label>
              <Input
                type="date"
                min={today()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={loading}
                required
                className="h-12 border-2 border-[#c8d4e0] focus:border-[#88a9c3]"
              />
            </div>

            {/* 4. Time slot */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#15467d]">Time Slot</label>
              <NativeSelect
                value={timeSlot}
                onChange={setTimeSlot}
                disabled={loading || !date || slotsLoading}
                placeholder={slotsLoading ? "Loading slots…" : !date ? "Select a date first" : "Select a time slot"}
              >
                {availableSlots.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.display}
                  </option>
                ))}
              </NativeSelect>
            </div>

            {/* Professor: booking type */}
            {isProfessor && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#15467d]">Booking Type</label>
                <NativeSelect value={bookingType} onChange={setBookingType} disabled={loading}>
                  <option value="pro">Pro</option>
                  <option value="public">Public</option>
                </NativeSelect>
              </div>
            )}

            {/* Title (optional) */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#15467d]">
                Title <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <Input
                type="text"
                placeholder="e.g. Pilates class"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                className="h-12 border-2 border-[#c8d4e0] focus:border-[#88a9c3]"
              />
            </div>

            {/* Notes (optional) */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#15467d]">
                Notes <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <Input
                type="text"
                placeholder="Any additional notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={loading}
                className="h-12 border-2 border-[#c8d4e0] focus:border-[#88a9c3]"
              />
            </div>

            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="w-full rounded-full border-2 border-[#15467d] px-6 py-2 text-[#15467d] hover:bg-[#88a9c3] hover:text-white hover:border-[#88a9c3] sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#398ffc] px-6 py-2 text-white hover:bg-[#2878dc] disabled:opacity-50 sm:w-auto"
              >
                {loading ? "Booking…" : "Book Space"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
