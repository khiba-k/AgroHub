// lib/store/useToastStore.ts
import { create } from "zustand";

type ToastState = {
    message: string;
    success: boolean;
    open: boolean;
    showToast: (success: boolean, message: string) => void;
hideToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
message: "",
success: true,
open: false,
showToast: (success, message) =>
    set({ message, success, open: true }),
hideToast: () => set({ open: false }),
}));
