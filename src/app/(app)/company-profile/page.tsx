"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";

export default function CompanyProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
          Company Profile
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Varuvi corporate credentials, registered offices, and taxation configurations.
        </p>
      </div>

      <div className="max-w-2xl">
        <Card className="space-y-4">
          <CardHeader title="Corporate Identity" />
          <div className="space-y-3 text-[13px] text-concrete-600 dark:text-blueprint-200">
            <div className="flex justify-between py-1 border-b border-concrete-100 dark:border-white/5">
              <span className="text-concrete-350">Company Legal Name</span>
              <span className="font-semibold">Zenfuture@Varuvi Technologies Private Limited</span>
            </div>
            <div className="flex justify-between py-1 border-b border-concrete-100 dark:border-white/5">
              <span className="text-concrete-350">Corporate Identification No. (CIN)</span>
              <span className="font-mono">U62013TZ2025PTC035893</span>
            </div>
            <div className="flex justify-between py-1 border-b border-concrete-100 dark:border-white/5">
              <span className="text-concrete-350">GSTIN Registration</span>
              <span className="font-mono">33AACCZ7325E1ZG (Tamil Nadu)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-concrete-100 dark:border-white/5">
              <span className="text-concrete-350">Registered Office Address</span>
              <span className="text-right">
                No:56A,Muthupatti, Dharmapuri, TN, 636701
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
