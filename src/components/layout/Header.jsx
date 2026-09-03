"use client";

import React from "react";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { useNavItems } from "@/hooks/useNavItems";
import Navigation from "./Navigation";
import HeaderDrawer from "./HeaderDrawer";
import Logo from "./Logo";
import PhoneLink from "./PhoneLink";
import LocationSwitcher from "./LocationSwitcher";
import LoginButton from "@/components/shared/LoginButton";
import RegistrationButton from "@/components/shared/RegistrationButton";
import UserCredits from "@/components/shared/UserCredits";
import "./style.css";

const Header = () => {
  const isScrolled = useScrollHeader();
  const { isAuth } = useNavItems();

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? "bg-white/90 shadow-md backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      {/*
        Mobile + tablet (< xl): one compact bar of fixed height. Navigation,
        location, contacts and sign-up live in <HeaderDrawer />, so the bar
        never grows past --header-h no matter what is in the menu.
      */}
      <div className="flex h-[var(--header-h)] items-center justify-between gap-3 px-4 sm:px-6 xl:hidden">
        <Logo variant="compact" />

        <div className="flex items-center gap-2">
          <UserCredits variant="mobile" />
          {isAuth && <RegistrationButton variant="tablet" />}
          <HeaderDrawer />
        </div>
      </div>

      {/* Desktop (xl+) — unchanged layout */}
      <div className="hidden w-full px-6 lg:px-12 xl:block">
        <div className="hidden items-center justify-between py-4 xl:flex">
          <Logo variant="desktop" />

          <LocationSwitcher variant="desktop" />

          <div className="flex items-center gap-6">
            <Navigation />
            <div className="flex items-center gap-1">
              <UserCredits variant="desktop" />
              <LoginButton variant="desktop" />
              <RegistrationButton variant="desktop" />
              <PhoneLink variant="desktop" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
