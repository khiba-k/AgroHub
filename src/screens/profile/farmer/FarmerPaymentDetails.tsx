"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToastStore } from "@/lib/store/useToastStore";
import { paymentFormSchema, PaymentMethodType } from "@/lib/utils/farmer/FarmerProfileUtils";
import { useFarmStore } from "@/lib/store/userStores";
import { getFarmPaymentMethods, upsertFarmPaymentMethods } from "@/lib/requests/FarmRequests";

interface EFTData {
  accountHolder: string;
  accountNumber: string;
  accountType: string;
  bankName: string;
  branchCode: string;
}

interface MobileMoneyData {
  isMerchant: boolean | null;
  merchantName: string;
  merchantNumber: string;
  recipientName: string;
  cellphoneNumber: string;
}

interface PaymentMethodData {
  eft: EFTData;
  mobile: Record<string, MobileMoneyData>;
}

const FarmerPaymentDetails = () => {
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [isSavingPayment, setIsSavingPayment] = useState(false);

  const [primaryMethod, setPrimaryMethod] = useState<PaymentMethodType | null>(null);
  const [additionalMethods, setAdditionalMethods] = useState<PaymentMethodType[]>([]);

  const [primaryMethodData, setPrimaryMethodData] = useState<PaymentMethodData>({
    eft: {
      accountHolder: "",
      accountNumber: "",
      accountType: "",
      bankName: "",
      branchCode: "",
    },
    mobile: {},
  });

  const [additionalMethodsData, setAdditionalMethodsData] = useState<Record<string, PaymentMethodData>>({});

  const { showToast } = useToastStore();
  const { farmId } = useFarmStore();

  const allPaymentMethods: PaymentMethodType[] = ["EFT", "MPESA", "ECOCASH"];
  const mobileMoneyMethods: PaymentMethodType[] = ["MPESA", "ECOCASH"];

  useEffect(() => {
  const fetchMethods = async () => {
    if (!farmId) return;

    try {
      const methods = await getFarmPaymentMethods(farmId);

      const primary = methods.find((m) => m.isPrimary);
      const additional = methods.filter((m) => !m.isPrimary);

      if (primary) {
        setPrimaryMethod(primary.type);
        if (primary.type === "EFT") {
          setPrimaryMethodData((prev) => ({
            ...prev,
            eft: {
              accountHolder: primary.accountHolder || "",
              accountNumber: primary.accountNumber || "",
              accountType: primary.accountType || "",
              bankName: primary.bankName || "",
              branchCode: primary.branchCode || "",
            },
          }));
        } else {
          setPrimaryMethodData((prev) => ({
            ...prev,
            mobile: {
              [primary.type]: {
                isMerchant: primary.isMerchant ?? null,
                merchantName: primary.merchantName || "",
                merchantNumber: primary.merchantNumber || "",
                recipientName: primary.recipientName || "",
                cellphoneNumber: primary.cellphoneNumber || "",
              },
            },
          }));
        }
      }

      const additionalState: Record<string, PaymentMethodData> = {};
      const methodList: PaymentMethodType[] = [];

      additional.forEach((m) => {
        methodList.push(m.type);
        additionalState[m.type] = {
          eft: {
            accountHolder: m.accountHolder || "",
            accountNumber: m.accountNumber || "",
            accountType: m.accountType || "",
            bankName: m.bankName || "",
            branchCode: m.branchCode || "",
          },
          mobile: {
            [m.type]: {
              isMerchant: m.isMerchant ?? null,
              merchantName: m.merchantName || "",
              merchantNumber: m.merchantNumber || "",
              recipientName: m.recipientName || "",
              cellphoneNumber: m.cellphoneNumber || "",
            },
          },
        };
      });

      setAdditionalMethods(methodList);
      setAdditionalMethodsData(additionalState);
    } catch (err: any) {
      console.error("Failed to fetch payment methods", err);
      showToast(false, "Could not load payment methods");
    }
  };

  fetchMethods();
}, [farmId]);
  
  const initializeMobileData = (method: PaymentMethodType): MobileMoneyData => ({
    isMerchant: null,
    merchantName: "",
    merchantNumber: "",
    recipientName: "",
    cellphoneNumber: "",
  });

  const updatePrimaryEFT = (field: keyof EFTData, value: string) => {
    setPrimaryMethodData((prev) => ({
      ...prev,
      eft: { ...prev.eft, [field]: value },
    }));
  };

  const updatePrimaryMobile = (method: PaymentMethodType, field: keyof MobileMoneyData, value: any) => {
    setPrimaryMethodData((prev) => ({
      ...prev,
      mobile: {
        ...prev.mobile,
        [method]: {
          ...prev.mobile[method],
          [field]: value,
        },
      },
    }));
  };

  const updateAdditionalMethodData = (
  method: PaymentMethodType,
  type: "eft" | "mobile",
  field: string,
  value: any
) => {
  setAdditionalMethodsData((prev) => {
    const current = prev[method] || {
      eft: {
        accountHolder: "",
        accountNumber: "",
        accountType: "",
        bankName: "",
        branchCode: "",
      },
      mobile: {},
    };

    if (type === "eft") {
      return {
        ...prev,
        [method]: {
          ...current,
          eft: {
            ...current.eft,
            [field]: value,
          },
        },
      };
    } else {
      const currentMobile = current.mobile[method] || initializeMobileData(method);
      return {
        ...prev,
        [method]: {
          ...current,
          mobile: {
            ...current.mobile,
            [method]: {
              ...currentMobile,
              [field]: value,
            },
          },
        },
      };
    }
  });
};

  const renderEFTFields = (
    disabled: boolean,
    isPrimary: boolean = true,
    method?: PaymentMethodType,
    prefix: string = ""
  ) => {
    const data = isPrimary ? primaryMethodData.eft : additionalMethodsData[method!]?.eft;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["accountHolder", "accountNumber", "accountType", "bankName", "branchCode"].map((field, index) => (
          <div key={field} className={field === "branchCode" ? "md:col-span-2" : ""}>
            <Label>{prefix}{field.replace(/([A-Z])/g, " $1")}</Label>
            <Input
              type="text"
              placeholder={`Enter ${field}`}
              disabled={!disabled}
              value={data?.[field as keyof EFTData] || ""}
              onChange={(e) =>
                isPrimary
                  ? updatePrimaryEFT(field as keyof EFTData, e.target.value)
                  : updateAdditionalMethodData(method!, "eft", field, e.target.value)
              }
            />
          </div>
        ))}
      </div>
    );
  };

  const renderMobileFields = (
    method: PaymentMethodType,
    disabled: boolean,
    isPrimary: boolean = true,
    prefix: string = ""
  ) => {
    const data = isPrimary ? primaryMethodData.mobile[method] : additionalMethodsData[method]?.mobile?.[method];

    if (!data) return null;

    const handleMerchantStatusChange = (value: string) => {
      const isMerchant = value === "merchant";
      if (isPrimary) {
        updatePrimaryMobile(method, "isMerchant", isMerchant);
      } else {
        updateAdditionalMethodData(method, "mobile", "isMerchant", isMerchant);
      }
    };

    return (
      <>
        <div className="pt-4">
          <Label>{prefix}Merchant account</Label>
          <Select
            onValueChange={handleMerchantStatusChange}
            value={
              data?.isMerchant === true ? "merchant" : data?.isMerchant === false ? "nonMerchant" : ""
            }
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

        {data?.isMerchant !== undefined && data?.isMerchant !== null && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {data?.isMerchant ? (
              <>
                <div>
                  <Label>{prefix}Merchant Name</Label>
                  <Input
                    type="text"
                    disabled={!disabled}
                    value={data.merchantName || ""}
                    onChange={(e) =>
                      isPrimary
                        ? updatePrimaryMobile(method, "merchantName", e.target.value)
                        : updateAdditionalMethodData(method, "mobile", "merchantName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>{prefix}Merchant Number</Label>
                  <Input
                    type="tel"
                    disabled={!disabled}
                    value={data.merchantNumber || ""}
                    onChange={(e) =>
                      isPrimary
                        ? updatePrimaryMobile(method, "merchantNumber", e.target.value)
                        : updateAdditionalMethodData(method, "mobile", "merchantNumber", e.target.value)
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label>{prefix}Recipient Name</Label>
                  <Input
                    type="text"
                    disabled={!disabled}
                    value={data.recipientName || ""}
                    onChange={(e) =>
                      isPrimary
                        ? updatePrimaryMobile(method, "recipientName", e.target.value)
                        : updateAdditionalMethodData(method, "mobile", "recipientName", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>{prefix}Cellphone Number</Label>
                  <Input
                    type="tel"
                    disabled={!disabled}
                    value={data.cellphoneNumber || ""}
                    onChange={(e) =>
                      isPrimary
                        ? updatePrimaryMobile(method, "cellphoneNumber", e.target.value)
                        : updateAdditionalMethodData(method, "mobile", "cellphoneNumber", e.target.value)
                    }
                  />
                </div>
              </>
            )}
          </div>
        )}
      </>
    );
  };

  const handlePrimaryMethodChange = (method: PaymentMethodType) => {
    setPrimaryMethod(method);
    if (mobileMoneyMethods.includes(method) && !primaryMethodData.mobile[method]) {
      setPrimaryMethodData((prev) => ({
        ...prev,
        mobile: {
          ...prev.mobile,
          [method]: initializeMobileData(method),
        },
      }));
    }
  };

  const handleAdditionalMethodChange = (method: PaymentMethodType, checked: boolean) => {
    if (checked) {
      setAdditionalMethods((prev) => [...prev, method]);
      setAdditionalMethodsData((prev) => ({
        ...prev,
        [method]: {
          eft: {
            accountHolder: "",
            accountNumber: "",
            accountType: "",
            bankName: "",
            branchCode: "",
          },
          mobile: {
            [method]: initializeMobileData(method),
          },
        },
      }));
    } else {
      setAdditionalMethods((prev) => prev.filter((m) => m !== method));
      setAdditionalMethodsData((prev) => {
        const newState = { ...prev };
        delete newState[method];
        return newState;
      });
    }
  };

  const buildPaymentMethodObject = (method: PaymentMethodType, data: PaymentMethodData, isPrimary: boolean) => {
    const base = { type: method, isPrimary };
    if (method === "EFT") return { ...base, ...data.eft };

    const mobileData = data.mobile[method];
    return {
      ...base,
      isMerchant: mobileData?.isMerchant || false,
      merchantName: mobileData?.merchantName || "",
      merchantNumber: mobileData?.merchantNumber || "",
      recipientName: mobileData?.recipientName || "",
      cellphoneNumber: mobileData?.cellphoneNumber || "",
    };
  };

  const handleSave = async () => {
    if (!primaryMethod) {
      showToast(false, "Please select a primary payment method.");
      return;
    }

    setIsSavingPayment(true);
    try {
      const paymentMethods = [];

      paymentMethods.push(buildPaymentMethodObject(primaryMethod, primaryMethodData, true));

      additionalMethods.forEach((method) => {
        const methodData = additionalMethodsData[method];
        if (methodData) {
          paymentMethods.push(buildPaymentMethodObject(method, methodData, false));
        }
      });

      const validationResult = paymentFormSchema.safeParse({
        primaryMethod: paymentMethods[0],
        additionalMethods: paymentMethods.slice(1),
      });

      if (!validationResult.success) {
        const errors = validationResult.error.errors.map(
          (e) => `${e.message}${e.path.length ? ` (${e.path.join(".")})` : ""}`
        );
        showToast(false, errors.join("\n"));
        setIsSavingPayment(false);
        return;
      }

      await upsertFarmPaymentMethods(farmId, paymentMethods);
      showToast(true, "Payment methods saved successfully!");
      setIsEditingPayment(false);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || "Failed to save payment methods";
      showToast(false, errorMsg);
    } finally {
      setIsSavingPayment(false);
    }
  };

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-semibold">Payment Options</h3>

      {/* Primary Method */}
      <div className="space-y-2">
        <Label>Select Payment Method *</Label>
        <Select
          onValueChange={handlePrimaryMethodChange}
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

      {primaryMethod === "EFT" && renderEFTFields(isEditingPayment, true)}
      {primaryMethod && mobileMoneyMethods.includes(primaryMethod) &&
        renderMobileFields(primaryMethod, isEditingPayment, true)}

      {/* Additional Methods */}
      <div className="space-y-2 pt-6 border-t mt-6">
        <h4 className="text-lg font-semibold mb-3">Additional Payment Methods (Optional)</h4>
        <div className="grid grid-cols-2 gap-4">
          {allPaymentMethods.map((method) => (
              <div key={method} className="flex items-center space-x-2">
                <Checkbox
                  id={`additional-${method}`}
                  checked={additionalMethods.includes(method)}
                  onCheckedChange={(checked) =>
                    handleAdditionalMethodChange(method, checked as boolean)
                  }
                  disabled={!isEditingPayment}
                />
                <label htmlFor={`additional-${method}`}>{method}</label>
              </div>
            ))}
        </div>
      </div>

      {additionalMethods.map((method) => (
        <div key={`additional-fields-${method}`} className="pt-4 border-t mt-4">
          <h5 className="font-medium mb-3">{method} Details</h5>
          {method === "EFT" && renderEFTFields(isEditingPayment, false, method)}
          {mobileMoneyMethods.includes(method) &&
            renderMobileFields(method, isEditingPayment, false)}
        </div>
      ))}

      <div className="flex justify-end pt-4 gap-4">
        {isEditingPayment && (
          <Button variant="secondary" onClick={() => setIsEditingPayment(false)}>
            Cancel
          </Button>
        )}
        <Button
          onClick={() => (isEditingPayment ? handleSave() : setIsEditingPayment(true))}
          disabled={isSavingPayment}
          className="relative flex items-center justify-center min-w-[180px]"
        >
          {isSavingPayment ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isEditingPayment ? (
            "Save Payment Methods"
          ) : (
            "Edit Payment Options"
          )}
        </Button>
      </div>
    </section>
  );
};

export default FarmerPaymentDetails;
