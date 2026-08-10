"use client";

import React from "react";
import { projects } from "@/lib/mockData";
import { Card, CardHeader } from "@/components/ui/Card";
import { Calendar, CheckCircle, Clock } from "lucide-react";

export default function TimelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
          Project Roadmap & Timeline
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Key construction milestones, targets, and expected handovers.
        </p>
      </div>

      <div className="max-w-3xl">
        <Card>
          <CardHeader title="Master Schedule Milestones" />
          <div className="relative border-l border-concrete-100 ml-4 pl-6 space-y-8 dark:border-white/5">
            {projects.map((proj) => (
              <div key={proj.id} className="relative">
                {/* Timeline node */}
                <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-signal-orange ring-4 ring-white dark:ring-blueprint-850" />

                <div>
                  <span className="text-[11.5px] font-semibold text-signal-orange">
                    {proj.startDate} to {proj.endDate}
                  </span>
                  <h4 className="text-[14px] font-semibold text-concrete-900 dark:text-blueprint-100 mt-0.5">
                    {proj.name} — Handover Target
                  </h4>
                  <p className="text-[12.5px] text-concrete-300 mt-1">
                    Status: {proj.status} ({proj.progress}% completed). Manager: {proj.manager}.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
