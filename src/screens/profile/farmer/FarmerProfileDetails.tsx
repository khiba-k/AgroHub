"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useFarmStore } from "@/lib/store/userStores";
import { farmUpdateSchema } from "@/lib/utils/farmer/FarmerProfileUtils";
import { updateFarm } from "@/lib/requests/FarmRequests";
import { useToastStore } from "@/lib/store/useToastStore";

const FarmerProfileDetails = () => {
  const [isEditingFarm, setIsEditingFarm] = React.useState(false);
  const [isSavingFarm, setIsSavingFarm] = React.useState(false);

  const {
    farmId,
    farmName,
    farmDescription,
    farmDistrict,
    farmCountry,
    farmContactNumber1,
    farmContactNumber2,
    setFarmName,
    setFarmDescription,
    setFarmDistrict,
    setFarmCountry,
    setFarmContactNumber1,
    setFarmContactNumber2,
  } = useFarmStore();

  const { showToast } = useToastStore();

  const handleSave = async () => {
    if (isEditingFarm) {
      setIsSavingFarm(true);
      try {
        if (!farmId || !farmName || !farmDescription || !farmDistrict || !farmCountry || !farmContactNumber1) {
          showToast(false, "All farm fields are required.");
          setIsSavingFarm(false);
          return;
        }

        const payload = {
          id: farmId,
          name: farmName,
          description: farmDescription,
          district: farmDistrict,
          country: farmCountry,
          contactNumber1: farmContactNumber1,
          contactNumber2: farmContactNumber2 || "",
        };

        farmUpdateSchema.parse(payload);

        await updateFarm(payload);
        showToast(true, "Farm updated successfully!");
        setIsEditingFarm(false);
      } catch (err: any) {
        let message = "Failed to update farm.";
        if (err.name === "ZodError" && err.errors) {
          message = err.errors.map((e: any) => `${e.message}`).join("\n");
        } else if (err.response?.data?.message) {
          message = err.response.data.message;
        }
        showToast(false, message);
      } finally {
        setIsSavingFarm(false);
      }
    } else {
      setIsEditingFarm(true);
    }
  };

  return (
    <section className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Farm Name</Label>
          <Input
            type="text"
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
            disabled={!isEditingFarm}
          />
        </div>

        <div>
          <Label>Farm Description</Label>
          <textarea
            value={farmDescription}
            onChange={(e) => setFarmDescription(e.target.value)}
            disabled={!isEditingFarm}
            maxLength={180}
            rows={4}
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
            placeholder="Briefly describe your farming activities..."
          />
          <p className="text-sm text-muted-foreground text-right">{farmDescription.length}/180</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>District</Label>
            <Input
              type="text"
              value={farmDistrict}
              onChange={(e) => setFarmDistrict(e.target.value)}
              disabled={!isEditingFarm}
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              type="text"
              value={farmCountry}
              onChange={(e) => setFarmCountry(e.target.value)}
              disabled={!isEditingFarm}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Phone Number 1</Label>
            <div className="flex gap-2">
              <span className="border px-3 py-1 rounded-md bg-background">+266</span>
              <Input
                type="tel"
                value={farmContactNumber1}
                onChange={(e) => setFarmContactNumber1(e.target.value)}
                disabled={!isEditingFarm}
              />
            </div>
          </div>
          <div>
            <Label>Phone Number 2 (optional)</Label>
            <div className="flex gap-2">
              <span className="border px-3 py-1 rounded-md bg-background">+266</span>
              <Input
                type="tel"
                value={farmContactNumber2}
                onChange={(e) => setFarmContactNumber2(e.target.value)}
                disabled={!isEditingFarm}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 gap-4">
        {isEditingFarm && (
          <Button variant="secondary" onClick={() => setIsEditingFarm(false)}>
            Cancel
          </Button>
        )}
        <Button
          onClick={handleSave}
          disabled={isSavingFarm}
          className="relative flex items-center justify-center min-w-[160px]"
        >
          {isSavingFarm ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isEditingFarm ? (
            "Save Changes"
          ) : (
            "Edit Farm Details"
          )}
        </Button>
      </div>
    </section>
  );
};

export default FarmerProfileDetails;
