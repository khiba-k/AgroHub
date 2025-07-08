// File: ProduceFormEntry.tsx
"use client";
import { ProduceFormCreate } from "./ProduceFormCreate";
import { ProduceFormEditDraft } from "./ProduceFormEditDraft";
import { ProduceFormEditActive } from "./ProduceFormEditActive";

export function ProduceFormEntry({ initialData, onClose }: { initialData?: any; onClose?: () => void }) {
  const isActive = initialData?.status === "active";
  const isEditing = !!initialData;

  if (isEditing) {
    return isActive ? (
      <ProduceFormEditActive initialData={initialData} onClose={onClose} />
    ) : (
      <ProduceFormEditDraft initialData={initialData} onClose={onClose} />
    );
  }

  return <ProduceFormCreate onClose={onClose} />;
}