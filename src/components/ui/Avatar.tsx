"use client";

import React from "react";
import clsx from "clsx";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colors = [
  "bg-red-500 text-white",
  "bg-blue-500 text-white",
  "bg-green-500 text-white",
  "bg-yellow-600 text-white",
  "bg-purple-500 text-white",
  "bg-pink-500 text-white",
  "bg-indigo-500 text-white",
];

function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeClasses = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-8 w-8 text-[12px]",
    lg: "h-12 w-12 text-[16px]",
  }[size];

  const bgColor = src ? "" : getColor(name);

  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center rounded-full font-bold overflow-hidden select-none bg-concrete-100 dark:bg-blueprint-800",
        sizeClasses,
        bgColor,
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

interface AvatarStackProps {
  avatars: { name: string; src?: string }[];
  limit?: number;
  size?: "sm" | "md";
}

export function AvatarStack({ avatars, limit = 3, size = "sm" }: AvatarStackProps) {
  const visibleAvatars = avatars.slice(0, limit);
  const hiddenCount = avatars.length - limit;

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {visibleAvatars.map((av, idx) => (
        <Avatar
          key={idx}
          name={av.name}
          src={av.src}
          size={size}
          className="border-2 border-white dark:border-blueprint-900"
        />
      ))}
      {hiddenCount > 0 && (
        <div
          className={clsx(
            "flex items-center justify-center rounded-full bg-concrete-100 font-semibold text-concrete-600 border-2 border-white dark:bg-blueprint-800 dark:text-blueprint-300 dark:border-blueprint-900 select-none",
            size === "sm" ? "h-6 w-6 text-[9.5px]" : "h-8 w-8 text-[11.5px]"
          )}
        >
          +{hiddenCount}
        </div>
      )}
    </div>
  );
}
