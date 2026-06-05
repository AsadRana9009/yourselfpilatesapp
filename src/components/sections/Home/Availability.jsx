"use client";

import React from "react";

const LocationPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-8 w-8"
    fill="#8faac1"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
  </svg>
);

const SquareClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-8 w-8"
  >
    <mask id="hands-mask">
      <rect width="24" height="24" fill="white" />
      <line x1="12" y1="12" x2="12" y2="7" stroke="black" strokeWidth="2" />
      <line x1="12" y1="12" x2="15" y2="14" stroke="black" strokeWidth="2" />
    </mask>
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      fill="#8faac1"
      mask="url(#hands-mask)"
    />
  </svg>
);

const Availibility = () => {
  return (
    <div className="mt-20 mb-30 flex flex-col gap-16 px-4 md:flex-row md:justify-center md:gap-40 lg:gap-60">
      {/* Horário */}
      <div className="flex flex-col items-center gap-2 text-center md:-translate-y-6 md:flex-row md:items-start md:gap-x-6 md:text-left lg:-translate-y-10">
        <SquareClockIcon className="h-6 w-6" />
        <div>
          <h3 className="font-accent text-3xl font-light text-[#8faac1] md:text-5xl">
            Horário
          </h3>
          <p className="mt-2 text-[15px] leading-5 font-normal text-[#104c88] md:mt-4">
            Segunda a Sábado <br />
            das 8h às 20h
          </p>
        </div>
      </div>

      {/* Localização */}
      <div className="flex flex-col items-center gap-2 text-center md:translate-y-6 md:flex-row md:items-start md:gap-x-6 md:text-left lg:translate-y-10">
        <LocationPinIcon className="h-6 w-6" />
        <div>
          <h3 className="font-accent text-3xl font-light text-[#8faac1] md:text-5xl">
            Localização
          </h3>
          <p className="mt-2 text-[15px] leading-5 font-normal text-[#104c88] md:mt-4">
            Rua Diário de Notícias nº 09,
            <br />
            2500-107 Caldas da Rainha
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-2 inline-block text-[18px] font-normal text-[#8faac1] underline md:mt-4"
          >
            Ver mapa
          </a>
        </div>
      </div>
    </div>
  );
};

export default Availibility;
