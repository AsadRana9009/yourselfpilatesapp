"use client";

import React, { useState, useEffect } from "react";
import BookingModal from "./BookingModal";
import { isAuthenticated, getUserInfo, onAuthChange } from "@/lib/auth";

const BookingButton = () => {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const update = (_, userInfo) => setUser(userInfo ?? null);
    setUser(getUserInfo());

    const unsub = onAuthChange(update);
    return unsub;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        aria-label="Book a space"
        style={{ bottom: "6rem" }}
        className={`fixed right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#15467d] text-white shadow-lg transition-all duration-300 hover:bg-[#1a5494] md:h-16 md:w-16 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7 md:h-8 md:w-8"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      <BookingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        role={user.role}
        isPublic={user.isPublic}
      />
    </>
  );
};

export default BookingButton;
