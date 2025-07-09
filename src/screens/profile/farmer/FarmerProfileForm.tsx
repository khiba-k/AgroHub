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
import { Checkbox } from "@/components/ui/checkbox"; // Checkbox is needed for additional methods

const FarmerProfileForm = () => {
  const [isEditingFarm, setIsEditingFarm] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [isSavingFarm, setIsSavingFarm] = useState(false);
  const [isSavingPayment, setIsSavingPayment] = useState(false);

  // usePaymentMethods will always be true as there's no "manual" option or toggle
  const [usePaymentMethods, setUsePaymentMethods] = useState(true); // Always true

  // State for the (now simply labeled) Payment Method
  const [primaryMethod, setPrimaryMethod] = useState<string | null>(null);

  // State for Additional Payment Methods (checkboxes)
  const [additionalMethods, setAdditionalMethods] = useState<string[]>([]);

  // State for the Alternative (Third) Payment Method
  const [alternativeMethod, setAlternativeMethod] = useState<string | null>(null);

  // Stores merchant status for each mobile money method (e.g., { "MPESA": { isMerchant: true }, "ECOCASH": { isMerchant: false } })
  const [mobileMethodDetails, setMobileMethodDetails] = useState<Record<string, { isMerchant: boolean | null }>>({});

  // All available payment methods
  const allPaymentMethods = ["EFT", "MPESA", "ECOCASH",]; // Included CPAY
  const mobileMoneyMethods = ["MPESA", "ECOCASH", ]; // Helper array for mobile money types

  // EFT Fields Renderer
  const renderEFTFields = (disabled: boolean, prefix: string = "") => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>{prefix}Account Holder</Label>
        <Input type="text" placeholder="Enter account holder name" disabled={!disabled} />
      </div>
      <div>
        <Label>{prefix}Account Number</Label>
        <Input type="text" placeholder="Enter account number" disabled={!disabled} />
      </div>
      <div>
        <Label>{prefix}Account Type</Label>
        <Input type="text" placeholder="Enter account type" disabled={!disabled} />
      </div>
      <div>
        <Label>{prefix}Bank Name</Label>
        <Input type="text" placeholder="Enter bank name" disabled={!disabled} />
      </div>
      <div className="md:col-span-2">
        <Label>{prefix}Branch Code</Label>
        <Input type="text" placeholder="Enter branch code" disabled={!disabled} />
      </div>
    </div>
  );

  // Mobile Money Fields Renderer (MPESA, ECOCASH, CPAY)
  // This function now manages its specific 'isMerchant' state via the 'mobileMethodDetails' map
  const renderMobileFields = (method: string, disabled: boolean, prefix: string = "") => {
    const currentIsMerchant = mobileMethodDetails[method]?.isMerchant ?? null;

    const handleMerchantStatusChange = (value: string) => {
      setMobileMethodDetails(prev => ({
        ...prev,
        [method]: { isMerchant: value === "merchant" }
      }));
    };

    return (
      <>
        <div className="pt-4">
          <Label>{prefix}Merchant account</Label>
          <Select
            onValueChange={handleMerchantStatusChange}
            value={currentIsMerchant === true ? "merchant" : currentIsMerchant === false ? "nonMerchant" : ""}
            disabled={!disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="merchant">Merchant</SelectItem>
              <SelectItem value="nonMerchant">Non-Merchant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {currentIsMerchant !== null && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {currentIsMerchant ? (
              <>
                <div>
                  <Label>{prefix}Merchant Name</Label>
                  <Input type="text" placeholder="Enter merchant name" disabled={!disabled} />
                </div>
                <div>
                  <Label>{prefix}Merchant Number</Label>
                  <Input type="tel" placeholder="Enter merchant number" disabled={!disabled} />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label>{prefix}Recipient Name</Label>
                  <Input type="text" placeholder="Enter recipient name" disabled={!disabled} />
                </div>
                <div>
                  <Label>{prefix}Cellphone Number</Label>
                  <Input type="tel" placeholder="Enter phone number" disabled={!disabled} />
                </div>
              </>
            )}
          </div>
        )}
      </>
    );
  };

  // Handle checkbox change for additional methods
  const handleAdditionalMethodChange = (method: string, checked: boolean) => {
    if (checked) {
      setAdditionalMethods((prev) => [...prev, method]);
      // If adding a mobile money method, initialize its details if needed
      if (mobileMoneyMethods.includes(method) && !mobileMethodDetails[method]) {
        setMobileMethodDetails(prev => ({ ...prev, [method]: { isMerchant: null } }));
      }
    } else {
      setAdditionalMethods((prev) => prev.filter((m) => m !== method));
      // If removing a mobile money method, clear its details
      if (mobileMoneyMethods.includes(method)) {
        setMobileMethodDetails(prev => {
          const newState = { ...prev };
          delete newState[method];
          return newState;
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 bg-white dark:bg-black text-black dark:text-white rounded shadow">
      {/* FARM DETAILS */}
      <section className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Farm Name</Label>
            <Input type="text" placeholder="Enter farm name" disabled={!isEditingFarm} />
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>District</Label>
              <Input type="text" placeholder="Maseru" disabled={!isEditingFarm} />
            </div>
            <div>
              <Label>Country</Label>
              <Input type="text" placeholder="Lesotho" disabled={!isEditingFarm} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Phone Number 1</Label>
              <div className="flex gap-2">
                <span className="border px-3 py-1 rounded-md bg-background">+266</span>
                <Input type="tel" placeholder="Phone number" disabled={!isEditingFarm} />
              </div>
            </div>
            <div>
              <Label>Phone Number 2 (optional)</Label>
              <div className="flex gap-2">
                <span className="border px-3 py-1 rounded-md bg-background">+266</span>
                <Input type="tel" placeholder="Phone number" disabled={!isEditingFarm} />
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
            onClick={async () => {
              if (isEditingFarm) {
                setIsSavingFarm(true);
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
            ) : isEditingFarm ? (
              "Save Changes"
            ) : (
              "Edit Farm Details"
            )}
          </Button>
        </div>
      </section>


      {/* PAYMENT OPTIONS */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold">Payment Options</h3>

        {/* Primary Payment Method Section (now simply "Select Payment Method") */}
        <div className="space-y-2">
          <Label>Select Payment Method</Label>
          <Select
            onValueChange={(value) => {
              // Cleanup old mobile method details if switching from a mobile method
              if (primaryMethod && mobileMoneyMethods.includes(primaryMethod) && !mobileMoneyMethods.includes(value)) {
                setMobileMethodDetails(prev => {
                  const newState = { ...prev };
                  delete newState[primaryMethod];
                  return newState;
                });
              }
              // If new value is mobile money, ensure an entry exists
              if (mobileMoneyMethods.includes(value) && !mobileMethodDetails[value]) {
                setMobileMethodDetails(prev => ({ ...prev, [value]: { isMerchant: null } }));
              }
              setPrimaryMethod(value);
            }}
            value={primaryMethod || ""}
            disabled={!isEditingPayment}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose payment method" />
            </SelectTrigger>
            <SelectContent>
              {allPaymentMethods.map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Render fields for this Payment Method */}
        {primaryMethod === "EFT" && (
          <div className="pt-4">{renderEFTFields(isEditingPayment, "")}</div>
        )}
        {/* FIX: Ensure primaryMethod is not null before using it in includes */}
        {primaryMethod && mobileMoneyMethods.includes(primaryMethod) && (
          <div className="pt-4">{renderMobileFields(primaryMethod, isEditingPayment, "")}</div>
        )}

        {/* Additional Payment Methods Section */}
        <div className="space-y-2 pt-6 border-t pt-4 mt-6">
          <h4 className="text-lg font-semibold mb-3">Additional Payment Methods (Optional)</h4>
          <div className="grid grid-cols-2 gap-4">
            {allPaymentMethods
              .filter((method) => method !== alternativeMethod)
              .map((method) => (
                <div key={method} className="flex items-center space-x-2">
                  <Checkbox
                    id={`additional-${method}`}
                    checked={additionalMethods.includes(method)}
                    onCheckedChange={(checked) =>
                      handleAdditionalMethodChange(method, checked as boolean)
                    }
                    disabled={!isEditingPayment}
                  />
                  <label
                    htmlFor={`additional-${method}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {method}
                  </label>
                </div>
              ))}
          </div>
        </div>

        {/* Render fields for Selected Additional Payment Methods */}
        {additionalMethods.map((method) => (
          <div key={`additional-fields-${method}`} className="pt-4 border-t mt-4 pt-6">
            {method === "EFT" && renderEFTFields(isEditingPayment, "")}
            {/* No change needed here as 'method' is guaranteed string within map */}
            {mobileMoneyMethods.includes(method) &&
              renderMobileFields(method, isEditingPayment, "")}
          </div>
        ))}

        {/* Alternative (Third) Payment Method Section
        <div className="space-y-2 pt-6 border-t pt-4 mt-6">
          <h4 className="text-lg font-semibold mb-3">Alternative Payment Method (Optional)</h4>
          <Select
            onValueChange={(value) => {
              // Cleanup old mobile method details if switching from a mobile method
              if (alternativeMethod && mobileMoneyMethods.includes(alternativeMethod) && !mobileMoneyMethods.includes(value)) {
                setMobileMethodDetails(prev => {
                  const newState = { ...prev };
                  delete newState[alternativeMethod];
                  return newState;
                });
              }
              // If new value is mobile money, ensure an entry exists
              if (mobileMoneyMethods.includes(value) && !mobileMethodDetails[value]) {
                setMobileMethodDetails(prev => ({ ...prev, [value]: { isMerchant: null } }));
              }
              setAlternativeMethod(value);
            }}
            value={alternativeMethod || ""}
            disabled={!isEditingPayment}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose alternative payment method" />
            </SelectTrigger>
            <SelectContent>
              {allPaymentMethods
                .map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div> */}

        {/* Render fields for the Alternative Payment Method */}
        {alternativeMethod === "EFT" && (
          <div className="pt-4">{renderEFTFields(isEditingPayment, "")}</div>
        )}
        {/* FIX: Ensure alternativeMethod is not null before using it in includes */}
        {alternativeMethod && mobileMoneyMethods.includes(alternativeMethod) && (
          <div className="pt-4">{renderMobileFields(alternativeMethod, isEditingPayment, "")}</div>
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