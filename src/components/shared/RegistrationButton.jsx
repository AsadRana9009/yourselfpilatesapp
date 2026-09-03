"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import RegistrationModal from "./RegistrationModal";
import SettingsModal from "./SettingsModal";
import { getUserInfo, onAuthChange, clearAuthData } from "@/lib/auth";

const BUTTON_VARIANTS = {
  mobile:
    "w-full rounded-full border-2 border-[#15467d] px-3 py-1 text-base font-normal text-[#15467d] transition-all duration-200 hover:border-[#88a9c3] hover:bg-[#88a9c3] hover:text-white",
  tablet:
    "rounded-full border-2 border-[#15467d] px-2 py-0.5 text-[11px] font-normal text-[#15467d] transition-all duration-200 hover:border-[#88a9c3] hover:bg-[#88a9c3] hover:text-white",
  desktop:
    "rounded-full border-2 border-[#15467d] px-4 py-1 text-[17px] font-normal text-[#15467d] transition-all duration-200 hover:border-[#88a9c3] hover:bg-[#88a9c3] hover:text-white",
};

const RegistrationButton = ({ variant = "desktop", className = "" }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownStep, setDropdownStep] = useState("role");
  const [modalOpen, setModalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  const countryCode =
    typeof window !== "undefined"
      ? Intl.DateTimeFormat()
          .resolvedOptions()
          .locale.split("-")[1]
          ?.toLowerCase() || "pt"
      : "pt";

    const appStoreUrl = "https://apps.apple.com/pt/app/yourself-pilates/id6752496161";


  useEffect(() => {
    setUser(getUserInfo());

    const unsubscribe = onAuthChange((_, userInfo) => {
      setUser(userInfo);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setDropdownStep("role");
        setSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRoleSelect = (role) => {
    if (role === "professor") {
      setDropdownStep("professor");
    } else {
      setSelectedRole(role);
      setModalOpen(true);
      setDropdownOpen(false);
      setDropdownStep("role");
    }
  };

  const handleRegistrationSuccess = () => {
    setUser(getUserInfo());
    setDropdownOpen(false);
    setDropdownStep("role");
    setSelectedRole(null);
  };

  const buttonClass = `${
    BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.desktop
  } ${className}`;

  if (user) {
    const initials = user.fullName
      ? user.fullName.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase()
      : user.email?.[0]?.toUpperCase() ?? "U";

    return (
      <div className="relative" ref={dropdownRef}>
        {/* Profile circle */}
        <button
          onClick={() => {
            setSettingsOpen(false);
            setDropdownOpen((prev) => !prev);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#15467d] text-white text-xs font-semibold select-none cursor-pointer hover:bg-[#88a9c3] transition-colors duration-200"
        >
          {initials}
        </button>

        {/* Menu dropdown */}
        {dropdownOpen && (
          <div className="absolute top-full mt-4 right-0 sm:right-[-50px] z-50 rounded-md border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="flex flex-row">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setSettingsOpen(true);
                }}
                className="px-5 py-3 text-[15px] font-medium text-[#15467d] hover:bg-[#f0f5fa] transition-colors duration-150 whitespace-nowrap cursor-pointer border-r border-[#e0e0e0]"
              >
                Settings
              </button>
              <button
                onClick={() => {
                  clearAuthData();
                  setDropdownOpen(false);
                  setUser(null);
                }}
                className="px-5 py-3 text-[15px] font-medium text-[#15467d] hover:bg-[#f0f5fa] transition-colors duration-150 whitespace-nowrap cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Settings panel — drops below profile button */}
        <SettingsModal open={settingsOpen} />
      </div>
    );
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
            if (dropdownOpen) {
              setDropdownStep("role");
            }
          }}
          className={buttonClass}
        >
          Registration
        </Button>

        {dropdownOpen && (
          <div
            className="
              absolute top-full mt-3
              right-0 sm:right-[-55px] sm:-translate-x-6
              z-50
              rounded-md
              border border-gray-200
              bg-white
              shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              max-w-[95vw]
              overflow-hidden
            "
          >
            {dropdownStep === "role" && (
              <div className="flex flex-col sm:flex-row">
                <button
                  onClick={() => handleRoleSelect("student")}
                  className="px-5 py-3 text-[15px] font-medium text-[#15467d]
                  hover:bg-[#f0f5fa] transition-colors duration-150
                  border-b sm:border-b-0 sm:border-r border-[#e0e0e0]
                  whitespace-nowrap cursor-pointer"
                >
                  As Student
                </button>

                <button
                  onClick={() => handleRoleSelect("professor")}
                  className="px-5 py-3 text-[15px] font-medium text-[#15467d]
                  hover:bg-[#f0f5fa] transition-colors duration-150
                  whitespace-nowrap cursor-pointer"
                >
                  As Professor
                </button>
              </div>
            )}

            {dropdownStep === "professor" && (
              <div className="p-2 w-full sm:min-w-[200px] flex flex-col mt-1 items-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-1 w-fit">
                  <a
                    href={appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[140px] h-[42px] flex items-center justify-center"
                  >
                    <Image
                      src="logos/app-store-badge.png"
                      alt="App Store Badge"
                      width={140}
                      height={42}
                      className="object-contain h-auto"
                    />
                  </a>

                  <a
                    href="https://play.google.com/store/apps/details?id=com.yourselfpilate.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[150px] h-[50px] flex items-center justify-center"
                  >
                    <Image
                      src="logos/google-play-badge.png"
                      alt="Google Play Badge"
                      width={150}
                      height={46}
                      className="object-contain h-auto"
                    />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <RegistrationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onRegister={handleRegistrationSuccess}
        initialRole={selectedRole}
      />
    </>
  );
};

export default RegistrationButton;