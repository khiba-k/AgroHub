"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const FarmerProfile = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 bg-white dark:bg-black text-black dark:text-white rounded shadow">
      {/* <h2 className="text-2xl font-bold">Farmer Profile</h2> */}

      {/*FARM DETAI */}
      <section className="space-y-6">

        <div className="space-y-4">
          {/* Farm Name */}
          <div>
            <Label>Farm Name</Label>
            <Input
              type="text"
              // disabled={!isEditing}
              placeholder="Enter farm name"
              className="w-full"
            />
          </div>

          {/* Farm Description */}
          <div>
            <Label>Farm Description</Label>
            <textarea
              // disabled={!isEditing}
              maxLength={180}
              rows={4}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
              placeholder="Briefly describe your farming activities..."
            />
            <p className="text-sm text-muted-foreground text-right">0/180</p>
          </div>

          {/* District & Country */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <Label>District</Label>
    <Input
      type="text"
      placeholder="Maseru"
      className="w-full"
    />
  </div>
  <div>
    <Label>Country</Label>
    <Input
      type="text"
      placeholder="Lesotho"
      className="w-full"
    />
  </div>
</div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Phone Number 1</Label>
              <div className="flex gap-2">
                <span className="border px-3 py-1 rounded-md bg-background">+266</span>
                <Input
                  type="tel"
                  // disabled={!isEditing}
                  placeholder="Phone number"
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label>Phone Number 2 (optional)</Label>
              <div className="flex gap-2">
                <span className="border px-3 py-1 rounded-md bg-background">+266</span>
                <Input
                  type="tel"
                  // disabled={!isEditing}
                  placeholder="Phone number"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*PAYMENT OPTIONS*/}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Payment Options</h3>

        <div>
          <Label>Select Payment Method</Label>
          <Select
            onValueChange={setPaymentMethod}
            // disabled={!isEditing}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose payment option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EFT">EFT</SelectItem>
              <SelectItem value="MPESA">MPESA</SelectItem>
              <SelectItem value="ECOCASH">ECO CASH</SelectItem>
              <SelectItem value="CPAY">C PAY</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* EFT Fields */}
        {paymentMethod === "EFT" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Bank Name</Label>
              <Input
                type="text"
                // disabled={!isEditing}
                placeholder="Enter bank name"
              />
            </div>
            <div>
              <Label>Account Name</Label>
              <Input
                type="text"
                // disabled={!isEditing}
                placeholder="Enter account name"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Account Number</Label>
              <Input
                type="text"
                // disabled={!isEditing}
                placeholder="Enter account number"
              />
            </div>
          </div>
        )}

        {/* Non-EFT Fields */}
        {paymentMethod && paymentMethod !== "EFT" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>First and Last Name</Label>
              <Input
                type="text"
                // disabled={!isEditing}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <Label>Cell Phone Number</Label>
              <Input
                type="tel"
                // disabled={!isEditing}
                placeholder="Enter phone number"
              />
            </div>
          </div>
        )}
      </section>

      {/*BUTTONS*/}
      <div className="flex justify-end pt-4 gap-4">
        {isEditing && (
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        )}
        <Button onClick={() => setIsEditing((prev) => !prev)}>
          {isEditing ? "Save Changes" : "Edit"}
        </Button>
      </div>
    </div>
  );
};

export default FarmerProfile;
