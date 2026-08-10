"use client";

import React from "react";
import { AlertTriangle, Database, FolderOpen } from "lucide-react";
import clsx from "clsx";

export function LoadingSkeleton({
  count = 3,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={clsx("animate-pulse space-y-4", className)}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="h-16 w-full rounded-2xl bg-concrete-100 dark:bg-blueprint-800"
        />
      ))}
    </div>
  );
}

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your filters or search terms.",
  action,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-concrete-100 bg-white p-12 text-center dark:border-white/5 dark:bg-blueprint-850">
      <FolderOpen className="h-12 w-12 text-concrete-300 dark:text-blueprint-400 mb-4" />
      <h3 className="font-display text-[15px] font-semibold text-concrete-900 dark:text-blueprint-100">
        {title}
      </h3>
      <p className="mt-1 text-[13px] text-concrete-300 dark:text-blueprint-400 max-w-sm">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading the data. Please try again.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center dark:border-red-900/30 dark:bg-red-950/20">
      <AlertTriangle className="h-10 w-10 text-red-500 mb-3" />
      <h3 className="font-display text-[15px] font-semibold text-red-800 dark:text-red-350">
        {title}
      </h3>
      <p className="mt-1 text-[13px] text-red-600 dark:text-red-400 max-w-md">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-[12.5px] font-semibold text-white transition-all hover:bg-red-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
