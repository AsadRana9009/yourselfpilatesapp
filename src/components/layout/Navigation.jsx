"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavItems } from "@/hooks/useNavItems";
import { OrdersPopup } from "@/components/orders/OrdersPopup";

/**
 * Desktop (xl+) inline navigation.
 * Small screens use <HeaderDrawer /> instead; both read the same nav items.
 */
const Navigation = () => {
  const pathname = usePathname();
  const { navItems, isAuth } = useNavItems();

  return (
    <nav className="flex items-center space-x-5 text-[19px] font-normal whitespace-nowrap transition-colors duration-200">
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
          <span className="cursor-pointer text-[19px] font-normal text-[#15467d] hover:text-[#88a9c3]">
            View Order
          </span>
        </OrdersPopup>
      )}
    </nav>
  );
};

export default Navigation;
