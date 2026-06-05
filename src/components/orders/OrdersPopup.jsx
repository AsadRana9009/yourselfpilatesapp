"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCircle2, CreditCard, Smartphone, Building2, Trash2, ShoppingBag, Loader2, PlayCircle } from "lucide-react";
import { fetchOrders, deleteSubscriptionOrder, updateSubscriptionOrder, subscriptionsApi } from "@/lib/api";
import { toast } from "sonner";

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

export function OrdersPopup({ children }) {
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Payment Modal State
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [subscribing, setSubscribing] = useState(false);

    // Delete Modal State
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);


    // Success Modal State
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [successType, setSuccessType] = useState(null);

    useEffect(() => {
        if (open) {
            loadOrders();
        }
    }, [open]);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const data = await fetchOrders();
            setOrders(data.results || []);
        } catch (err) {
            console.error("Failed to load orders:", err);
            setError("Erro ao carregar as encomendas.");
        } finally {
            setLoading(false);
        }
    };

    const handlePayClick = (order) => {
        setSelectedOrder(order);
        setSelectedPaymentMethod(order.payment_method || null);
        setPhoneNumber("");
        setError(null);
        setPaymentModalOpen(true);
    };

    const handleDeleteClick = (order) => {
        setOrderToDelete(order);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!orderToDelete) return;

        setDeleting(true);
        try {
            await deleteSubscriptionOrder(orderToDelete.id);
            setOrders(orders.filter(o => o.id !== orderToDelete.id));
            toast.success("Encomenda eliminada com sucesso!");
            setDeleteModalOpen(false);
            setOrderToDelete(null);
        } catch (err) {
            console.error("Failed to delete order:", err);
            // Optional: show error message
        } finally {
            setDeleting(false);
        }
    };


    const handlePaymentMethodSelect = (methodId) => {
        setSelectedPaymentMethod(methodId);
        setError(null);
        if (methodId !== "mbway") {
            setPhoneNumber("");
        }
    };

    const handlePaymentUpdate = async () => {
        if (!selectedOrder || !selectedPaymentMethod) return;

        if (selectedPaymentMethod === "mbway" && !phoneNumber.trim()) {
            setError("Por favor, insira o número de telefone para MB WAY.");
            return;
        }

        setSubscribing(true);
        setError(null);

        try {
            let paymentData = { payment_method: selectedPaymentMethod };

            if (selectedPaymentMethod === "mbway") {
                const cleanPhone = phoneNumber.replace(/\D/g, "");
                paymentData.mbway_phone = `351#${cleanPhone}`;
            }

            // Use PATCH to update order payment method
            const response = await updateSubscriptionOrder(selectedOrder.id, paymentData);
            console.log(response);
            setPaymentModalOpen(false);

            if (selectedPaymentMethod === "creditcard") {
                const redirectUrl = response.ccard_payment_url || response.payment_details?.payment_url;

                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else {
                    // Fallback if no URL is present even for CC
                    setSuccessType("email");
                    setSuccessModalOpen(true);
                }
            } else {
                // Non-credit card methods (MB Way, Multibanco)
                setSuccessType("email");
                setSuccessModalOpen(true);
            }

            // Only reload if we are not redirecting (or if redirection logic didn't trigger return)
            if (selectedPaymentMethod !== "creditcard" || !response.payment_details?.payment_url) {
                loadOrders();
                resetPaymentState();
            }

        } catch (err) {
            console.error("Payment update failed:", err);
            setError(err.message || "Erro ao atualizar pagamento.");
        } finally {
            setSubscribing(false);
        }
    };

    const resetPaymentState = () => {
        setSelectedOrder(null);
        setSelectedPaymentMethod(null);
        setPhoneNumber("");
    };

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    {children}
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-2xl overflow-y-auto" side="right">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-normal text-[#88a9c3]">Minhas Encomendas</SheetTitle>
                    </SheetHeader>

                    <div className="mt-8">
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-sky-900" />
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                                <p className="text-sky-900">Não tem encomendas recentes.</p>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-500">
                                        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">ID</th>
                                                <th scope="col" className="px-6 py-4">Pack</th>
                                                <th scope="col" className="px-6 py-4">Preço</th>
                                                <th scope="col" className="px-6 py-4">Status</th>
                                                <th scope="col" className="px-6 py-4">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order.id} className="border-b bg-white hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium text-gray-900">
                                                        {order.id}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-gray-900">
                                                        {order.pack_details?.title || "Pack"}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {order.amount} €
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${order.payment_status === "Pendente"
                                                            ? "bg-amber-100 text-amber-800"
                                                            : order.payment_status === "Cancelado"
                                                                ? "bg-red-100 text-red-800"
                                                                : "bg-green-100 text-green-800"
                                                            }`}>
                                                            {order.payment_status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            {["Pendente", "Cancelado"].includes(order.payment_status) && (
                                                                <>
                                                                    <Button
                                                                        size="sm"
                                                                        onClick={() => handlePayClick(order)}
                                                                        className="h-8 gap-1 rounded-full bg-sky-900 px-3 text-xs text-white hover:bg-sky-800"
                                                                    >
                                                                        <PlayCircle className="h-3 w-3" />
                                                                        Pay
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        onClick={() => handleDeleteClick(order)}
                                                                        className="h-8 w-8 rounded-full p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            {/* Payment Selection Modal */}
            <Dialog
                open={paymentModalOpen}
                onOpenChange={(open) => {
                    setPaymentModalOpen(open);
                    if (!open) resetPaymentState();
                }}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold text-sky-900">
                            Pagamento
                        </DialogTitle>
                    </DialogHeader>

                    <div className="mt-4 space-y-3">
                        {PAYMENT_METHODS.map((method) => {
                            const Icon = method.icon;
                            const isSelected = selectedPaymentMethod === method.id;

                            return (
                                <div key={method.id}>
                                    <button
                                        type="button"
                                        onClick={() => handlePaymentMethodSelect(method.id)}
                                        className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 transition-all ${isSelected
                                            ? "border-sky-900 bg-sky-50"
                                            : "border-gray-200 hover:border-sky-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isSelected ? "bg-sky-900 text-white" : "bg-gray-100 text-sky-900"
                                            }`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <span className={`text-lg font-medium ${isSelected ? "text-sky-900" : "text-gray-700"
                                            }`}>
                                            {method.name}
                                        </span>
                                        {isSelected && (
                                            <CheckCircle2 className="ml-auto h-6 w-6 text-sky-900" />
                                        )}
                                    </button>

                                    {method.id === "mbway" && isSelected && (
                                        <div className="mt-3 pl-4">
                                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                                Número de Telefone
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-500">+351</span>
                                                <Input
                                                    type="tel"
                                                    placeholder="912 345 678"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    className="flex-1"
                                                    maxLength={9}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {error && (
                        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                            {error}
                        </div>
                    )}

                    <div className="mt-6 flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setPaymentModalOpen(false);
                                resetPaymentState();
                            }}
                            className="flex-1 rounded-full"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handlePaymentUpdate}
                            disabled={!selectedPaymentMethod || subscribing || (selectedPaymentMethod === "mbway" && !phoneNumber.trim())}
                            className="flex-1 rounded-full bg-sky-900 text-white hover:bg-sky-800 disabled:opacity-50"
                        >
                            {subscribing ? "A processar..." : "Confirmar"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-red-600">Eliminar Encomenda</DialogTitle>
                        <DialogDescription>
                            Tem a certeza que deseja eliminar esta encomenda? Esta ação não pode ser revertida.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-3 mt-4">
                        <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={deleting}
                        >
                            {deleting ? "A eliminar..." : "Eliminar"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Success Modal */}
            <Dialog open={successModalOpen} onOpenChange={(open) => {
                setSuccessModalOpen(open);
                if (!open) setSuccessType(null);
            }}>
                <DialogContent className="sm:max-w-md">
                    <div className="flex flex-col items-center justify-center py-6">
                        <div className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${successType === "email" ? "bg-amber-100" : "bg-green-100"
                            }`}>
                            <CheckCircle2 className={`h-12 w-12 ${successType === "email" ? "text-amber-600" : "text-green-600"
                                }`} />
                        </div>
                        <DialogHeader className="flex flex-col items-center text-center">
                            <DialogTitle className="mb-2 text-center text-2xl font-semibold text-sky-900">
                                {successType === "email"
                                    ? "Pagamento Atualizado"
                                    : successType === "redirect"
                                        ? "A redirecionar..."
                                        : "Sucesso!"}
                            </DialogTitle>
                            <p className="text-center text-base font-normal text-sky-700">
                                {successType === "email"
                                    ? "Verifique o seu email com os novos detalhes de pagamento."
                                    : successType === "redirect"
                                        ? "A redirecionar para a página de pagamento..."
                                        : "Operação realizada com sucesso."}
                            </p>
                        </DialogHeader>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
