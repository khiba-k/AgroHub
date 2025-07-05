// File: ProduceForm.tsx
"use client";

import { useEffect, useState } from "react";
import { ProduceFormEntry } from "./ProduceFormEntry";

type ProduceFormProps = {
  initialData?: any; // optional; passed when editing
};

export default function ProduceForm({ initialData }: ProduceFormProps) {
  const [formData, setFormData] = useState<any | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        {formData ? "Edit Produce Listing" : "Create New Produce Listing"}
      </h1>

      <ProduceFormEntry initialData={formData} />
    </div>
  );
}
