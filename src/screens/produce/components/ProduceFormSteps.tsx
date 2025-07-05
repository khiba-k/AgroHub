import { Button } from "@/components/ui/button";
import { ProduceStepOne } from "./ProduceStepOne";
import { ProduceStepTwo } from "./ProduceStepTwo";
import { HarvestDateDialog } from "./HarvestDialog";

export function ProduceFormSteps({
  step,
  setStep,
  handleSubmit,
  isSubmitting,
  showHarvestDialog,
  setShowHarvestDialog,
  isActiveListing,
  ...form
}: any) {
    console.log("ProduceFormSteps props:", {
        step,
        setStep,
        handleSubmit,
        isSubmitting,
        showHarvestDialog,
        setShowHarvestDialog,
        isActiveListing,
        ...form
        });
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      {step === 1 && (
        <ProduceStepOne {...form} isActiveListing={isActiveListing} />
      )}
      {step === 2 && (
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
              ? "Saving..."
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
      />
    </form>
  );
}
