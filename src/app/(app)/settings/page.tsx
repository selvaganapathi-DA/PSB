"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

export default function SettingsPage() {
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Settings updated successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
          Account Settings
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Configure notification preferences, profile details, and preferences.
        </p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSave}>
          <Card className="space-y-4">
            <CardHeader title="General Preferences" />

            <div className="space-y-3">
              <div>
                <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="PSB"
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-concrete-600 dark:text-blueprint-200 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="psb@buildforge.co.in"
                  className="w-full rounded-xl border border-concrete-100 bg-white p-2.5 text-[13px] dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-[13px] font-medium text-concrete-900 dark:text-blueprint-100">
                  <input type="checkbox" defaultChecked className="rounded text-signal-orange" />
                  <span>Receive daily site report digests via email</span>
                </label>
              </div>

              <div className="flex justify-end pt-4 border-t border-concrete-100 dark:border-white/5">
                <button
                  type="submit"
                  className="rounded-xl bg-signal-orange px-4 py-2.5 text-[12.5px] font-semibold text-white hover:bg-signal-orange/95"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
