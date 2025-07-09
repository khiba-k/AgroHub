"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const FarmerProfileForm = () => {
  const [isEditingFarm, setIsEditingFarm] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [isSavingFarm, setIsSavingFarm] = useState(false);
  const [isSavingPayment, setIsSavingPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 bg-white dark:bg-black text-black dark:text-white rounded shadow">

      {/* FARM DETAILS */}
      <section className="space-y-6">
        <div className="space-y-4">
          {/* Farm Name */}
          <div>
            <Label>Farm Name</Label>
            <Input type="text" placeholder="Enter farm name" className="w-full" disabled={!isEditingFarm} />
          </div>

          {/* Farm Description */}
          <div>
            <Label>Farm Description</Label>
            <textarea
              disabled={!isEditingFarm}
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
              <Input type="text" placeholder="Maseru" className="w-full" disabled={!isEditingFarm} />
            </div>
            <div>
              <Label>Country</Label>
              <Input type="text" placeholder="Lesotho" className="w-full" disabled={!isEditingFarm} />
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Phone Number 1</Label>
              <div className="flex gap-2">
                <span className="border px-3 py-1 rounded-md bg-background">+266</span>
                <Input type="tel" placeholder="Phone number" className="flex-1" disabled={!isEditingFarm} />
              </div>
            </div>
            <div>
              <Label>Phone Number 2 (optional)</Label>
              <div className="flex gap-2">
                <span className="border px-3 py-1 rounded-md bg-background">+266</span>
                <Input type="tel" placeholder="Phone number" className="flex-1" disabled={!isEditingFarm} />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end pt-4 gap-4">
          {isEditingFarm && (
            <Button variant="secondary" onClick={() => setIsEditingFarm(false)}>
              Cancel
            </Button>
          )}
          <Button
            onClick={async () => {
              if (isEditingFarm) {
                setIsSavingFarm(true);
                // Simulate save
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setIsEditingFarm(false);
                setIsSavingFarm(false);
              } else {
                setIsEditingFarm(true);
              }
            }}
            disabled={isSavingFarm}
            className="relative flex items-center justify-center min-w-[160px]"
          >
            {isSavingFarm ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              isEditingFarm ? "Save Changes" : "Edit Farm Details"
            )}
          </Button>
        </div>
      </section>

      {/* PAYMENT OPTIONS */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Payment Options</h3>

        <div>
          <Label>Select Payment Method</Label>
          <Select onValueChange={setPaymentMethod} disabled={!isEditingPayment}>
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
              <Input type="text" placeholder="Enter bank name" disabled={!isEditingPayment} />
            </div>
            <div>
              <Label>Account Name</Label>
              <Input type="text" placeholder="Enter account name" disabled={!isEditingPayment} />
            </div>
            <div className="md:col-span-2">
              <Label>Account Number</Label>
              <Input type="text" placeholder="Enter account number" disabled={!isEditingPayment} />
            </div>
          </div>
        )}

        {/* Non-EFT Fields */}
        {paymentMethod && paymentMethod !== "EFT" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>First and Last Name</Label>
              <Input type="text" placeholder="Enter full name" disabled={!isEditingPayment} />
            </div>
            <div>
              <Label>Cell Phone Number</Label>
              <Input type="tel" placeholder="Enter phone number" disabled={!isEditingPayment} />
            </div>
          </div>
        )}

        {/* Payment Buttons */}
        <div className="flex justify-end pt-4 gap-4">
          {isEditingPayment && (
            <Button variant="secondary" onClick={() => setIsEditingPayment(false)}>
              Cancel
            </Button>
          )}
          <Button
            onClick={async () => {
              if (isEditingPayment) {
                setIsSavingPayment(true);
                // Simulate save
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setIsEditingPayment(false);
                setIsSavingPayment(false);
              } else {
                setIsEditingPayment(true);
              }
            }}
            disabled={isSavingPayment}
            className="relative flex items-center justify-center min-w-[180px]"
          >
            {isSavingPayment ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isEditingPayment ? (
              "Save Payment Info"
            ) : (
              "Edit Payment Options"
            )}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FarmerProfileForm;
