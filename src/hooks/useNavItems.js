"use client";

import { useEffect, useState } from "react";
import { isAuthenticated, onAuthChange } from "@/lib/auth";
import { userApi } from "@/lib/api";

const ALL_NAV_ITEMS = [
  { name: "Comprar Packs", href: "home#packages-listing", buyersOnly: true },
  { name: "Agendar Espaço", href: "/agendar-espaco" },
  { name: "Sobre", href: "/sobre" },
  { name: "Contactos", href: "/contactos" },
];

/**
 * Single source of truth for the header navigation.
 *
 * Both the desktop <Navigation /> and the mobile/tablet drawer read from here so
 * the two menus can never drift apart (they used to hard-code different lists).
 *
 * @returns {{ navItems: Array<{name: string, href: string}>, isAuth: boolean }}
 */
export function useNavItems() {
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userIsPublic, setUserIsPublic] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUserRole = async () => {
      try {
        const data = await userApi.getMe();
        if (cancelled) return;
        setUserRole(data.role ?? null);
        setUserIsPublic(data.is_public ?? null);
      } catch {
        if (cancelled) return;
        setUserRole(null);
        setUserIsPublic(null);
      }
    };

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

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  // Pro professor (professor, is_public=false) and public student (student, is_public=true)
  // can buy packs. Everyone else who is logged in cannot → hide the nav link for them.
  const isProfessor = userRole === "professor" || userRole === "teacher";
  const isStudent = userRole === "student";
  const canBuyPacks =
    !isAuth ||
    (isProfessor && userIsPublic === false) ||
    (isStudent && userIsPublic === true);

  const navItems = ALL_NAV_ITEMS.filter(
    (item) => !item.buyersOnly || canBuyPacks
  );

  return { navItems, isAuth };
}
