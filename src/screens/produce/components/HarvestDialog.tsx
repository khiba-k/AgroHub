// File: HarvestDateDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

export function HarvestDateDialog({
  open,
  onOpenChange,
  harvestDate,
  setHarvestDate,
  handleHarvestDateSubmit,
  isSubmitting,
  produceName,
  setEditHarvestDate
}: any) {
  useEffect(() => {
    if (harvestDate) {
      console.log("Harvest date already set:", harvestDate);
      setEditHarvestDate(true);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Harvest Date</DialogTitle>
          <DialogDescription>
            When do you expect to harvest your {produceName}?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Expected Harvest Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {harvestDate ? format(harvestDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={harvestDate}
                  onSelect={setHarvestDate}
                  className="rounded-md border shadow-sm"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleHarvestDateSubmit} disabled={!harvestDate || isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : "Set Harvest Date"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}