import { useProduceFormLogic } from "@/lib/utils/farmer/useProduceFormLogic";
import { ProduceFormSteps } from "./ProduceFormSteps";
import { on } from "events";

export const ProduceFormEditActive = ({ initialData, onClose, 
  harvestIdToDelete = null,
  setHarvestIdToDelete = () => { /* no-op */ }
 }: { initialData: any; onClose?: () => void,
  harvestIdToDelete?: string | null,
  setHarvestIdToDelete?: (id: string | null) => void
  }) => {
  const form = useProduceFormLogic(initialData, onClose, harvestIdToDelete, setHarvestIdToDelete);
  const isEditing = true;
  return <ProduceFormSteps {...form} isActiveListing={true} isEditing={isEditing} />;
};