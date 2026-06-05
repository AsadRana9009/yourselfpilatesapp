"use client";

import React from "react";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import PhoneLink from "./PhoneLink";
import LoginButton from "@/components/shared/LoginButton";
import UserCredits from "@/components/shared/UserCredits";
import "./style.css";

const Header = () => {
  const showHeader = useScrollHeader();

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full bg-transparent transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="w-full px-6 lg:px-12">
        {/* Mobile Layout - Optimized with Tailwind responsive classes */}
        <div className="flex flex-col items-center space-y-4 py-6 md:hidden">
          <div className="flex w-full justify-center">
            <Logo variant="mobile" />
          </div>

          <div className="flex w-full items-center justify-center gap-3">
            <UserCredits variant="mobile" />
          </div>

          <div className="grid w-full grid-cols-1 gap-4 min-[350px]:grid-cols-12">
            <div className="col-span-1 flex justify-center min-[350px]:col-span-6">
              <PhoneLink variant="mobile" />
            </div>

            <div className="col-span-1 flex justify-center min-[350px]:col-span-3">
              <LoginButton variant="mobile" />
            </div>

            <div className="col-span-1 flex justify-center min-[350px]:col-span-3">
              <MobileMenu />
            </div>
          </div>
        </div>

        {/* Tablet Layout - Optimized with Tailwind responsive classes */}
        <div className="hidden flex-col items-center space-y-4 py-6 md:flex xl:hidden">
          <Logo variant="tablet" />

          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
            <Navigation />
            <UserCredits variant="tablet" />
            <LoginButton variant="tablet" />
            <PhoneLink variant="tablet" />
          </div>
        </div>

        {/* Desktop Layout - Optimized with Tailwind responsive classes */}
        <div className="hidden items-center justify-between py-4 xl:flex">
          <Logo variant="desktop" />

          <div className="flex items-center space-x-8">
            <Navigation />
            <UserCredits variant="desktop" />
            <LoginButton variant="desktop" />
            <PhoneLink variant="desktop" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
