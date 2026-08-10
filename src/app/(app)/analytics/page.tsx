"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import ProgressChart from "@/components/dashboard/charts/ProgressChart";
import CashFlowChart from "@/components/dashboard/charts/CashFlowChart";
import MaterialStockChart from "@/components/dashboard/charts/MaterialStockChart";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
          Analytics & Performance
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Key performance indicators, project timelines, and stock distributions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ProgressChart />
        <CashFlowChart />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <MaterialStockChart />
        <Card className="lg:col-span-2">
          <CardHeader title="Regional Project Distribution" subtitle="Project density across Tamil Nadu locations" />
          <div className="h-64 flex items-center justify-center border border-dashed border-concrete-100 rounded-xl dark:border-white/5">
            <span className="text-[13px] text-concrete-300 dark:text-blueprint-400">
              Interactive Regional Map (Chennai, Coimbatore, Salem, Dharmapuri)
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
