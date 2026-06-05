"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { isAuthenticated, onAuthChange } from "@/lib/auth";
import { userApi } from "@/lib/api";

const UserCredits = ({ variant = "desktop" }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [remainingHours, setRemainingHours] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUserData = async () => {
        if (!isAuthenticated()) return;

        setLoading(true);
        try {
            const data = await userApi.getMe();
            setRemainingHours(data.remaining_hours);
        } catch (err) {
            // Only log if it's not a handled auth error
            if (err.message && !err.message.includes("Given token not valid")) {
                console.error("Failed to fetch user data:", err);
            }
            setRemainingHours(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial check on mount to ensure client matches state exactly
        const isAuth = isAuthenticated();
        setAuthenticated(isAuth);

        if (isAuth) {
            fetchUserData();
        }

        const unsubscribe = onAuthChange((status) => {
            setAuthenticated(status);
            if (status) {
                fetchUserData();
            } else {
                setRemainingHours(null);
            }
        });

        return unsubscribe;
    }, []);

    if (!authenticated || remainingHours === null) return null;

    const variantClasses = {
        mobile: "text-sm px-3 py-1.5",
        tablet: "text-base px-4 py-2",
        desktop: "text-base px-4 py-2",
    };

    const hours = parseFloat(remainingHours).toFixed(0);

    return (
        <div
            className={`flex items-center gap-2 rounded-full bg-[#88a9c3]/20 font-medium text-[#15467d] ${variantClasses[variant] || variantClasses.desktop}`}
        >
            <Clock className="h-4 w-4" />
            <span>
                {loading ? "..." : `${hours}h crédito`}
            </span>
        </div>
    );
};

export default UserCredits;

