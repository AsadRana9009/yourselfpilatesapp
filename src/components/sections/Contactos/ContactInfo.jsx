"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneIcon } from "@/components/icons/CustomIcons";
import { CONTACT_INFO } from "@/constants/ContactInfo";

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52.926"
    height="40.326"
    viewBox="0 0 52.926 40.326"
    className="h-12 w-12"
  >
    <path
      d="M47.295,0H5.635A5.444,5.444,0,0,0,0,5.234v31.78a3.248,3.248,0,0,0,2.157,3l.161.064a3.7,3.7,0,0,0,3.813-.7l5.228-4.856a8.342,8.342,0,0,1,5.663-2.176H47.294a5.443,5.443,0,0,0,5.632-5.231V5.235A5.443,5.443,0,0,0,47.295,0M40.548,22.127H10.892V19.153H40.548a1.487,1.487,0,0,1,0,2.974m0-9.885H10.892V9.268H40.548a1.487,1.487,0,0,1,0,2.974"
      fill="#88a9c3"
    />
  </svg>
);

const ContactInfo = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const textColor = "#15467d";
  const iconColor = "#88a9c3";
  const fontFamily = "var(--font-accent)";

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2"
        >
          {/* Phone Contact Box */}
          <motion.div
            variants={itemVariants}
            className="flex min-h-[220px] w-full items-center rounded-[17px] bg-gradient-to-br from-[#e8eff3] to-[#e9ecef] p-12"
          >
            {" "}
            <a
              href={`tel:${CONTACT_INFO.phone.formatted}`}
              className="group mx-auto flex items-center space-x-6"
            >
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center">
                  <PhoneIcon
                    className="h-full w-full"
                    style={{ color: iconColor }}
                  />
                </div>
              </div>
              <div className="flex-1 text-left" style={{ fontFamily }}>
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ color: textColor }}
                >
                  {CONTACT_INFO.phone.label}
                </h3>
                <p
                  className="mb-1 text-2xl font-bold"
                  style={{ color: textColor }}
                >
                  {CONTACT_INFO.phone.number}
                </p>
                <p className="text-xs" style={{ color: textColor }}>
                  {CONTACT_INFO.phone.note}
                </p>
              </div>
            </a>
          </motion.div>

          {/* Email Contact Box */}
          <motion.div
            variants={itemVariants}
            className="flex min-h-[220px] w-full items-center rounded-[17px] bg-gradient-to-br from-[#e8eff3] to-[#e9ecef] p-12"
          >
            {" "}
            <a
              href={`mailto:${CONTACT_INFO.email.address}`}
              className="group mx-auto flex items-center space-x-6"
            >
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center">
                  <EmailIcon />
                </div>
              </div>
              <div className="flex-1 text-left" style={{ fontFamily }}>
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ color: textColor }}
                >
                  {CONTACT_INFO.email.label}
                </h3>
                <p
                  className="text-2xl font-bold break-all"
                  style={{ color: textColor }}
                >
                  {CONTACT_INFO.email.address}
                </p>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;
