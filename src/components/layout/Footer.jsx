import Link from "next/link";
import { Clock, MapPin, PhoneCall } from "lucide-react";

const COLORS = {
  surface: "#d7e3ed",
  brand: "#15467d",
  brandHover: "#0f365f",
  brandForeground: "#ffffff",
};

function InstagramIcon({ className }) {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const navigationLinks = [
  { name: "Agendar Espaço", href: "/agendar-espaco" },
  { name: "Sobre", href: "/sobre" },
  { name: "Contactos", href: "/contactos" },
];

const legalLinks = [
  { name: "Livro de Reclamações", href: "#" },
  { name: "Política de Privacidade", href: "/politica-de-privacidade" },
  { name: "Termos e Condições", href: "/termos-e-condicoes" },
  {
    name: "Resolução de Litígios",
    href: "https://justica.gov.pt/Resolucao-de-litigios",
    external: true,
  },
  {
    name: "Prazos e Condições de Entrega",
    href: "/prazos-e-condicoes-de-entrega",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: COLORS.surface, color: COLORS.brand }}>
      <div className="mx-auto max-w-7xl px-6 py-12 text-center sm:px-8 sm:text-left lg:px-12 lg:py-16">

        {/* MAIN GRID (FIXED FOR TABLET) */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-12 md:w-full">

          {/* BRAND */}
<div className="flex flex-col items-start md:items-center md:text-center gap-5 text-left sm:col-span-2 md:col-span-3 lg:col-span-1 lg:items-start lg:text-left">     
         <Link href="/" className="text-2xl font-semibold tracking-tight transition-opacity hover:opacity-80">
              Yourself Pilates
            </Link>

            <p className="max-w-xs text-sm leading-relaxed opacity-85">
              Estúdio de Pilates em Caldas da Rainha, pensado para treinos,
              aulas e utilização profissional do espaço.
            </p>

            <a
              href="https://www.instagram.com/yourselfpilates/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: COLORS.brand,
                color: COLORS.brandForeground,
              }}
            >
              <InstagramIcon className="h-4 w-4" />
              Redes Sociais
            </a>
          </div>

          {/* MENU (TABLET FIXED WIDTH) */}
          <nav aria-label="Footer" className="text-left md:w-full lg:ml-20">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] opacity-70 ">
              Menu
            </h3>

            <ul className="flex flex-col items-start gap-3 pl-0 sm:items-start">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base font-medium transition-opacity hover:opacity-70 hover:underline hover:underline-offset-4"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CONTACT (TABLET FIXED WIDTH) */}
          <div className="text-left md:w-full">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] opacity-70">
              Atendimento
            </h3>

            <div className="flex w-full flex-col items-start space-y-4 text-left text-sm leading-relaxed">

              <a
                href="tel:927078842"
                className="flex items-start gap-2.5 transition-opacity hover:opacity-70"
              >
                <PhoneCall className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  <span className="block font-semibold">927 078 842</span>
                  <span className="block opacity-80">
                    Chamada para a rede móvel nacional
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  <span className="block font-semibold">Segunda a Sábado</span>
                  <span className="block opacity-80">das 8h às 20h</span>
                </span>
              </div>

            </div>
          </div>

          {/* LOCATION (TABLET FIXED WIDTH) */}
          <div className="text-left md:w-full">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] opacity-70">
              Localização
            </h3>

            <div className="flex items-start justify-start gap-2.5 text-sm leading-relaxed sm:justify-start">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <address className="not-italic">
                Rua Diário de Notícias nº 09
                <br />
                2500-107 Caldas da Rainha
              </address>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div
          className="mt-12 border-t pt-6"
          style={{ borderColor: "rgba(21,70,125,0.15)" }}
        >
          <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs lg:justify-start">
              {legalLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-70 hover:underline hover:underline-offset-4"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition-opacity hover:opacity-70 hover:underline hover:underline-offset-4"
                  >
                    {link.name}
                  </Link>
                ),
              )}
            </div>

            <p className="text-xs opacity-75">
              {"© "}
              {currentYear} Yourself Pilates. Powered by{" "}
              <a
                href="https://oonify.pt/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline-offset-4 hover:underline"
                style={{ color: COLORS.brandHover }}
              >
                OONIFY
              </a>
            </p>

          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;