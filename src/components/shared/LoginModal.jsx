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
import { authApi } from "@/lib/api";
import { storeAuthData } from "@/lib/auth";

const LoginModal = ({ open, onOpenChange, onLogin }) => {
    const [view, setView] = useState("login"); // "login" | "forgot"
    const [resetStep, setResetStep] = useState("request"); // "request" | "verify" | "reset" | "done"
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [resetData, setResetData] = useState({
        email: "",
        otp: "",
        new_password: "",
        confirm_password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");

    // Auto-redirect to login after success
    useEffect(() => {
        if (resetStep === "done") {
            const timer = setTimeout(() => {
                backToLogin();
            }, 2000); // Redirect after 2 seconds
            return () => clearTimeout(timer);
        }
    }, [resetStep]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (error) setError("");
        if (info) setInfo("");
    };

    const handleResetChange = (e) => {
        const { name, value } = e.target;
        setResetData((prev) => ({ ...prev, [name]: value }));
        if (error) setError("");
        if (info) setInfo("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setInfo("");

        try {
            const authData = await authApi.login(formData.email, formData.password);
            storeAuthData(authData);
            onLogin?.(authData);
            resetAndClose();
        } catch (err) {
            setError(
                err.message || "Erro ao fazer login. Por favor, tente novamente."
            );
        } finally {
            setLoading(false);
        }
    };

    const openForgotPassword = () => {
        const prefillEmail = formData.email?.trim() || resetData.email?.trim() || "";
        setView("forgot");
        setResetStep("request");
        setError("");
        setInfo("");
        setResetData((prev) => ({
            ...prev,
            email: prefillEmail,
            otp: "",
            new_password: "",
            confirm_password: "",
        }));
    };

    const backToLogin = () => {
        setView("login");
        setError("");
        setInfo("");
        setResetStep("request");
        setResetData({ email: "", otp: "", new_password: "", confirm_password: "" });
    };

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        const email = resetData.email.trim();
        if (!email) {
            setError("Por favor, introduza o seu email.");
            return;
        }

        setLoading(true);
        setError("");
        setInfo("");
        try {
            const res = await authApi.requestResetOtp(email);
            setInfo(res?.message || "Enviámos um OTP para o seu email.");
            setResetStep("verify");
        } catch (err) {
            setError(err.message || "Não foi possível enviar o OTP. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmOtp = async (e) => {
        e.preventDefault();
        const email = resetData.email.trim();
        const otp = resetData.otp.trim();
        if (!email) {
            setError("Por favor, introduza o seu email.");
            return;
        }
        if (!otp) {
            setError("Por favor, introduza o OTP.");
            return;
        }

        setLoading(true);
        setError("");
        setInfo("");
        try {
            const res = await authApi.confirmResetOtp(email, otp);
            if (res?.success) {
                setInfo("OTP verificado com sucesso. Agora defina uma nova palavra-passe.");
                setResetStep("reset");
            } else {
                setError("OTP inválido. Verifique e tente novamente.");
            }
        } catch (err) {
            setError(err.message || "Não foi possível confirmar o OTP. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const email = resetData.email.trim();
        const otp = resetData.otp.trim();
        const new_password = resetData.new_password;
        const confirm_password = resetData.confirm_password;

        if (!email) {
            setError("Por favor, introduza o seu email.");
            return;
        }
        if (!otp) {
            setError("Por favor, introduza o OTP.");
            return;
        }
        if (!new_password || new_password.length < 8) {
            setError("A nova palavra-passe deve ter pelo menos 8 caracteres.");
            return;
        }
        if (new_password !== confirm_password) {
            setError("As palavras-passe não coincidem.");
            return;
        }

        setLoading(true);
        setError("");
        setInfo("");
        try {
            const res = await authApi.resetPasswordWithOtp(email, otp, new_password);
            setInfo(
                res?.message ||
                "A sua palavra-passe foi alterada com sucesso. Pode fazer login agora."
            );
            setResetStep("done");
            setFormData((prev) => ({ ...prev, email }));
        } catch (err) {
            setError(err.message || "Não foi possível alterar a palavra-passe. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const resetAndClose = () => {
        setFormData({ email: "", password: "" });
        setView("login");
        setResetStep("request");
        setResetData({ email: "", otp: "", new_password: "", confirm_password: "" });
        setError("");
        setInfo("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white text-[#3b3d42] dark:bg-[#0b1220] dark:text-slate-100">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-[#15467d] dark:text-slate-100">
                        {view === "login" ? "Login" : "Recuperar palavra-passe"}
                    </DialogTitle>
                    <DialogDescription className="text-base text-gray-600 dark:text-slate-300">
                        {view === "login"
                            ? "Entre com o seu email e palavra-passe para aceder à sua conta."
                            : resetStep === "request"
                                ? "Vamos enviar um OTP para o seu email."
                                : resetStep === "verify"
                                    ? "Introduza o OTP que recebeu por email."
                                    : resetStep === "reset"
                                        ? "Defina a sua nova palavra-passe."
                                        : "A sua palavra-passe foi redefinida."}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={
                        view === "login"
                            ? handleSubmit
                            : resetStep === "request"
                                ? handleRequestOtp
                                : resetStep === "verify"
                                    ? handleConfirmOtp
                                    : resetStep === "reset"
                                        ? handleResetPassword
                                        : (e) => e.preventDefault()
                    }
                    className="space-y-4"
                >
                    {error && (
                        <div className="rounded-md border border-red-200 bg-red-50 p-3 dark:border-red-900/40 dark:bg-red-950/40">
                            <p className="text-sm text-red-600 dark:text-red-200">{error}</p>
                        </div>
                    )}

                    {info && (
                        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/40 dark:bg-emerald-950/40">
                            <p className="text-sm text-emerald-700 dark:text-emerald-200">
                                {info}
                            </p>
                        </div>
                    )}

                    {view === "login" ? (
                        <>
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
                                id="password"
                                name="password"
                                type="password"
                                label="Palavra-passe"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />

                            <div className="-mt-2 flex justify-end">
                                <button
                                    type="button"
                                    onClick={openForgotPassword}
                                    disabled={loading}
                                    className="text-sm font-medium text-[#15467d] underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-200"
                                >
                                    Esqueceu-se da palavra-passe?
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {resetStep !== "reset" && resetStep !== "done" && (
                                <FormField
                                    id="reset_email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    placeholder="seu@email.com"
                                    value={resetData.email}
                                    onChange={handleResetChange}
                                    disabled={loading || resetStep === "done"}
                                    required
                                />
                            )}

                            {resetStep === "verify" && (
                                <FormField
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    label="OTP"
                                    placeholder="1234"
                                    value={resetData.otp}
                                    onChange={handleResetChange}
                                    disabled={loading || resetStep === "done"}
                                    required
                                />
                            )}

                            {resetStep === "reset" && (
                                <>
                                    <FormField
                                        id="new_password"
                                        name="new_password"
                                        type="password"
                                        label="Nova palavra-passe"
                                        placeholder="Mínimo 8 caracteres"
                                        value={resetData.new_password}
                                        onChange={handleResetChange}
                                        disabled={loading}
                                        required
                                    />
                                    <FormField
                                        id="confirm_password"
                                        name="confirm_password"
                                        type="password"
                                        label="Confirmar palavra-passe"
                                        placeholder="Repita a nova palavra-passe"
                                        value={resetData.confirm_password}
                                        onChange={handleResetChange}
                                        disabled={loading}
                                        required
                                    />
                                </>
                            )}

                            {resetStep === "verify" && (
                                <div className="-mt-2 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleRequestOtp}
                                        disabled={loading}
                                        className="text-sm font-medium text-[#15467d] underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-200"
                                    >
                                        Reenviar OTP
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
                        {resetStep !== "done" && (
                            <>
                                {resetStep !== "done" && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={view === "login" ? resetAndClose : backToLogin}
                                        disabled={loading}
                                        className="w-full rounded-full border-2 border-[#15467d] px-6 py-2 text-base font-normal text-[#15467d] transition-all duration-200 hover:border-[#88a9c3] hover:bg-[#88a9c3] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-500 dark:text-slate-100 dark:hover:border-slate-400 dark:hover:bg-slate-700 sm:w-auto"
                                    >
                                        {view === "login" ? "Cancelar" : "Voltar ao login"}
                                    </Button>
                                )}
                                {view === "login" ? (
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-full bg-[#398ffc] px-6 py-2 text-base font-normal text-white transition-all duration-200 hover:bg-[#2878dc] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                    >
                                        {loading ? "A entrar..." : "Entrar"}
                                    </Button>
                                ) : resetStep === "request" ? (
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-full bg-[#398ffc] px-6 py-2 text-base font-normal text-white transition-all duration-200 hover:bg-[#2878dc] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                    >
                                        {loading ? "A enviar..." : "Enviar OTP"}
                                    </Button>
                                ) : resetStep === "verify" ? (
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-full bg-[#398ffc] px-6 py-2 text-base font-normal text-white transition-all duration-200 hover:bg-[#2878dc] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                    >
                                        {loading ? "A verificar..." : "Verificar OTP"}
                                    </Button>
                                ) : resetStep === "reset" ? (
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-full bg-[#398ffc] px-6 py-2 text-base font-normal text-white transition-all duration-200 hover:bg-[#2878dc] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                    >
                                        {loading ? "A guardar..." : "Redefinir palavra-passe"}
                                    </Button>
                                ) : null}
                            </>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const FormField = ({
    id,
    name,
    type,
    label,
    placeholder,
    value,
    onChange,
    disabled,
    required,
}) => (
    <div className="space-y-2">
        <label
            htmlFor={id}
            className="text-sm font-medium text-[#15467d] dark:text-slate-200"
        >
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

export default LoginModal;
