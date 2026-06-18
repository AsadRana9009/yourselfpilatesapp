"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Phone, Shield, FileText, Clock, Globe, Users } from "lucide-react";
import { userApi, studentsApi } from "@/lib/api";

const getRoleLabel = (role, isPublic) => {
  if (role === "professor" || role === "teacher") {
    return isPublic ? "Public Professor" : "Pro Professor";
  }
  if (role === "student") {
    return isPublic ? "Public Student" : "Pro Student";
  }
  return role ? role.charAt(0).toUpperCase() + role.slice(1) : null;
};

const Field = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 py-2.5 border-b border-[#e8eef4] last:border-0">
    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f0f5fa]">
      <Icon className="h-3.5 w-3.5 text-[#15467d]" />
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-[10px] font-medium uppercase tracking-wide text-[#88a9c3]">
        {label}
      </span>
      <span className="mt-0.5 text-[13px] text-[#15467d] break-words">
        {value || <span className="italic text-[#88a9c3]">Not provided</span>}
      </span>
    </div>
  </div>
);

const SettingsModal = ({ open }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [myStudents, setMyStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);
    userApi
      .getMe()
      .then((data) => {
        setUserData(data);
        if (data.role === "professor" || data.role === "teacher") {
          setStudentsLoading(true);
          studentsApi.getMyStudents()
            .then(setMyStudents)
            .catch(() => setMyStudents([]))
            .finally(() => setStudentsLoading(false));
        }
      })
      .catch(() => setError("Failed to load profile data."))
      .finally(() => setLoading(false));
  }, [open]);

  if (!open) return null;

  return (
    <div className="absolute top-full mt-6 right-0 sm:right-[-115px] z-50 w-[min(288px,calc(100vw-1rem))] rounded-xl border border-[#e8eef4] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#e8eef4] bg-[#f8fafc]">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-[#15467d]">
          My Profile
        </p>
      </div>

      {/* Body */}
      <div className="px-4 py-1 max-h-80 overflow-y-auto">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#15467d] border-t-transparent" />
          </div>
        )}

        {error && (
          <p className="py-6 text-center text-xs text-red-500">{error}</p>
        )}

        {!loading && !error && userData && (
          <>
            <Field icon={User}     label="Full Name"       value={userData.full_name} />
            <Field icon={Mail}     label="Email"           value={userData.email} />
            <Field icon={Phone}    label="Contact Number"  value={userData.contact_number} />
            <Field icon={Shield}   label="Role"            value={getRoleLabel(userData.role, userData.is_public)} />
            <Field icon={FileText} label="Bio"             value={userData.bio} />
            <Field icon={Globe}    label="Region"          value={userData.region_name} />
            <Field
              icon={Clock}
              label="Créditos Restantes"
              value={
                userData.remaining_hours != null
                  ? `${parseFloat(userData.remaining_hours).toFixed(1)}h`
                  : null
              }
            />

            {(userData.role === "professor" || userData.role === "teacher") && (
              <div className="pt-2 pb-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f0f5fa]">
                    <Users className="h-3.5 w-3.5 text-[#15467d]" />
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-wide text-[#88a9c3]">
                    My Students
                  </span>
                </div>
                {studentsLoading ? (
                  <p className="text-xs text-[#88a9c3] pl-9">Loading…</p>
                ) : myStudents.length === 0 ? (
                  <p className="text-xs italic text-[#88a9c3] pl-9">No students added yet.</p>
                ) : (
                  <ul className="space-y-1 pl-9">
                    {myStudents.map((s) => (
                      <li key={s.id} className="text-[13px] text-[#15467d]">
                        {s.full_name}
                        {s.email && (
                          <span className="ml-1 text-[11px] text-[#88a9c3]">({s.email})</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsModal;
