"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const RegistrationModal = ({
  open,
  onOpenChange,
  onRegister,
  initialRole = null,
}) => {
  const [step, setStep] = useState("role");

  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    password: "",
    confirmPassword: "",
    contact: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const countryCode =
    typeof window !== "undefined"
      ? Intl.DateTimeFormat()
          .resolvedOptions()
          .locale.split("-")[1]
          ?.toLowerCase() || "us"
      : "us";

  useEffect(() => {
    if (open && initialRole) {
      setStep(initialRole);
    } else if (open) {
      setStep("role");
    }
  }, [open, initialRole]);

  const handleSelectRole = (role) => {
    setStep(role);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleStudentSubmit = (e) => {
    if (e) e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password must be the same.");
      return;
    }

    setError("");

    onRegister?.({
      role: "student",
      ...formData,
    });

    resetAndClose();
  };

  const resetAndClose = () => {
    setStep("role");

    setFormData({
      email: "",
      fullname: "",
      password: "",
      confirmPassword: "",
      contact: "",
    });

    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#15467d]">
            Registration
          </DialogTitle>

          <DialogDescription>
            {step === "role"
              ? "Select how you want to register"
              : `Register as ${step}`}
          </DialogDescription>
        </DialogHeader>

        {step === "student" && (
          <form onSubmit={handleStudentSubmit} className="space-y-4">
            <label className="text-sm font-medium text-[#15467d]">Email</label>
            <Input
              name="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
            />

            <label className="text-sm font-medium text-[#15467d]">
              Full Name
            </label>
            <Input
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
            />

            <label className="text-sm font-medium text-[#15467d]">
              Password
            </label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label className="text-sm font-medium text-[#15467d]">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pr-10"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <label className="text-sm font-medium text-[#15467d]">
              Contact
            </label>
            <Input
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
            />

            <div className="flex gap-2"></div>
          </form>
        )}

        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            onClick={handleStudentSubmit}
            className="w-full cursor-pointer rounded-full bg-[#398ffc] px-6 py-2 text-base font-normal text-white transition-all duration-200 hover:bg-[#2878dc] sm:w-auto"
          >
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
