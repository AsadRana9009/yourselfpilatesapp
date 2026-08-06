"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Mail, ShieldAlert, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { userApi } from "@/lib/api";
import { clearAuthData, getUserInfo, onAuthChange } from "@/lib/auth";

const DeleteAccountPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setUser(getUserInfo());

    const unsubscribe = onAuthChange((_, userInfo) => {
      setUser(userInfo);
    });

    return unsubscribe;
  }, []);

  const handleDeleteAccount = async () => {
    if (deleteLoading) return;

    setDeleteLoading(true);
    setDeleteError("");

    try {
      await userApi.deleteMe();
      clearAuthData();
      setConfirmOpen(false);
      setSuccessMessage("Your account has been deleted.");
      setUser(null);
      window.setTimeout(() => {
        router.replace("/");
      }, 2500);
    } catch (error) {
      setDeleteError(
        error?.message || "Failed to delete your account. Please try again."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8fafc] via-white to-[#eef4fb] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <section className="rounded-3xl border border-[#dbe7f2] bg-white p-6 shadow-[0_20px_60px_rgba(21,70,125,0.08)] md:p-10">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0f5fa]">
            <ShieldAlert className="h-6 w-6 text-[#15467d]" />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#15467d] md:text-4xl">
            Delete Your Account
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#4b6a88]">
            You can use this page to request permanent deletion of your Yourself Pilates account and the profile data linked to it.
          </p>

          <div className="mt-6 rounded-2xl border border-[#e5edf5] bg-[#f8fafc] p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#b42318]" />
              <div>
                <p className="font-medium text-[#15467d]">What happens when you delete your account</p>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-[#4b6a88]">
                  <li>• Your account profile is removed from our system.</li>
                  <li>• Your access tokens are cleared from the browser.</li>
                  <li>• This action cannot be undone.</li>
                </ul>
              </div>
            </div>
          </div>

          {successMessage && (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              {successMessage}
            </div>
          )}

          {deleteError && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {deleteError}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="destructive"
              className="gap-2 rounded-full bg-[#b42318] px-6 text-white hover:bg-[#991b1b]"
              onClick={() => setConfirmOpen(true)}
              disabled={deleteLoading || successMessage || !user}
            >
              <Trash2 className="h-4 w-4" />
              {deleteLoading
                ? "Deleting..."
                : user
                  ? "Delete My Account"
                  : "Sign in to Delete"}
            </Button>

            <a
              href="mailto:yourselfpilates@gmail.com?subject=Account%20Deletion%20Request"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#15467d] underline-offset-4 hover:underline"
            >
              <Mail className="h-4 w-4" />
              Request deletion by email
            </a>
          </div>

          {user && (
            <p className="mt-4 text-sm text-[#4b6a88]">
              Signed in as <span className="font-medium text-[#15467d]">{user.email}</span>
            </p>
          )}

          {!user && (
            <p className="mt-4 text-sm text-[#4b6a88]">
              If you are not signed in, email us a deletion request and we will help remove your account.
            </p>
          )}
        </section>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#b42318]">Confirm account deletion</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              This will permanently delete your Yourself Pilates account and all associated profile data.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={deleteLoading}
              className="bg-[#b42318] text-white hover:bg-[#991b1b]"
            >
              {deleteLoading ? "Deleting..." : "Delete Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default DeleteAccountPage;
