"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

interface ServiceFormProps {
  initialData?: any;
}

export function ServiceForm({ initialData }: ServiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Close dialog or redirect
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Service Title</Label>
          <Input
            id="title"
            placeholder="e.g. Tractor Rental"
            defaultValue={initialData?.title}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select defaultValue={initialData?.category || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Equipment Rental">
                  Equipment Rental
                </SelectItem>
                <SelectItem value="Pest Control">Pest Control</SelectItem>
                <SelectItem value="Consulting">Consulting</SelectItem>
                <SelectItem value="Installation">Installation</SelectItem>
                <SelectItem value="Labor">Labor</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select defaultValue={initialData?.location || ""}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Eastern Region">Eastern Region</SelectItem>
                <SelectItem value="Central Region">Central Region</SelectItem>
                <SelectItem value="Western Region">Western Region</SelectItem>
                <SelectItem value="Northern Region">Northern Region</SelectItem>
                <SelectItem value="Southern Region">Southern Region</SelectItem>
                <SelectItem value="All Regions">All Regions</SelectItem>
                <SelectItem value="Virtual">Virtual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              placeholder="e.g. $50/hour"
              defaultValue={initialData?.price}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="availability">Availability</Label>
            <Select defaultValue={initialData?.availability || "Available"}>
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Limited">Limited Availability</SelectItem>
                <SelectItem value="Seasonal">Seasonal</SelectItem>
                <SelectItem value="Unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your service in detail..."
            className="min-h-[120px]"
            defaultValue={initialData?.description}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Service Images</Label>
          <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-1">
              Drag & drop images here or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG or WEBP, up to 5 images (max 5MB each)
            </p>
            <Button type="button" variant="outline" size="sm" className="mt-4">
              Upload Images
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements">Requirements or Prerequisites</Label>
          <Textarea
            id="requirements"
            placeholder="List any requirements for this service..."
            className="min-h-[80px]"
            defaultValue={initialData?.requirements}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Service"
              : "Create Service"}
        </Button>
      </div>
    </form>
  );
}
