"use client";

import React from "react";
import { motion } from "framer-motion";
import { CONTACT_INFO } from "@/constants/ContactInfo";

const LocationPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-8 w-8 text-[#88a9c3]"
    fill="currentColor"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
  </svg>
);

const ContactLocation = ({ showTitle = true, firstLine, secondLine }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // default title lines if not passed
  const defaultFirstLine = "Localizada no centro";
  const defaultSecondLine = "das Caldas da Rainha";

  return (
    <section
      className="bg-white py-12 md:py-16"
      style={{ fontFamily: "var(--font-accent)" }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-6xl space-y-8"
        >
          {showTitle && (
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center space-y-2"
            >
              <LocationPinIcon />
              <h2 className="text-center text-4xl text-[#88a9c3] md:text-5xl">
                {firstLine || defaultFirstLine}
              </h2>
              <h2 className="text-center text-4xl text-[#88a9c3] md:text-5xl">
                {secondLine || defaultSecondLine}
              </h2>
            </motion.div>
          )}

          <motion.div
            variants={itemVariants}
            className="map-container h-[300px] w-full overflow-hidden rounded-[26px] shadow-lg sm:h-[200px] md:h-[400px]"
          >
            <iframe
              src={CONTACT_INFO.maps.embedUrl}
              title={CONTACT_INFO.maps.label}
              aria-label={CONTACT_INFO.maps.label}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Address Text Below Map*/}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="font-heading text-sm font-normal text-[#15467d] md:text-base">
              {CONTACT_INFO.address.fullAddress}
            </h3>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactLocation;
