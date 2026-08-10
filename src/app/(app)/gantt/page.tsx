"use client";

import React from "react";
import { Gantt } from "@/components/ui/Gantt";
import { projects } from "@/lib/mockData";
import { Card, CardHeader } from "@/components/ui/Card";

export default function GanttChartPage() {
  const ganttTasks = projects.map((p) => ({
    name: p.name,
    start: p.startDate,
    end: p.endDate,
    progress: p.progress,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[22px] font-semibold text-concrete-900 dark:text-blueprint-100">
          Interactive Gantt Chart
        </h1>
        <p className="mt-1 text-[13px] text-concrete-300">
          Visual mapping of active projects schedules, overlaps, and handovers.
        </p>
      </div>

      <Card>
        <CardHeader title="Project Timelines & Overlaps" />
        <Gantt tasks={ganttTasks} />
      </Card>
    </div>
  );
}
