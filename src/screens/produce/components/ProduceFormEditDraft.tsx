// File: ProduceFormEditDraft.tsx
import { useProduceFormLogic } from "@/lib/utils/farmer/useProduceFormLogic";
import { ProduceFormSteps } from "./ProduceFormSteps";

export const ProduceFormEditDraft = ({ initialData }: { initialData: any }) => {
  const form = useProduceFormLogic(initialData);
  return <ProduceFormSteps {...form} isActiveListing={false} />;
};