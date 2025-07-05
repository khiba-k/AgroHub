import { useProduceFormLogic } from "@/lib/utils/farmer/useProduceFormLogic";
import { ProduceFormSteps } from "./ProduceFormSteps";

export const ProduceFormEditActive = ({ initialData }: { initialData: any }) => {
  const form = useProduceFormLogic(initialData);
  return <ProduceFormSteps {...form} isActiveListing={true} />;
};