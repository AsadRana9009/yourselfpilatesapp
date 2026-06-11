"use client";

import React from "react";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import PhoneLink from "./PhoneLink";
import LoginButton from "@/components/shared/LoginButton";
import RegistrationButton from "@/components/shared/RegistrationButton";
import UserCredits from "@/components/shared/UserCredits";
import "./style.css";

const Header = () => {
  const showHeader = useScrollHeader();

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full bg-transparent transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full px-6 lg:px-12">

        <div className="flex flex-col items-center space-y-3 py-6 md:hidden">
          <Logo variant="mobile" />

          <UserCredits variant="mobile" />

          <div className="grid w-full grid-cols-2 gap-3">
            <PhoneLink variant="mobile" />

            <div className="flex flex-col items-stretch gap-[2px]">
              <LoginButton variant="mobile" />
              <RegistrationButton variant="mobile" />
            </div>

            <MobileMenu />
          </div>
        </div>

        <div className="hidden flex-col items-center space-y-2 py-6 md:flex xl:hidden">
          <Logo variant="tablet" />

          <div className="flex w-full items-center justify-between gap-4">
            <Navigation />
            <div className="flex items-center gap-1">
              <UserCredits variant="tablet" />
              <LoginButton variant="tablet" />
              <RegistrationButton variant="tablet" />
              <PhoneLink variant="tablet" />
            </div>
          </div>
        </div>

        <div className="hidden items-center justify-between py-4 xl:flex">
          <Logo variant="desktop" />

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