// components/ui/Toast.tsx
"use client";

import { useEffect } from "react";
import { useToastStore } from "@/lib/store/useToastStore";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Toast() {
    const { open, success, message, hideToast } = useToastStore();

    useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, hideToast]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-[9999] flex items-center gap-3 rounded-lg px-4 py-3 text-white shadow-lg transition-all duration-300",
        success ? "bg-green-600" : "bg-red-600"
      )}
    >
      {success ? <CheckCircle size={20} /> : <XCircle size={20} />}
      <span>{message}</span>
    </div>
  );
}
