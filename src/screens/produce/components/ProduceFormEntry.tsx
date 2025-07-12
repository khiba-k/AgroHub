// File: ProduceFormEntry.tsx
"use client";
import { ProduceFormCreate } from "./ProduceFormCreate";
import { ProduceFormEditDraft } from "./ProduceFormEditDraft";
import { ProduceFormEditActive } from "./ProduceFormEditActive";

export function ProduceFormEntry({ initialData, onClose, harvestIdToDelete=null,
  setHarvestIdToDelete=() => { /* no-op */ }
 }: { initialData?: any; onClose?: () => void,
  harvestIdToDelete?: string | null,
  setHarvestIdToDelete?: (id: string | null) => void
 }) {
  const isActive = initialData?.status === "active";
  const isEditing = !!initialData;

  if (isEditing) {
    return isActive ? (
      <ProduceFormEditActive initialData={initialData} onClose={onClose} 
        harvestIdToDelete={harvestIdToDelete}
        setHarvestIdToDelete={setHarvestIdToDelete}
      />
    ) : (
      <ProduceFormEditDraft initialData={initialData} onClose={onClose} />
    );
  }

  return <ProduceFormCreate onClose={onClose} />;
}