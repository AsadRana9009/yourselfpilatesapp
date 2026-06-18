"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { studentApi, regionsApi } from "@/lib/api";
import { storeAuthData } from "@/lib/auth";

function generateStrongPassword() {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const special = "!@#$%^&*";
  const all = upper + lower + digits + special;
  const pick = (s) => s[Math.floor(Math.random() * s.length)];
  const chars = [pick(upper), pick(lower), pick(digits), pick(special)];
  for (let i = 4; i < 14; i++) chars.push(pick(all));
  return chars.sort(() => Math.random() - 0.5).join("");
}

// ─── helpers ────────────────────────────────────────────────────────────────

const FormField = ({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  rightAddon,
}) => (
  <div className="space-y-1">
    <label
      htmlFor={id}
      className="text-sm font-medium text-[#15467d]"
    >
      {label}
    </label>
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="h-12 w-full border-2 border-[#c8d4e0] bg-white text-base text-[#3b3d42] placeholder:text-[#8b9daf] focus:border-[#88a9c3] focus:ring-2 focus:ring-[#88a9c3]/20 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
      />
      {rightAddon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {rightAddon}
        </span>
      )}
    </div>
  </div>
);

// ─── main component ──────────────────────────────────────────────────────────

const RegistrationModal = ({ open, onOpenChange, onRegister, initialRole = null }) => {
  // step: "role" | "student" | "verify" | "success"
  const [step, setStep] = useState("role");
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    password: "",
    confirmPassword: "",
    contact_number: "",
    region: "",
  });
  const [regions, setRegions] = useState([]);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pwCopied, setPwCopied] = useState(false);

  const handleSuggestPassword = () => {
    const pw = generateStrongPassword();
    setFormData((prev) => ({ ...prev, password: pw, confirmPassword: pw }));
    setShowPassword(true);
    setShowConfirmPassword(true);
    navigator.clipboard?.writeText(pw).then(() => {
      setPwCopied(true);
      setTimeout(() => setPwCopied(false), 2000);
    });
  };
  const resendTimerRef = useRef(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (open && initialRole) {
      setStep(initialRole);
    } else if (open) {
      setStep("role");
    }
  }, [open, initialRole]);

  useEffect(() => {
    if (open) {
      regionsApi.getRegions().then(setRegions).catch(() => setRegions([]));
    }
  }, [open]);

  // countdown for resend button
  useEffect(() => {
    if (resendCooldown <= 0) return;
    resendTimerRef.current = setTimeout(
      () => setResendCooldown((v) => v - 1),
      1000
    );
    return () => clearTimeout(resendTimerRef.current);
  }, [resendCooldown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  // ── Step 1: submit registration ──────────────────────────────────────────
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!formData.email || !formData.full_name || !formData.password || !formData.contact_number) {
      setError("Please fill in all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password must match.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!/^\+\d{8,15}$/.test(formData.contact_number.replace(/\s/g, ""))) {
      setError("Phone number must be in international format, e.g. +351912345678");
      return;
    }

    setLoading(true);
    try {
      await studentApi.register({
        email: formData.email,
        full_name: formData.full_name,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        contact_number: formData.contact_number,
        region: formData.region ? Number(formData.region) : undefined,
      });
      setInfo("Verification code sent to your email.");
      setResendCooldown(60);
      setStep("verify");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: verify OTP ───────────────────────────────────────────────────
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (!otp.trim()) {
      setError("Please enter the verification code.");
      return;
    }

    setLoading(true);
    try {
      const data = await studentApi.verifyEmail(formData.email, otp.trim());
      storeAuthData(data);
      onRegister?.(data);
      setStep("success");
    } catch (err) {
      setError(err.message || "Invalid or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Resend OTP ───────────────────────────────────────────────────────────
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || resendLoading) return;
    setResendLoading(true);
    setError("");
    setInfo("");
    try {
      await studentApi.resendOtp(formData.email);
      setInfo("A new verification code has been sent to your email.");
      setResendCooldown(60);
    } catch (err) {
      setError(err.message || "Failed to resend code. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const resetAndClose = () => {
    setStep("role");
    setFormData({ email: "", full_name: "", password: "", confirmPassword: "", contact_number: "", region: "" });
    setOtp("");
    setError("");
    setInfo("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setResendCooldown(0);
    onOpenChange(false);
  };

  // ── title / description by step ──────────────────────────────────────────
  const titles = {
    role: "Registration",
    student: "Register as student",
    verify: "Verify your email",
    success: "Welcome!",
  };
  const descriptions = {
    role: "Select how you want to register",
    student: "Fill in your details to create an account",
    verify: `Enter the 6-digit code sent to ${formData.email}`,
    success: "Your account has been verified. You are now logged in.",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#15467d]">
            {titles[step] ?? "Registration"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {descriptions[step]}
          </DialogDescription>
        </DialogHeader>

        {/* ── role selector ── */}
        {step === "role" && (
          <div className="flex gap-3 mt-2">
            <Button
              onClick={() => setStep("student")}
              className="flex-1 rounded-full bg-[#398ffc] text-white hover:bg-[#2878dc]"
            >
              As Student
            </Button>
          </div>
        )}

        {/* ── registration form ── */}
        {step === "student" && (
          <form onSubmit={handleStudentSubmit} className="space-y-3 mt-1">
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <FormField
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <FormField
              id="full_name"
              name="full_name"
              label="Full Name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
              disabled={loading}
              required
            />

            <div>
              <FormField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
                rightAddon={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              <button
                type="button"
                onClick={handleSuggestPassword}
                disabled={loading}
                className="mt-1 flex items-center gap-1 text-xs font-medium text-[#398ffc] hover:text-[#2878dc] disabled:opacity-50"
              >
                <RefreshCw size={11} />
                {pwCopied ? "Copied to clipboard!" : "Suggest a strong password"}
              </button>
            </div>

            <FormField
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              placeholder="Repeat password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              required
              rightAddon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="focus:outline-none"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <div className="space-y-1">
              <FormField
                id="contact_number"
                name="contact_number"
                label="Contact"
                placeholder="+351912345678"
                value={formData.contact_number}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <p className="text-xs text-gray-400">
                International format required, e.g. +351912345678
              </p>
            </div>

            {regions.length > 0 && (
              <div className="space-y-1">
                <label htmlFor="region" className="text-sm font-medium text-[#15467d]">
                  Region
                </label>
                <div className="relative">
                  <select
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-12 w-full rounded-md border-2 border-[#c8d4e0] bg-white px-3 text-sm text-[#3b3d42] appearance-none focus:border-[#88a9c3] focus:outline-none focus:ring-2 focus:ring-[#88a9c3]/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select your region</option>
                    {regions.filter((r) => r.is_active).map((r) => (
                      <option key={r.id} value={String(r.id)}>{r.name}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </span>
                </div>
              </div>
            )}

            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={resetAndClose}
                disabled={loading}
                className="w-full rounded-full border-2 border-[#15467d] px-6 py-2 text-[#15467d] hover:bg-[#88a9c3] hover:text-white hover:border-[#88a9c3] sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#398ffc] px-6 py-2 text-white hover:bg-[#2878dc] disabled:opacity-50 sm:w-auto"
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {/* ── OTP verification ── */}
        {step === "verify" && (
          <form onSubmit={handleVerifySubmit} className="space-y-4 mt-1">
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            {info && (
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-sm text-emerald-700">{info}</p>
              </div>
            )}

            <div className="space-y-1">
              <label htmlFor="otp" className="text-sm font-medium text-[#15467d]">
                Verification Code
              </label>
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => { setOtp(e.target.value); if (error) setError(""); }}
                disabled={loading}
                maxLength={6}
                className="h-12 w-full border-2 border-[#c8d4e0] text-center text-xl tracking-[0.4em] focus:border-[#88a9c3] focus:ring-2 focus:ring-[#88a9c3]/20"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || resendLoading}
                className="text-sm font-medium text-[#15467d] underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                {resendCooldown > 0
                  ? `Resend code in ${resendCooldown}s`
                  : resendLoading
                  ? "Sending..."
                  : "Resend code"}
              </button>
            </div>

            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => { setStep("student"); setError(""); setInfo(""); }}
                disabled={loading}
                className="w-full rounded-full border-2 border-[#15467d] px-6 py-2 text-[#15467d] hover:bg-[#88a9c3] hover:text-white hover:border-[#88a9c3] sm:w-auto"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#398ffc] px-6 py-2 text-white hover:bg-[#2878dc] disabled:opacity-50 sm:w-auto"
              >
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {/* ── success ── */}
        {step === "success" && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <svg
                className="h-8 w-8 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-center text-gray-600">
              Your account has been successfully created and verified.
              You are now logged in!
            </p>
            <Button
              onClick={resetAndClose}
              className="rounded-full bg-[#398ffc] px-8 py-2 text-white hover:bg-[#2878dc]"
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
