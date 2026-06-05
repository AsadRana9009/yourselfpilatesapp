"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAuthenticated, onAuthChange } from "@/lib/auth";
import { OrdersPopup } from "@/components/orders/OrdersPopup";

/**
 * Navigation Component
 * Desktop navigation menu with subtle active state highlighting
 */
const Navigation = () => {
  const pathname = usePathname();
  const [isAuth, setIsAuth] = React.useState(false);

  React.useEffect(() => {
    setIsAuth(isAuthenticated());
    const unsubscribe = onAuthChange((status) => setIsAuth(status));
    return unsubscribe;
  }, []);

  const navItems = [
    { name: "Comprar Packs", href: "home#packages-listing" },
    { name: "Agendar Espaço", href: "/agendar-espaco" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contactos", href: "/contactos" },
  ];

  return (
    <nav className="flex items-center space-x-9 text-[19px] font-normal transition-colors duration-200">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-colors duration-200 ${isActive
              ? "text-[#88a9c3]"
              : "text-[#15467d] hover:text-[#88a9c3]"
              }`}
          >
            {item.name}
          </Link>
        );
      })}

      {isAuth && (
        <OrdersPopup>
          <button
            className="text-[#15467d] hover:text-[#88a9c3] transition-colors duration-200"
          >
            View Order
          </button>
        </OrdersPopup>
      )}
    </nav>
  );
};

export default Navigation;
