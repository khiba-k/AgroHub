import { useState } from "react";
import { useProduceFormLogic } from "@/lib/utils/farmer/useProduceFormLogic";
import { ProduceFormSteps } from "./ProduceFormSteps";

export function ProduceFormCreate() {
  const [step, setStep] = useState(1);
  const form = useProduceFormLogic(null, { step, setStep });
  return <ProduceFormSteps {...form} isActiveListing={false} />;
}