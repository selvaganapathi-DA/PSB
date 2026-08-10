"use client";

import React, { useState } from "react";
import { Smartphone, MapPin, ClipboardList, Camera, Wifi, WifiOff, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function MobileSiteAppPage() {
  const { toast } = useToast();
  const [offlineMode, setOfflineMode] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);

  // Daily Progress Report (DPR) State
  const [manpowerCount, setManpowerCount] = useState("18");
  const [machineryStatus, setMachineryStatus] = useState("Excavator Active");
  const [concretePoured, setConcretePoured] = useState("45"); // cubic meters

  const handleGeoCheckIn = () => {
    setCheckedIn(!checkedIn);
    toast(
      checkedIn
        ? "Checked out successfully from Chennai Site coordinates."
        : "Checked in successfully! GPS Match: Lat 13.0827, Lng 80.2707",
      "success"
    );
  };

  const handleSaveDPR = (e: React.FormEvent) => {
    e.preventDefault();
    if (offlineMode) {
      toast("DPR saved locally! Will sync automatically when network returns.", "info");
    } else {
      toast("DPR submitted successfully to the engineering office!", "success");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-signal-orange" />
          Mobile Site App Simulator
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Simulate supervisor site operations: geo-fenced attendance, daily progress reports (DPR), and offline syncing.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        {/* Smartphone Mockup Container */}
        <div className="w-[340px] h-[640px] rounded-[40px] border-[12px] border-blueprint-900 bg-blueprint-950 p-3 shadow-elevated relative overflow-hidden shrink-0 mx-auto lg:mx-0">
          {/* Smartphone Camera Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-blueprint-900 rounded-b-2xl z-20 flex justify-center items-center">
            <div className="w-3 h-3 rounded-full bg-black" />
          </div>

          {/* Screen Content Wrapper */}
          <div className="h-full bg-concrete-50 dark:bg-blueprint-900 rounded-[28px] overflow-y-auto p-4 flex flex-col justify-between scrollbar-thin text-concrete-800 dark:text-blueprint-200">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-[10px] text-concrete-350 pt-2 pb-3 px-1 border-b border-concrete-100 dark:border-white/5">
              <span>9:41 AM (Site View)</span>
              <button
                onClick={() => setOfflineMode(!offlineMode)}
                className="flex items-center gap-1 font-semibold focus:outline-none"
              >
                {offlineMode ? (
                  <>
                    <WifiOff className="h-3 w-3 text-red-500 animate-pulse" />
                    <span className="text-red-500">Offline</span>
                  </>
                ) : (
                  <>
                    <Wifi className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">Connected</span>
                  </>
                )}
              </button>
            </div>

            {/* Main Application Interface inside Phone */}
            <div className="flex-1 py-4 space-y-4 text-[12px]">
              {/* Header Title */}
              <div className="flex items-center gap-2">
                <img src={`${import.meta.env.BASE_URL}logo.png`} className="h-7 w-7 rounded bg-white p-0.5" alt="Logo" />
                <div>
                  <h3 className="font-bold text-[12.5px] text-concrete-950 dark:text-blueprint-100 uppercase">VARUVI SITE</h3>
                  <p className="text-[10px] text-concrete-300">Supervisor Terminal</p>
                </div>
              </div>

              {/* Geo Attendance Block */}
              <div className="p-3 bg-white dark:bg-blueprint-800 rounded-xl border border-concrete-100 dark:border-white/5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-concrete-950 dark:text-blueprint-100 flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-signal-orange" />
                    Geo-fenced Check-In
                  </span>
                  <span className={`h-2 w-2 rounded-full ${checkedIn ? "bg-green-500" : "bg-red-500"}`} />
                </div>
                <p className="text-[10.5px] text-concrete-300">Must be within 100 meters of Skyline Site.</p>
                <button
                  onClick={handleGeoCheckIn}
                  className={`w-full py-2 rounded-lg text-white font-bold text-[11px] transition-all ${
                    checkedIn ? "bg-red-500 hover:bg-red-600" : "bg-signal-orange hover:bg-signal-orange/90"
                  }`}
                >
                  {checkedIn ? "CHECK OUT" : "CHECK IN NOW"}
                </button>
              </div>

              {/* Daily Progress Report Form */}
              <form onSubmit={handleSaveDPR} className="p-3 bg-white dark:bg-blueprint-800 rounded-xl border border-concrete-100 dark:border-white/5 shadow-sm space-y-3">
                <span className="font-bold text-concrete-950 dark:text-blueprint-100 flex items-center gap-1 border-b border-concrete-100 dark:border-white/5 pb-1.5">
                  <ClipboardList className="h-3.5 w-3.5 text-signal-orange" />
                  DPR Site Log
                </span>

                <div>
                  <label className="block text-concrete-350 mb-0.5">Active Manpower (Labourers)</label>
                  <input
                    type="number"
                    value={manpowerCount}
                    onChange={(e) => setManpowerCount(e.target.value)}
                    className="w-full rounded bg-concrete-50 border border-concrete-100 p-1.5 text-[11px] dark:border-white/5 dark:bg-blueprint-900"
                  />
                </div>

                <div>
                  <label className="block text-concrete-350 mb-0.5">Machinery status</label>
                  <input
                    type="text"
                    value={machineryStatus}
                    onChange={(e) => setMachineryStatus(e.target.value)}
                    className="w-full rounded bg-concrete-50 border border-concrete-100 p-1.5 text-[11px] dark:border-white/5 dark:bg-blueprint-900"
                  />
                </div>

                <div>
                  <label className="block text-concrete-350 mb-0.5">Concrete Poured (Cubic Mtr)</label>
                  <input
                    type="number"
                    value={concretePoured}
                    onChange={(e) => setConcretePoured(e.target.value)}
                    className="w-full rounded bg-concrete-50 border border-concrete-100 p-1.5 text-[11px] dark:border-white/5 dark:bg-blueprint-900"
                  />
                </div>

                {/* Photo Evidence simulator */}
                <div
                  onClick={() => toast("Camera shutter triggered! Photo saved & timestamped.")}
                  className="flex items-center justify-center gap-1.5 border border-dashed border-concrete-300 dark:border-white/10 rounded-lg p-2.5 cursor-pointer hover:bg-concrete-50 dark:hover:bg-blueprint-900 text-center"
                >
                  <Camera className="h-4 w-4 text-signal-orange" />
                  <span className="font-semibold text-concrete-600 dark:text-blueprint-300 text-[11px]">Capture Photo Evidence</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-blueprint-950 text-white font-bold rounded-lg text-[11px] hover:bg-blueprint-900"
                >
                  Submit DPR Log
                </button>
              </form>
            </div>

            {/* Simulated Mobile Navigation */}
            <div className="border-t border-concrete-100 dark:border-white/5 pt-2 text-center text-[10px] text-concrete-350">
              Varuvi ERP site helper v1.2
            </div>
          </div>
        </div>

        {/* Operational guidelines description */}
        <div className="flex-1 rounded-2xl border border-concrete-100 bg-white p-6 shadow-card dark:border-white/5 dark:bg-blueprint-850 space-y-4">
          <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
            Site App Features & Sync Operations
          </h3>
          <p className="text-[13px] text-concrete-300 leading-relaxed">
            The Varuvi Site App is specifically optimized for low-network construction zones:
          </p>
          <ul className="space-y-2 text-[12.5px] text-concrete-800 dark:text-blueprint-200">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
              <span><strong>Offline-First Storage:</strong> Automatically logs attendance, material requests, and checklists into IndexDB storage, queuing files for sync when cellular connectivity is restored.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
              <span><strong>Geo-Fencing Boundaries:</strong> Restricts check-ins using latitude/longitude offsets, matching worker schedules against site-wide geofence logs to ensure compliance.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
              <span><strong>Photo Evidence Watermarking:</strong> Automatically injects date, GPS tags, and user IDs into structural inspections for direct QA audit trails.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
