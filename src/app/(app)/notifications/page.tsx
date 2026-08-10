"use client";

import React from "react";
import { recentActivity } from "@/lib/mockData";
import { Card, CardHeader } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Bell, ShieldAlert } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
          Alerts & Notifications
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          View system alerts, approval logs, and project status updates.
        </p>
      </div>

      <div className="max-w-2xl">
        <Card className="divide-y divide-concrete-100 dark:divide-white/5">
          {recentActivity.map((act) => (
            <div key={act.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-start">
              <Avatar name={act.user} />
              <div className="flex-1 text-[13px]">
                <p className="text-concrete-900 dark:text-blueprint-100">
                  <span className="font-semibold">{act.user}</span> {act.action}{" "}
                  <span className="font-semibold text-signal-orange">{act.target}</span>.
                </p>
                <span className="text-[11px] text-concrete-300 mt-1 block">{act.time}</span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
