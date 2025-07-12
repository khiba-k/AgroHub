// File: ProduceForm.tsx
"use client";

import { useEffect, useState } from "react";
import { ProduceFormEntry } from "./ProduceFormEntry";
import { set } from "date-fns";

type ProduceFormProps = {
  initialData?: any; // optional; passed when editing
  onClose?: () => void; // optional; callback when form is closed
  harvestIdToDelete?: string | null; // optional; used for deleting harvests
  setHarvestIdToDelete?: (id: string | null) => void; // optional; used to set harvest ID to delete
  setActiveMode?: any; // optional; used to set active mode for the form
};

export default function ProduceForm({ initialData, onClose,
  harvestIdToDelete = null,
  setHarvestIdToDelete = () => { /* no-op */ },
  setActiveMode = () => { /* no-op */ }

}: ProduceFormProps) {
  const [formData, setFormData] = useState<any | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setActiveMode(null)
    }
  }, [initialData]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        {formData ? "Edit Produce Listing" : "Create New Produce Listing"}
      </h1>

      <ProduceFormEntry initialData={formData} onClose={onClose}
        harvestIdToDelete={harvestIdToDelete}
        setHarvestIdToDelete={setHarvestIdToDelete}
      />
    </div>
  );
}