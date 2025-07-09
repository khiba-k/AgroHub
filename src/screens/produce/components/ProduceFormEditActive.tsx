import { useProduceFormLogic } from "@/lib/utils/farmer/useProduceFormLogic";
import { ProduceFormSteps } from "./ProduceFormSteps";
import { on } from "events";

export const ProduceFormEditActive = ({ initialData, onClose }: { initialData: any; onClose?: () => void }) => {
  const form = useProduceFormLogic(initialData, onClose);
  const isEditing = true;
  return <ProduceFormSteps {...form} isActiveListing={true} isEditing={isEditing} />;
};