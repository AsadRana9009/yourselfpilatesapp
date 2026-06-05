"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ACCESS_CONDITIONS } from "@/constants/PackagesData";
import { pt } from "date-fns/locale";

/**
 * PackageBookingForm Component
 * Simple booking form with calendar for package pages
 * Matches the design with ghost inputs, calendar, and access conditions
 */
const PackageBookingForm = ({ packageData }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    contacto: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateSelect = (dates) => {
    // Limit selection to package sessions
    if (Array.isArray(dates)) {
      setSelectedDates(dates.slice(0, packageData.sessions));
    }
  };

  const calculateTotal = () => {
    const sessionsBooked = selectedDates.length;
    return sessionsBooked * packageData.pricePerSession;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", {
      ...formData,
      dates: selectedDates,
      package: packageData.slug,
      total: calculateTotal(),
    });
  };

  return (
    <div className="w-full bg-[#e6eef4] py-20">
      {" "}
      <div className="mx-auto min-h-screen w-full max-w-4xl px-4 pt-4 pb-16">
        {/* Form Section */}
        <div className="mt-0 pt-2 pb-8 md:pt-4 md:pb-12">
          <h2 className="text-center text-xl font-semibold text-[#15467d] md:text-3xl">
            {packageData.title}
          </h2>
        </div>
        {/* Subheading */}
        <h2 className="font-accent mb-6 text-center text-2xl font-normal text-[#a8bfcf] md:text-5xl">
          Agenda as datas e horas
        </h2>

        {/* Description */}
        <p className="font-heading mb-4 text-center text-base text-[#15467d]">
          {packageData.description}
        </p>

        {/* Price */}
        <p className="mb-8 text-center text-base font-semibold text-[#15467d]">
          Preço: {packageData.pricePerSession}€/sessão
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="flex w-full flex-col items-center">
            <label
              htmlFor="nome"
              className="w-full text-center font-bold text-gray-700"
            >
              Nome
            </label>
            <Input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleInputChange}
              required
              className="w-full max-w-md bg-white text-gray-700"
            />
          </div>

          {/* Contact Input */}
          <div className="flex w-full flex-col items-center">
            <label
              htmlFor="contacto"
              className="w-full text-center font-bold text-gray-700"
            >
              Contacto
            </label>
            <Input
              id="contacto"
              name="contacto"
              type="tel"
              value={formData.contacto}
              onChange={handleInputChange}
              required
              className="w-full max-w-md bg-white text-gray-700"
            />
          </div>

          {/* Email Input */}
          <div className="flex w-full flex-col items-center">
            <label
              htmlFor="email"
              className="w-full text-center font-bold text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full max-w-md bg-white text-gray-700"
            />
          </div>

          {/* Calendar */}
          <div className="flex w-full justify-center">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={handleDateSelect}
              locale={pt}
              className="w-full max-w-md bg-transparent p-0"
              classNames={{
                months: "flex flex-col gap-1",
                month: "flex flex-col gap-5 -mt-8 font-heading text-[#15467d]",
                nav: "flex justify-between items-center p-0 text-[#88a9c3]",
                month_caption: "text-[17px] font-light text-center p-0",
                weekdays:
                  "flex justify-between text-[0.65rem] text-muted-foreground font-sans",
                weekday:
                  "text-[#88a9c3] text-[17px] font-heading font-medium p-0",
                week: "flex justify-between gap-0 mt-1",
                day: "aspect-square text-[0.7rem] text-[#88a9c3] p-0 m-0 flex items-center justify-center",
                today: "bg-transparent text-muted-foreground",
                selected: "bg-sky-900 text-white rounded-sm",
                outside: "text-muted-foreground opacity-50",
                disabled: "text-muted-foreground opacity-30",
              }}
              disabled={(date) => date < new Date()}
            />
          </div>

          {/* Price Total */}
          <div className="text-center">
            <p className="text-lg font-medium text-[#3b3d42]">Preço total:</p>
            <p className="font-heading text-xl font-bold text-[#15467d]">
              € {calculateTotal()}
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="rounded-full border border-[#15467d] bg-transparent px-5 py-6 text-base font-semibold text-[#15467d]"
            >
              Agendar o Espaço
            </Button>
          </div>
        </form>
      </div>
      {/* Access Conditions */}
      <div className="mt-10">
        <h3 className="font-heading mb-6 text-center text-3xl font-bold text-[#15467d]">
          Condições de acesso
        </h3>

        <div className="mx-auto w-full max-w-lg px-4 text-justify text-[13px] leading-relaxed font-normal text-[#15467d] sm:px-6">
          {ACCESS_CONDITIONS.map((condition) => (
            <p key={condition.id} className="mb-2">
              <span className="font-bold text-[#15467d]">{condition.id}.</span>{" "}
              {condition.highlight ? (
                <>
                  {condition.text.split(condition.highlight)[0]}
                  <span className="font-semibold">{condition.highlight}</span>
                  {condition.text.split(condition.highlight)[1]}
                </>
              ) : (
                condition.text
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageBookingForm;
