"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Building2, HardHat, IndianRupee, Clock } from "lucide-react";
import { kpis } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";

const icons = [Building2, HardHat, IndianRupee, Clock];
const tones = ["blueprint", "orange", "green", "amber"] as const;

export default function KpiRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi, i) => {
        const Icon = icons[i];
        const positive = kpi.trend === "up";
        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <Card className="relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12.5px] font-medium text-concrete-300">{kpi.label}</p>
                  <p className="mt-1.5 font-display text-[26px] font-semibold text-concrete-900 dark:text-blueprint-100">
                    {kpi.value}
                  </p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blueprint-700/10 text-blueprint-600 dark:bg-white/5 dark:text-blueprint-200">
                  <Icon size={18} />
                </span>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[12px] font-semibold">
                <span
                  className={
                    positive ? "flex items-center gap-1 text-signal-green" : "flex items-center gap-1 text-signal-red"
                  }
                >
                  {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {Math.abs(kpi.delta)}%
                </span>
                <span className="text-concrete-300">vs last month</span>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
