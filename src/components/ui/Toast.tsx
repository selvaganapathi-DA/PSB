"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed right-4 top-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="flex items-center gap-2.5 rounded-2xl border border-concrete-100 bg-white p-4 shadow-xl pointer-events-auto dark:border-white/5 dark:bg-blueprint-850 min-w-[280px] max-w-sm"
            >
              {t.type === "success" && (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              )}
              {t.type === "error" && (
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              )}
              {t.type === "info" && (
                <AlertCircle className="h-5 w-5 text-signal-orange flex-shrink-0" />
              )}
              <span className="flex-1 text-[13px] font-medium text-concrete-900 dark:text-blueprint-100">
                {t.message}
              </span>
              <button
                onClick={() => removeToast(t.id)}
                className="text-concrete-300 hover:text-concrete-500 dark:text-blueprint-400 dark:hover:text-blueprint-200"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
