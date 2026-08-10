"use client";

import React from "react";
import clsx from "clsx";

interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={clsx("flex border-b border-concrete-100 dark:border-white/5", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              "border-b-2 px-4 py-2.5 text-[13px] font-medium transition-all outline-none",
              isActive
                ? "border-signal-orange text-signal-orange"
                : "border-transparent text-concrete-300 hover:text-concrete-600 dark:text-blueprint-400 dark:hover:text-blueprint-200"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
