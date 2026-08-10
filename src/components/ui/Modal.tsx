"use client";

import React from "react";
import { Modal as MuiModal, Box, IconButton } from "@mui/material";
import { X } from "lucide-react";
import clsx from "clsx";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = "md",
}: ModalProps) {
  const maxWClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }[maxWidth];

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      closeAfterTransition
      className="flex items-center justify-center p-4"
    >
      <Box
        className={clsx(
          "relative w-full rounded-2xl border border-concrete-100 bg-white p-6 shadow-xl outline-none transition-all dark:border-white/5 dark:bg-blueprint-850",
          maxWClass
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-[16px] font-semibold text-concrete-900 dark:text-blueprint-100">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-concrete-300 hover:bg-concrete-50 dark:text-blueprint-400 dark:hover:bg-blueprint-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div>{children}</div>
      </Box>
    </MuiModal>
  );
}
