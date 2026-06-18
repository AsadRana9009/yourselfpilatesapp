"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAuthenticated, onAuthChange } from "@/lib/auth";
import { userApi } from "@/lib/api";
import { OrdersPopup } from "@/components/orders/OrdersPopup";

const Navigation = () => {
  const pathname = usePathname();
  const [isAuth, setIsAuth] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null);
  const [userIsPublic, setUserIsPublic] = React.useState(null);

  const fetchUserRole = async () => {
    if (!isAuthenticated()) return;
    try {
      const data = await userApi.getMe();
      setUserRole(data.role ?? null);
      setUserIsPublic(data.is_public ?? null);
    } catch {
      setUserRole(null);
      setUserIsPublic(null);
    }
  };

  React.useEffect(() => {
    const auth = isAuthenticated();
    setIsAuth(auth);
    if (auth) fetchUserRole();

    const unsubscribe = onAuthChange((status) => {
      setIsAuth(status);
      if (status) {
        fetchUserRole();
      } else {
        setUserRole(null);
        setUserIsPublic(null);
      }
    });
    return unsubscribe;
  }, []);

  // Pro professor (professor, is_public=false) and public student (student, is_public=true) can buy packs.
  // Everyone else who is logged in cannot → hide the nav link for them.
  const isProfessor = userRole === "professor" || userRole === "teacher";
  const isStudent = userRole === "student";
  const canBuyPacks =
    !isAuth ||
    (isProfessor && userIsPublic === false) ||
    (isStudent && userIsPublic === true);

  const allNavItems = [
    { name: "Comprar Packs", href: "home#packages-listing", buyersOnly: true },
    { name: "Agendar Espaço", href: "/agendar-espaco" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contactos", href: "/contactos" },
  ];

  const navItems = allNavItems.filter(
    (item) => !item.buyersOnly || canBuyPacks
  );

  return (
    <nav className="flex items-center space-x-5 text-[19px] font-normal transition-colors duration-200">
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
  <span className="text-[#15467d] hover:text-[#88a9c3] text-[19px] font-normal cursor-pointer">
    View Order
  </span>
</OrdersPopup>
      )}
    </nav>
  );
};

export default Navigation;
