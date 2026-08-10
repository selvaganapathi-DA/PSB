"use client";

import React from "react";
import clsx from "clsx";
import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number; // 0-indexed
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={clsx("flex items-center justify-between w-full", className)}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isActive = idx === currentStep;

        return (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center flex-1 relative">
              <div
                className={clsx(
                  "flex h-8 w-8 items-center justify-center rounded-full text-[12.5px] font-semibold transition-all border",
                  isCompleted
                    ? "bg-signal-orange border-signal-orange text-white"
                    : isActive
                    ? "border-signal-orange text-signal-orange bg-signal-orange/10"
                    : "border-concrete-100 bg-white text-concrete-300 dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-400"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              <span
                className={clsx(
                  "mt-2 text-[11.5px] text-center font-medium",
                  isActive || isCompleted
                    ? "text-concrete-900 dark:text-blueprint-100 font-semibold"
                    : "text-concrete-300 dark:text-blueprint-400"
                )}
              >
                {step}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={clsx(
                  "h-[2px] flex-1 -mt-6 mx-2",
                  isCompleted ? "bg-signal-orange" : "bg-concrete-100 dark:bg-white/5"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
