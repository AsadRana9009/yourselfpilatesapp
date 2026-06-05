// Header Component Constants

export const PHONE_NUMBER = "927 078 842";
export const PHONE_SUBTITLE = "(Chamada para a rede móvel nacional)";

export const LOGO_CONFIG = {
  src: "/images/Logo.png",
  alt: "YourSelf Pilates",
  mobile: {
    width: 150,
    height: 50,
    className: "h-10 w-auto",
  },
  tablet: {
    width: 200,
    height: 60,
    className: "h-12 w-auto",
  },
  desktop: {
    width: 200,
    height: 60,
    className: "h-12 w-auto md:h-12",
  },
};

// Framer Motion Variants
export const logoMotionVariants = {
  whileHover: { transform: "skewX(-12deg)" },
  transition: { duration: 1.0, ease: "easeOut" },
};
