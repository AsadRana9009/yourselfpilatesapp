"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { studentApi, regionsApi } from "@/lib/api";
import { storeLoginRegion } from "@/lib/auth";
import { MapPin, ChevronDown } from "lucide-react";

const RegisterModal = ({ open, onOpenChange, onOpenLogin }) => {
  const [step, setStep] = useState("register"); // "register" | "verify"
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    contact_number: "",
    password: "",
    confirm_password: "",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  useEffect(() => {
    if (open) regionsApi.getRegions().then(setRegions).catch(() => {});
  }, [open]);

  useEffect(() => {
    if (!regionDropdownOpen) return;
    const handler = (e) => {
      if (!e.target.closest("[data-reg-region-dropdown]")) setRegionDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [regionDropdownOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    setInfo("");
    try {
      await studentApi.register({
        ...formData,
        ...(selectedRegion ? { region: selectedRegion.id } : {}),
      });
      setInfo("Account created! Check your email for a verification code.");
      setStep("verify");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");
    try {
      await studentApi.verifyEmail(formData.email, otp);
      setInfo("Email verified! You can now log in.");
      // Persist region so LoginModal can pre-select it
      if (selectedRegion) storeLoginRegion(selectedRegion);
      setTimeout(() => {
        resetAndClose();
        onOpenLogin?.();
      }, 1500);
    } catch (err) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setFormData({ full_name: "", email: "", contact_number: "", password: "", confirm_password: "" });
    setOtp("");
    setSelectedRegion(null);
    setRegionDropdownOpen(false);
    setStep("register");
    setError("");
    setInfo("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white text-[#3b3d42] dark:bg-[#0b1220] dark:text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#15467d] dark:text-slate-100">
            {step === "register" ? "Create Account" : "Verify Email"}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600 dark:text-slate-300">
            {step === "register"
              ? "Fill in your details to create a new account."
              : "Enter the verification code sent to your email."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={step === "register" ? handleRegister : handleVerify} className="space-y-4">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-900/40 dark:bg-red-950/40">
              <p className="text-sm text-red-600 dark:text-red-200">{error}</p>
            </div>
          )}
          {info && (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/40 dark:bg-emerald-950/40">
              <p className="text-sm text-emerald-700 dark:text-emerald-200">{info}</p>
            </div>
          )}

          {step === "register" ? (
            <>
              <FormField id="full_name" name="full_name" type="text" label="Full Name" placeholder="Your full name" value={formData.full_name} onChange={handleChange} disabled={loading} required />
              <FormField id="email" name="email" type="email" label="Email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} disabled={loading} required />
              <FormField id="contact_number" name="contact_number" type="tel" label="Contact Number" placeholder="+351 000 000 000" value={formData.contact_number} onChange={handleChange} disabled={loading} required />
              <FormField id="password" name="password" type="password" label="Password" placeholder="Min. 8 characters" value={formData.password} onChange={handleChange} disabled={loading} required />
              <FormField id="confirm_password" name="confirm_password" type="password" label="Confirm Password" placeholder="Repeat your password" value={formData.confirm_password} onChange={handleChange} disabled={loading} required />

              {regions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#15467d] dark:text-slate-200">
                    Region
                  </label>
                  <div className="relative" data-reg-region-dropdown>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setRegionDropdownOpen((v) => !v)}
                      className="flex h-12 w-full items-center justify-between rounded-md border-2 border-[#c8d4e0] bg-white px-3 text-base text-[#3b3d42] transition-colors hover:border-[#88a9c3] disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-[#0f172a] dark:text-slate-100"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-sky-400" />
                        {selectedRegion ? selectedRegion.name : "Select a region (optional)"}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-[#8b9daf] transition-transform duration-200 ${regionDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {regionDropdownOpen && (
                      <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-md border border-[#c8d4e0] bg-white shadow-lg dark:border-slate-600 dark:bg-[#0f172a]">
                        <button
                          type="button"
                          onClick={() => { setSelectedRegion(null); setRegionDropdownOpen(false); }}
                          className={`flex w-full items-center gap-2 px-3 py-2.5 text-sm transition-colors hover:bg-sky-50 dark:hover:bg-slate-800 ${!selectedRegion ? "font-semibold text-[#15467d] bg-sky-50 dark:bg-slate-800" : "text-[#3b3d42] dark:text-slate-300"}`}
                        >
                          <MapPin className="h-3.5 w-3.5 text-sky-400" />
                          No region preference
                        </button>
                        {regions.map((region) => (
                          <button
                            key={region.id}
                            type="button"
                            onClick={() => { setSelectedRegion(region); setRegionDropdownOpen(false); }}
                            className={`flex w-full items-center gap-2 border-t border-[#e8f0f7] px-3 py-2.5 text-sm transition-colors hover:bg-sky-50 dark:border-slate-700 dark:hover:bg-slate-800 ${selectedRegion?.id === region.id ? "font-semibold text-[#15467d] bg-sky-50 dark:bg-slate-800" : "text-[#3b3d42] dark:text-slate-300"}`}
                          >
                            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${selectedRegion?.id === region.id ? "bg-sky-900 text-white" : "bg-sky-100 text-sky-600"}`}>
                              {region.name.charAt(0).toUpperCase()}
                            </span>
                            {region.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <FormField id="otp" name="otp" type="text" label="Verification Code" placeholder="Enter code" value={otp} onChange={(e) => setOtp(e.target.value)} disabled={loading} required />
          )}

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={resetAndClose}
              disabled={loading}
              className="w-full rounded-full border-2 border-[#15467d] px-6 py-2 text-base font-normal text-[#15467d] transition-all duration-200 hover:border-[#88a9c3] hover:bg-[#88a9c3] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-500 dark:text-slate-100 dark:hover:border-slate-400 dark:hover:bg-slate-700 sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#398ffc] px-6 py-2 text-base font-normal text-white transition-all duration-200 hover:bg-[#2878dc] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading
                ? step === "register" ? "Creating..." : "Verifying..."
                : step === "register" ? "Register" : "Verify Email"}
            </Button>
          </DialogFooter>

          {step === "register" && (
            <p className="text-center text-sm text-gray-500 dark:text-slate-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => { resetAndClose(); onOpenLogin?.(); }}
                className="font-medium text-[#15467d] underline-offset-4 hover:underline dark:text-slate-200"
              >
                Login
              </button>
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

const FormField = ({ id, name, type, label, placeholder, value, onChange, disabled, required }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-[#15467d] dark:text-slate-200">
      {label}
    </label>
    <Input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className="h-12 w-full border-2 border-[#c8d4e0] bg-white text-base text-[#3b3d42] placeholder:text-[#8b9daf] focus:border-[#88a9c3] focus:ring-2 focus:ring-[#88a9c3]/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-[#0f172a] dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-slate-400 dark:focus:ring-slate-400/20"
    />
  </div>
);

export default RegisterModal;
