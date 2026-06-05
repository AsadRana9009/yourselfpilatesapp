"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCircle2, CreditCard, Smartphone, Building2 } from "lucide-react";
import { fetchPacks, subscriptionsApi } from "@/lib/api";
import { getUserInfo, isAuthenticated, onAuthChange } from "@/lib/auth";
import LoginModal from "./LoginModal";

const PAYMENT_METHODS = [
  {
    id: "multibanco",
    name: "MultiBanco",
    icon: Building2,
    requiresPhone: false,
  },
  {
    id: "mbway",
    name: "MB WAY",
    icon: Smartphone,
    requiresPhone: true,
  },
  {
    id: "creditcard",
    name: "Cartão de Crédito",
    icon: CreditCard,
    requiresPhone: false,
  },
];

const PackagesListing = ({ title, subtitle } = {}) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [packsRefreshSeq, setPacksRefreshSeq] = useState(0);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [successType, setSuccessType] = useState(null); // 'pending' | null
  const [successPaymentMethod, setSuccessPaymentMethod] = useState(null); // 'multibanco' | 'mbway' | null
  const [successPaymentDetails, setSuccessPaymentDetails] = useState(null); // response.payment_details

  const loadPacks = useCallback(async (retries = 1) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPacks = await fetchPacks();
      setPackages(fetchedPacks);
    } catch (err) {
      if (err?.message && !err.message.includes("Given token not valid")) {
        console.error("Failed to load packs:", err);
      }
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return loadPacks(retries - 1);
      }
      setError("Erro ao carregar os packs. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setUserRole(getUserInfo()?.role ?? null);
    const unsubscribe = onAuthChange((isAuth, userInfo) => {
      setAuthenticated(isAuth);
      setUserRole(userInfo?.role ?? null);
      // New session (login/logout) should start clean and refetch packs.
      setError(null);
      setSuccessModalOpen(false);
      setSuccessType(null);
      setSuccessPaymentMethod(null);
      setSuccessPaymentDetails(null);
      setPaymentModalOpen(false);
      setLoginModalOpen(false);
      setSelectedPackage(null);
      setSelectedPaymentMethod(null);
      setPhoneNumber("");
      setPacksRefreshSeq((v) => v + 1);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    loadPacks();
  }, [loadPacks, packsRefreshSeq]);

  const handleSubscribe = async (pkgInput = selectedPackage, methodInput = selectedPaymentMethod) => {
    if (!pkgInput || !methodInput) return;

    // Validate phone number for MBWAY
    if (methodInput === "mbway" && !phoneNumber.trim()) {
      setError("Por favor, insira o número de telefone para MB WAY.");
      return;
    }

    setSubscribing(true);
    setError(null);
    try {
      let paymentData = { payment_method: methodInput };

      if (methodInput === "mbway") {
        const cleanPhone = phoneNumber.replace(/\D/g, "");
        paymentData.mbway_phone = `351#${cleanPhone}`;
      }

      const response = await subscriptionsApi.subscribe(pkgInput.id, paymentData);
      setPaymentModalOpen(false);

      const paymentUrl = response.payment_url || response.payment_details?.payment_url;
      if (methodInput === "creditcard" && paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }

      setSuccessPaymentMethod(response?.payment_method || null);
      setSuccessPaymentDetails(response?.payment_details || null);
      setSuccessType("pending");
      setSuccessModalOpen(true);
      resetPaymentState();
    } catch (err) {
      const apiError =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err?.message ||
        "Erro ao processar subscrição. Por favor, tente novamente.";

      setError(typeof apiError === "string" ? apiError : JSON.stringify(apiError));
    } finally {
      setSubscribing(false);
    }
  };

  const resetPaymentState = () => {
    setSelectedPaymentMethod(null);
    setPhoneNumber("");
  };

  // If user logs out, clear any previous user UI state (errors/success modal),
  // so the next login starts clean.
  useEffect(() => {
    if (!authenticated) {
      setError(null);
      setLoginModalOpen(false);
      setPaymentModalOpen(false);

      setSuccessModalOpen(false);
      setSuccessType(null);
      setSuccessPaymentMethod(null);
      setSuccessPaymentDetails(null);

      setSelectedPackage(null);
      setSelectedPaymentMethod(null);
      setPhoneNumber("");
    }
  }, [authenticated]);

  const handleAgendarClick = (pkg) => {
    setSelectedPackage(pkg);
    setError(null);
    resetPaymentState();
    if (authenticated) {
      setPaymentModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setLoginModalOpen(false);
    setError(null);
    setSuccessModalOpen(false);
    setSuccessType(null);
    setSuccessPaymentMethod(null);
    setSuccessPaymentDetails(null);
    if (selectedPackage) {
      setPaymentModalOpen(true);
    }
  };

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
    setError(null);
    if (methodId !== "mbway") {
      setPhoneNumber("");
    }
  };

  const publicPacks = packages.filter((p) => p.is_public === true);
  const proPacks = packages.filter((p) => p.is_public !== true);

  // Role-based tab logic:
  //  - professor / teacher → pro packs only, no switcher
  //  - student             → public packs only, no switcher
  //  - not logged in / admin → both tabs, user can switch
  const isProfessor = userRole === "professor" || userRole === "teacher";
  const isStudent = userRole === "student";
  const showTabs = !authenticated || (!isProfessor && !isStudent);

  const [activeTab, setActiveTab] = useState("public");
  const visiblePacks = isProfessor
    ? proPacks
    : isStudent
    ? publicPacks
    : activeTab === "public"
    ? publicPacks
    : proPacks;

  return (
    <section className="pt-0 pb-20" id="packages-listing">
      <div className="container mx-auto px-4 text-center md:px-6 lg:px-8">
        {title && (
          <h2 className="font-accent mt-20 mb-10 text-5xl font-normal text-[#88a9c3]">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mx-auto mb-12 max-w-3xl font-normal text-sky-900 sm:text-lg md:text-lg">
            {subtitle}
          </p>
        )}

        {error && (
          <div className="mx-auto mb-8 max-w-2xl rounded-lg bg-red-50 p-4 text-red-800 flex items-center justify-between">
            <p className="text-sm">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => loadPacks()}
              className="text-red-800 hover:bg-red-100 h-8"
            >
              Recarregar
            </Button>
          </div>
        )}

        {/* Tab switcher — only shown when user can choose between both lists */}
        {!loading && !error && showTabs && (
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-1 rounded-full bg-sky-50 border border-sky-100 p-1.5 shadow-sm">
              <button
                onClick={() => setActiveTab("public")}
                className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  activeTab === "public"
                    ? "bg-sky-900 text-white shadow-md"
                    : "text-sky-800 hover:bg-sky-100"
                }`}
              >
                Packs Públicos
                <span
                  className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold ${
                    activeTab === "public"
                      ? "bg-white/20 text-white"
                      : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {publicPacks.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("pro")}
                className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  activeTab === "pro"
                    ? "bg-sky-900 text-white shadow-md"
                    : "text-sky-800 hover:bg-sky-100"
                }`}
              >
                Packs Pro
                <span
                  className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold ${
                    activeTab === "pro"
                      ? "bg-white/20 text-white"
                      : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {proPacks.length}
                </span>
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-sky-900">A carregar packs...</p>
          </div>
        ) : visiblePacks.length === 0 && !error ? (
          <div className="mx-auto max-w-6xl py-12">
            <p className="text-center text-sky-900">
              {activeTab === "public"
                ? "Nenhum pack público disponível no momento."
                : "Nenhum pack pro disponível no momento."}
            </p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {visiblePacks.map((pkg) => (
              <Card
                key={pkg.id || pkg.name}
                className="flex h-full w-full flex-col overflow-hidden rounded-xl border-none bg-linear-to-b from-sky-900/30 via-[#f1f5f8] to-white p-0 shadow-none hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-[300px] w-full shrink-0 overflow-hidden bg-gray-200">
                  {pkg.image ? (
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                      onError={(e) => {
                        console.error("Image failed to load:", pkg.image);
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                      Sem imagem
                    </div>
                  )}
                </div>

                <CardContent className="flex flex-1 flex-col p-6 text-left font-sans">
                  <h3 className="mb-3 font-sans text-2xl font-bold text-sky-900">
                    {pkg.name}
                  </h3>
                  <p className="mb-3 flex-1 font-sans text-base font-normal text-sky-900">
                    {pkg.description}
                  </p>
                  <p className="mb-6 font-mono text-lg font-semibold text-sky-900">
                    {pkg.price}
                  </p>

                  <div className="mt-auto flex flex-col items-start gap-3">
                    <Button
                      onClick={() => handleAgendarClick(pkg)}
                      className="w-full rounded-full bg-sky-900 px-6 py-2 text-base font-medium text-white normal-case sm:w-auto"
                    >
                      Agendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLogin={handleLoginSuccess}
      />      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="sm:max-w-[450px] rounded-3xl p-6 border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-sky-900 text-center mb-4">
              Método de Pagamento
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedPaymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                  className={`flex items-center gap-4 rounded-2xl border-2 p-4 transition-all duration-200 ${isSelected
                    ? "border-sky-900 bg-sky-50 shadow-md transform scale-[1.02]"
                    : "border-gray-100 hover:border-sky-200 hover:bg-gray-50"
                    }`}
                >
                  <div className={`rounded-xl p-3 ${isSelected ? "bg-sky-900 text-white" : "bg-sky-100 text-sky-900"
                    }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-lg font-bold text-sky-900">{method.name}</span>
                    <span className="text-xs text-sky-700 font-medium">
                      {method.id === 'mbway' ? 'Pagamento imediato via telemóvel' :
                        method.id === 'multibanco' ? 'Referência enviada por e-mail' :
                          'Pagamento seguro com cartão'}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="ml-auto">
                      <CheckCircle2 className="h-6 w-6 text-sky-900" />
                    </div>
                  )}
                </button>
              );
            })}

            {selectedPaymentMethod === "mbway" && (
              <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                <label className="text-sm font-bold text-sky-900 ml-1">Número de Telemóvel</label>
                <Input
                  type="tel"
                  placeholder="912 345 678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="rounded-xl border-sky-100 bg-sky-50/50 py-6 focus-visible:ring-sky-900"
                />
              </div>
            )}

            <Button
              disabled={!selectedPaymentMethod || subscribing}
              onClick={() => handleSubscribe()}
              className="mt-6 w-full rounded-2xl bg-sky-900 py-7 text-lg font-bold text-white transition-all hover:bg-sky-800 hover:shadow-lg disabled:opacity-50"
            >
              {subscribing ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>A processar...</span>
                </div>
              ) : (
                "Confirmar Subscrição"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={successModalOpen} onOpenChange={(open) => {
        setSuccessModalOpen(open);
        if (!open) {
          setSuccessType(null);
          setSuccessPaymentMethod(null);
          setSuccessPaymentDetails(null);
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <div
              className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${successType === "pending" ? "bg-amber-100" : "bg-green-100"
                }`}
            >
              <CheckCircle2
                className={`h-12 w-12 ${successType === "pending" ? "text-amber-600" : "text-green-600"
                  }`}
              />
            </div>

            <DialogHeader className="flex flex-col items-center text-center">
              <DialogTitle className="mb-2 text-center text-2xl font-semibold text-sky-900">
                {successType === "pending" ? "Pagamento Pendente" : "Subscrição Realizada!"}
              </DialogTitle>
              <p className="text-center text-base font-normal text-sky-700">
                {successType === "pending"
                  ? successPaymentMethod === "multibanco"
                    ? "Use os detalhes abaixo para concluir o pagamento."
                    : successPaymentMethod === "mbway"
                      ? "A sua aprovação deve ser feita no seu telemóvel no prazo indicado."
                      : "Verifique os detalhes de pagamento."
                  : "A sua subscrição foi processada com sucesso. Obrigado!"}
              </p>
            </DialogHeader>

            {successType === "pending" && successPaymentMethod === "multibanco" && (
              <div className="mt-5 w-full max-w-[380px] rounded-2xl border border-sky-100 bg-sky-50 p-4 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-sky-700">Montante</span>
                    <span className="font-mono text-sky-900">
                      {successPaymentDetails?.amount || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-sky-700">Entidade</span>
                    <span className="font-mono text-sky-900">
                      {successPaymentDetails?.entity || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-sky-700">Referência</span>
                    <span className="font-mono text-sky-900">
                      {successPaymentDetails?.reference || "—"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {successType === "pending" && successPaymentMethod === "mbway" && (
              <div className="mt-5 w-full max-w-[380px] rounded-2xl border border-sky-100 bg-sky-50 p-4 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-sky-700">Montante</span>
                    <span className="font-mono text-sky-900">
                      {successPaymentDetails?.amount || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-sky-700">Telemóvel</span>
                    <span className="font-mono text-sky-900">
                      {successPaymentDetails?.phone_number || "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-sky-700">Prazo</span>
                    <span className="font-mono text-sky-900">
                      {successPaymentDetails?.timeout || "—"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PackagesListing;
