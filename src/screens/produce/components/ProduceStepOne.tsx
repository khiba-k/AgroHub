import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { useProduceStore } from "@/lib/store/useProductStore";
import { useFarmStore } from "@/lib/store/userStores";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ProduceStepOne({
  category,
  setCategory,
  produceName,
  setProduceName,
  produceType,
  setProduceType,
  quantity,
  setQuantity,
  unit,
  location,
  setLocation,
  produceStatus,
  setProduceStatus,
  isActiveListing,
  produceMap,
  isEditing
}: any) {
  const isDisabled = isActiveListing;
  const { getSuggestions } = useProduceStore();

  const categorySuggestions = getSuggestions();
  const nameSuggestions = category ? getSuggestions(category) : [];
  const typeSuggestions = category && produceName ? getSuggestions(category, produceName) : [];

  const [estimatedIncome, setEstimatedIncome] = useState<number | null>(null);
  const {farmHasPaymentMethod} = useFarmStore();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  useEffect(() => {
    const price = produceMap?.[category]?.[produceName]?.[produceType]?.pricePerUnit;
    if (price && quantity) {
      const qty = parseFloat(quantity);
      const priceVal = parseFloat(price);
      if (!isNaN(qty) && !isNaN(priceVal)) {
        setEstimatedIncome(qty * priceVal);
        return;
      }
    }
    setEstimatedIncome(null);
  }, [quantity, category, produceName, produceType, produceMap]);

  useEffect(() => {
  if (produceStatus === "active" && !farmHasPaymentMethod) {
    setShowPaymentDialog(true);
  }
}, [produceStatus, farmHasPaymentMethod]);


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category */}
        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory} disabled={isDisabled}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categorySuggestions.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Produce Name */}
        <div>
          <Label>Produce Name</Label>
          <Select value={produceName} onValueChange={setProduceName} disabled={isDisabled}>
            <SelectTrigger>
              <SelectValue placeholder="Select name" />
            </SelectTrigger>
            <SelectContent>
              {nameSuggestions.map((name) => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Produce Type */}
        <div>
          <Label>Produce Type</Label>
          <Select value={produceType} onValueChange={setProduceType} disabled={isDisabled}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {typeSuggestions.length > 0 ? (
                typeSuggestions
                  .filter((type) => type.trim() !== "")
                  .map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))
              ) : (
                <SelectItem disabled value="no-type">No types available</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Quantity */}
        <div>
          <Label>Quantity</Label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        {/* Unit - now readonly */}
        <div>
          <Label>Unit</Label>
          <Input
            type="text"
            value={unit}
            readOnly
            disabled
          />
        </div>

        {/* Location */}
        <div>
          <Label>Location</Label>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Status */}
        {!isEditing && (
          <div>
            <Label>Status</Label>
            <Select value={produceStatus} onValueChange={setProduceStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="harvest">To Be Harvested</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Estimated Income */}
        {estimatedIncome !== null && (
          <div>
            <Label>Estimated Income</Label>
            <p className="mt-1 text-sm text-muted-foreground">M{estimatedIncome.toFixed(2)}</p>
          </div>
        )}
      </div>


<Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Missing Payment Details</DialogTitle>
    </DialogHeader>
    <div className="text-sm text-muted-foreground">
      To activate your listing, you need to provide at least one payment method.
      Please go to your profile and enter payment details.
    </div>
    <DialogFooter className="pt-4">
    </DialogFooter>
  </DialogContent>
</Dialog>
    </div>

  );
}
