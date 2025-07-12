import { Button } from "@/components/ui/button";
import { ProduceStepOne } from "./ProduceStepOne";
import { ProduceStepTwo } from "./ProduceStepTwo";
import { HarvestDateDialog } from "./HarvestDialog";
import { Loader2 } from "lucide-react";

export function ProduceFormSteps({
  step,
  setStep,
  handleSubmit,
  isSubmitting,
  showHarvestDialog,
  setShowHarvestDialog,
  isActiveListing,
  isEditing,
  ...form
}: any) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6 mx-auto">
      {step === 1 && (
        <ProduceStepOne {...form} isActiveListing={isActiveListing} isEditing={isEditing}/>
      )}
      {step === 2 && form.produceStatus !== "harvest" && (
        <ProduceStepTwo {...form} isActiveListing={isActiveListing} />
      )}

      <div className="flex justify-between pt-6 border-t mt-4">
        {step > 1 && (
          <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        )}
        {step < 2 && (
          <Button type="button" onClick={() => setStep(step + 1)}>
            Next
          </Button>
        )}
        {step === 2 && (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? <><Loader2 /></>
              : form.initialData
                ? "Update Listing"
                : "Create Listing"}
          </Button>
        )}
      </div>

      <HarvestDateDialog
        open={showHarvestDialog}
        onOpenChange={setShowHarvestDialog}
        harvestDate={form.harvestDate}
        setHarvestDate={form.setHarvestDate}
        handleHarvestDateSubmit={form.handleHarvestDateSubmit}
        isSubmitting={isSubmitting}
        produceName={form.produceName}
        setEditHarvestDate={form.setEditHarvestDate} // Pass the function to set edit mode
      />
    </form>
  );
}
