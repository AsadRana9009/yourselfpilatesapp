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
import { bookingApi, regionsApi, studentsApi } from "@/lib/api";

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

const BookingModal = ({ open, onOpenChange, role, isPublic, onSuccess }) => {
  const [regionId, setRegionId] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [regions, setRegions] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [professorsLoading, setProfessorsLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [myStudents, setMyStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);

  const isProfessor = role === "professor" || role === "teacher";
  // Pro professor: self-registered, pays for their own hours, no region
  const isProProfessor = isProfessor && isPublic === false;
  // Public student: self-registered (is_public=true), buys region packs, books public professors
  // Pro Professor Students (is_public=false, role=student) must NOT independently select regions/professors
  const isStudent = !isProfessor && isPublic === true;

  // Close region dropdown on outside click
  useEffect(() => {
    if (!regionDropdownOpen) return;
    const handler = (e) => {
      if (!e.target.closest("[data-booking-region-dropdown]")) setRegionDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [regionDropdownOpen]);

  // Reset all state when modal closes
  useEffect(() => {
    if (!open) {
      setRegionId("");
      setProfessorId("");
      setDate("");
      setTimeSlot("");
      setTitle("");
      setNotes("");
      setProfessors([]);
      setAvailableSlots([]);
      setError("");
      setSuccess(false);
      setRegionDropdownOpen(false);
      setMyStudents([]);
      setSelectedStudentIds([]);
      setStudentSearch("");
      setStudentDropdownOpen(false);
    }
  }, [open]);

  // Load regions once on open
  useEffect(() => {
    if (open) {
      regionsApi.getRegions().then(setRegions).catch(() => setRegions([]));
    }
  }, [open]);

  // Load professor's own students on open (pro professor flow)
  useEffect(() => {
    if (!open || !isProfessor) return;
    setStudentsLoading(true);
    studentsApi.getMyStudents()
      .then(setMyStudents)
      .catch(() => setMyStudents([]))
      .finally(() => setStudentsLoading(false));
  }, [open, isProfessor]);

  // When region changes (student flow): reload public professors filtered by region
  useEffect(() => {
    if (!open || isProfessor) return;
    setProfessorId("");
    if (!regionId) { setProfessors([]); return; }
    setProfessorsLoading(true);
    bookingApi
      .getProfessors(regionId, true) // isPublicOnly=true — students can only book public professors
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

    if (isStudent && !regionId) {
      setError("Please select a region.");
      return;
    }
    if (isStudent && !professorId) {
      setError("Please select a professor.");
      return;
    }
    if (!date || !timeSlot) {
      setError("Please select a date and time slot.");
      return;
    }

    setLoading(true);
    try {
      if (isProfessor) {
        // Pro professor: type always "pro", no region
        await bookingApi.createBooking({
          booking_date: date,
          time_slot: timeSlot,
          booking_type: "pro",
          title: title || undefined,
          notes: notes || undefined,
          students: selectedStudentIds,
        });
      } else {
        // Public student: books a public professor in the selected region
        await bookingApi.studentBook({
          professor: Number(professorId),
          booking_date: date,
          time_slot: timeSlot,
          region: Number(regionId),
          notes: notes || undefined,
          title: title || undefined,
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

            {/* 1. Region — students only (pro professors have no region) */}
            {isStudent && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#15467d]">Region</label>
                <div className="relative" data-booking-region-dropdown>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setRegionDropdownOpen((v) => !v)}
                    className={`${selectClass} flex items-center justify-between text-left font-normal`}
                  >
                    <span className={regionId ? "text-[#3b3d42]" : "text-[#8b9daf]"}>
                      {regionId
                        ? regions.find((r) => String(r.id) === regionId)?.name ?? "Select a region"
                        : "Select a region"}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 text-gray-400 transition-transform duration-200 ${regionDropdownOpen ? "rotate-180" : ""}`}>
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>

                  {regionDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-[#c8d4e0] bg-white shadow-xl">
                      <button
                        type="button"
                        onClick={() => { setRegionId(""); setRegionDropdownOpen(false); }}
                        className={`flex w-full items-center px-4 py-3 text-sm transition-colors hover:bg-sky-50 ${!regionId ? "font-semibold text-[#15467d] bg-sky-50" : "text-[#8b9daf]"}`}
                      >
                        Select a region
                      </button>
                      {regions.filter((r) => r.is_active).map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => { setRegionId(String(r.id)); setRegionDropdownOpen(false); }}
                          className={`flex w-full items-center gap-2.5 border-t border-[#e8f0f7] px-4 py-3 text-sm transition-colors hover:bg-sky-50 ${String(r.id) === regionId ? "font-semibold text-[#15467d] bg-sky-50" : "text-[#3b3d42]"}`}
                        >
                          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${String(r.id) === regionId ? "bg-[#15467d] text-white" : "bg-sky-100 text-sky-600"}`}>
                            {r.name.charAt(0).toUpperCase()}
                          </span>
                          {r.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. Professor — students only, only public professors, filtered by selected region */}
            {isStudent && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#15467d]">
                  Professor <span className="text-[11px] text-[#88a9c3] font-normal">(public)</span>
                </label>
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
                      ? "No public professors in this region"
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

            {/* Booking type info badge — pro professor always books as Pro */}
            {isProProfessor && (
              <div className="flex items-center gap-2 rounded-lg bg-[#f0f5fa] px-3 py-2.5 border border-[#c8d4e0]">
                <span className="h-2 w-2 rounded-full bg-[#15467d]" />
                <span className="text-sm text-[#15467d] font-medium">Booking type: <strong>Pro</strong></span>
              </div>
            )}

            {/* 2. Students — pro professors select from their own students */}
            {isProfessor && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#15467d]">
                  Students <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                {studentsLoading ? (
                  <p className="text-xs text-[#88a9c3] py-2">Loading students…</p>
                ) : myStudents.length === 0 ? (
                  <p className="text-xs italic text-[#88a9c3] py-2">No students added yet.</p>
                ) : (
                  <div className="relative">
                    {/* Selected student tags */}
                    {selectedStudentIds.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {selectedStudentIds.map((id) => {
                          const s = myStudents.find((x) => x.id === id);
                          if (!s) return null;
                          return (
                            <span
                              key={id}
                              className="inline-flex items-center gap-1 rounded-full bg-[#e8f0f7] px-2.5 py-1 text-xs text-[#15467d] font-medium"
                            >
                              {s.full_name}
                              <button
                                type="button"
                                onClick={() => setSelectedStudentIds((prev) => prev.filter((x) => x !== id))}
                                className="ml-0.5 text-[#88a9c3] hover:text-[#15467d]"
                              >
                                ×
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Search input */}
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#88a9c3]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Select students..."
                        value={studentSearch}
                        onChange={(e) => { setStudentSearch(e.target.value); setStudentDropdownOpen(true); }}
                        onFocus={() => setStudentDropdownOpen(true)}
                        disabled={loading}
                        className="h-12 w-full rounded-md border-2 border-[#c8d4e0] bg-white pl-8 pr-3 text-sm text-[#3b3d42] placeholder:text-[#8b9daf] focus:border-[#88a9c3] focus:outline-none focus:ring-2 focus:ring-[#88a9c3]/20 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    {/* Dropdown list */}
                    {studentDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-xl border border-[#c8d4e0] bg-white shadow-xl">
                        {myStudents
                          .filter((s) =>
                            s.full_name.toLowerCase().includes(studentSearch.toLowerCase())
                          )
                          .map((s) => {
                            const selected = selectedStudentIds.includes(s.id);
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  setSelectedStudentIds((prev) =>
                                    selected ? prev.filter((id) => id !== s.id) : [...prev, s.id]
                                  );
                                  setStudentSearch("");
                                }}
                                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-sky-50 border-b border-[#e8f0f7] last:border-0 ${selected ? "bg-sky-50 text-[#15467d] font-medium" : "text-[#3b3d42]"}`}
                              >
                                <span>{s.full_name}</span>
                                {selected && (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#15467d]"><path d="M20 6 9 17l-5-5"/></svg>
                                )}
                              </button>
                            );
                          })}
                        {myStudents.filter((s) =>
                          s.full_name.toLowerCase().includes(studentSearch.toLowerCase())
                        ).length === 0 && (
                          <p className="px-4 py-3 text-sm text-[#88a9c3] italic">No students found.</p>
                        )}
                      </div>
                    )}

                    {/* Click-outside close */}
                    {studentDropdownOpen && (
                      <div
                        className="fixed inset-0 z-40"
                        onMouseDown={() => setStudentDropdownOpen(false)}
                      />
                    )}
                  </div>
                )}
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
