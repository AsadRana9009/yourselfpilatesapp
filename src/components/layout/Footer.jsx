import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PhoneCall, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
      name: "Prazos e Condições de Entrega dos Produtos / Prestação de Serviços",
      href: "/prazos-e-condicoes-de-entrega",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-r from-[#d9e4ee] to-[#c9d7e4]">
      <div className="grid grid-cols-12 px-6">
        {/* Row 1 - Logo */}
        <div className="col-span-12 -mt-10 ml-6 flex justify-start">
          <Link href="/" className="inline-block">
            <Image
              src="/logos/YourSelf-Horizental-logo.png"
              alt="YourSelf Pilates"
              width={350}
              height={120}
              className="h-80 w-full transition-transform duration-500 ease-in-out hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Row 2 - Navigation + Details */}
        <div className="col-span-12 -mt-30 ml-0 grid grid-cols-1 justify-items-center gap-10 text-center md:ml-30 md:grid-cols-12 md:justify-start md:justify-items-start">
          <div className="col-span-6">
            <nav className="mt-10 flex flex-col items-center space-y-3 text-right md:ml-4 md:items-start">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary w-fit text-2xl font-normal text-[#15467d] transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="col-span-6">
            <div className="mt-10 grid grid-cols-1 justify-items-center gap-6 text-center text-[#15467d] md:justify-items-start md:text-start xl:grid-cols-2">
              {/* Row 1 - Atendimento / Phone */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold">Atendimento</h3>
              </div>
              <div className="space-y-1">
                <div className="flex items-start space-x-2">
                  <PhoneCall className="mt-1 h-4 w-4 shrink-0 text-[#15467d]" />
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-lg font-normal tracking-wide text-[#15467d]">
                      927&nbsp;078&nbsp;842
                    </span>
                    <span className="text-xs text-[#15467d]">
                      (Chamada para a rede móvel nacional)
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2 - Horário / Details */}
              <div className="w-50 space-y-2 md:w-30">
                <h3 className="text-base font-semibold">
                  Horário e Localização
                </h3>
              </div>
              <div className="space-y-4 text-base leading-snug">
                <div>
                  <p>Segunda a Sábado</p>
                  <p>das 8h às 20h</p>
                </div>
                <div>
                  <p>Rua Diário de Notícias nº 09, 2500-107</p>
                  <p>Caldas da Rainha</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3 - Social & Legal */}
        <div className="col-span-12 mt-20 mb-20 ml-0 grid grid-cols-1 justify-items-center gap-14 lg:ml-20 lg:gap-4 xl:mt-50 xl:grid-cols-2 xl:items-end xl:justify-items-start">
          {/* Column 1 - Social Media */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-normal text-[#15467d]">
              Redes Sociais
            </span>
            <a
              href="https://www.instagram.com/yourselfpilates/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#15467d] text-white transition hover:opacity-80"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>

          {/* Column 2 - Legal Links & Copyright */}
          <div className="flex flex-col items-center gap-2 text-center lg:text-right xl:items-end">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3 sm:gap-y-1 xl:justify-end">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#15467d] transition hover:opacity-80 sm:whitespace-nowrap"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="w-50 text-xs text-[#15467d] transition hover:opacity-80 sm:whitespace-nowrap md:w-auto"
                    >
                      {link.name}
                    </Link>
                  )}
                  {index < legalLinks.length - 1 && (
                    <span className="mx-0 hidden text-[#15467d]/50 sm:inline">
                      |
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-1 text-center">
              <p className="w-50 text-xs text-[#15467d] md:w-auto md:text-sm">
                © {currentYear} – All rights Reserved. Powered by:{" "}
                <a
                  href="https://oonify.pt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-medium text-[#15467d] transition hover:opacity-80"
                >
                  OONIFY
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
