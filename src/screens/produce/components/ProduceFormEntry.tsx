// File: ProduceFormEntry.tsx
"use client";
import { ProduceFormCreate } from "./ProduceFormCreate";
import { ProduceFormEditDraft } from "./ProduceFormEditDraft";
import { ProduceFormEditActive } from "./ProduceFormEditActive";

export function ProduceFormEntry({ initialData }: { initialData?: any }) {
  const isActive = initialData?.status === "active";
  const isEditing = !!initialData;

  if (isEditing) {
    return isActive ? (
      <ProduceFormEditActive initialData={initialData} />
    ) : (
      <ProduceFormEditDraft initialData={initialData} />
    );
  }

  return <ProduceFormCreate />;
}