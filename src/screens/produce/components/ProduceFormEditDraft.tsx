// File: ProduceFormEditDraft.tsx
import { useProduceFormLogic } from "@/lib/utils/farmer/useProduceFormLogic";
import { ProduceFormSteps } from "./ProduceFormSteps";

export const ProduceFormEditDraft = ({ initialData, onClose }: { initialData: any; onClose?: () => void}) => {
  const form = useProduceFormLogic(initialData);
  console.log("*****ProduceFormEditDraft props:", { initialData });
  return <ProduceFormSteps {...form} isActiveListing={false} />;
};