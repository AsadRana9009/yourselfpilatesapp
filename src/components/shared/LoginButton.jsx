"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LoginModal from "./LoginModal";
import {
  isAuthenticated,
  clearAuthData,
  getUserInfo,
  onAuthChange,
} from "@/lib/auth";

const BUTTON_VARIANTS = {
  mobile:
    "w-full rounded-full border-2 border-[#15467d] px-3 py-1 text-base font-normal text-[#15467d] transition-all duration-200 hover:border-[#88a9c3] hover:bg-[#88a9c3] hover:text-white",
  tablet:
    "rounded-full border-2 border-[#15467d] px-2 py-0.5 text-[11px] font-normal text-[#15467d] transition-all duration-200 hover:border-[#88a9c3] hover:bg-[#88a9c3] hover:text-white",
  desktop:
    "rounded-full border-2 border-[#15467d] px-4 py-1 text-[17px] font-normal text-[#15467d] transition-all duration-200 hover:border-[#88a9c3] hover:bg-[#88a9c3] hover:text-white",
};

const LoginButton = ({ variant = "desktop", className = "" }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setUser(getUserInfo());

    const unsubscribe = onAuthChange((isAuth, userInfo) => {
      setAuthenticated(isAuth);
      setUser(userInfo);
    });

    return unsubscribe;
  }, []);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
    setUser(getUserInfo());
  };

  const handleLogout = () => {
    clearAuthData();
    setAuthenticated(false);
    setUser(null);
  };

  const buttonClass = `${BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.desktop} ${className}`;

  if (authenticated) {
    return (
      <Button variant="outline" onClick={handleLogout} className={buttonClass}>
        Logout
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setModalOpen(true)}
        className={buttonClass}
      >
        Login
      </Button>

      <LoginModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onLogin={handleLoginSuccess}
      />
    </>
  );
};

export default LoginButton;
