"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FarmerProfileForm from "@/screens/profile/farmer/FarmerProfileForm"; // Adjust this if needed

export default function FarmerProfileDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Farmer Profile</DialogTitle>
        </DialogHeader>
        <FarmerProfileForm />
      </DialogContent>
    </Dialog>
  );
}
