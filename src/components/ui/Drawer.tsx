"use client";

import React from "react";
import { Drawer as MuiDrawer, Box } from "@mui/material";
import { X } from "lucide-react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  anchor?: "left" | "right";
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  anchor = "right",
}: DrawerProps) {
  return (
    <MuiDrawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 420 },
          backgroundColor: "transparent",
          boxShadow: "none",
          border: 0,
        },
      }}
    >
      <Box className="h-full w-full border-l border-concrete-100 bg-white p-6 shadow-2xl dark:border-white/5 dark:bg-blueprint-850">
        <div className="mb-6 flex items-center justify-between">
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
        <div className="h-[calc(100%-60px)] overflow-y-auto pr-1">{children}</div>
      </Box>
    </MuiDrawer>
  );
}
