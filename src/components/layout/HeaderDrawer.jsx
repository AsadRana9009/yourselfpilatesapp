"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavItems } from "@/hooks/useNavItems";
import { OrdersPopup } from "@/components/orders/OrdersPopup";
import LoginButton from "@/components/shared/LoginButton";
import RegistrationButton from "@/components/shared/RegistrationButton";
import LocationSwitcher from "./LocationSwitcher";
import PhoneLink from "./PhoneLink";
import Logo from "./Logo";

/**
 * Navigation drawer for every viewport below the desktop breakpoint (< xl).
 *
 * Mobile and tablet share this one panel, so there is a single place where the
 * small-screen navigation lives. The desktop header is unaffected.
 */
const HeaderDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { navItems, isAuth } = useNavItems();
  const pathname = usePathname();
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  const close = () => setIsOpen(false);

  // Close whenever the route changes so a link tap never leaves the panel open.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Escape to close, and lock background scrolling while open.
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    // Move focus into the panel for keyboard and screen-reader users.
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
        aria-controls="header-drawer"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#15467d] transition-colors duration-200 hover:bg-[#88a9c3]/15 active:bg-[#88a9c3]/25"
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0 z-[60] bg-[#0d2b4d]/40 backdrop-blur-[2px]"
              aria-hidden="true"
            />

            <motion.div
              key="drawer-panel"
              id="header-drawer"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              tabIndex={-1}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-[70] flex h-dvh w-[86vw] max-w-[360px] flex-col bg-white shadow-2xl outline-none sm:w-[70vw] md:max-w-[400px]"
            >
              {/* Panel header */}
              <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-[#e6edf4] px-5">
                <Logo variant="compact" />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Fechar menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[#15467d] transition-colors duration-200 hover:bg-[#88a9c3]/15"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <nav className="flex flex-col py-2">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={close}
                        aria-current={isActive ? "page" : undefined}
                        className={`font-heading px-5 py-3.5 text-[18px] transition-colors duration-200 ${
                          isActive
                            ? "text-[#88a9c3]"
                            : "text-[#23498d] hover:text-[#88a9c3]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}

                  {isAuth && (
                    <OrdersPopup>
                      <button
                        type="button"
                        onClick={close}
                        className="font-heading w-full px-5 py-3.5 text-left text-[18px] text-[#23498d] transition-colors duration-200 hover:text-[#88a9c3]"
                      >
                        View Order
                      </button>
                    </OrdersPopup>
                  )}
                </nav>

                <div className="border-t border-[#e6edf4] px-5 py-4">
                  <LocationSwitcher variant="mobile" className="w-full" />
                </div>

                <div className="border-t border-[#e6edf4] px-5 py-4">
                  <PhoneLink variant="mobile" className="w-full" />
                </div>
              </div>

              {/* Sticky actions.
                  Only for signed-out visitors: once logged in, the profile menu
                  lives on the header bar where its dropdown has room to open. */}
              {!isAuth && (
                <div className="shrink-0 border-t border-[#e6edf4] px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <div className="flex flex-col gap-2">
                    <LoginButton variant="mobile" />
                    <RegistrationButton variant="mobile" />
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderDrawer;
