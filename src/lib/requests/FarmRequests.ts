import axios from "axios";
import { PaymentMethodType } from "@/lib/utils/farmer/FarmerProfileUtils";


export const updateFarm = async (data: {
    id: string;
    name: string;
    description: string;
    district: string;
    country: string;
    contactNumber1: string;
    contactNumber2: string;
}) => {
    const response = await axios.patch("/api/user/farm/edit", data);
    return response.data;
};

export const upsertFarmPaymentMethods = async (farmId: string, paymentMethods: any[]) => {
  const res = await axios.post("/api/user/farm/payment-methods", {
    farmId,
    paymentMethods,
  });

  return res.data;
}

export const getFarmPaymentMethods = async (farmId: string) => {
  const res = await axios.get(`/api/user/farm/payment-methods/${farmId}`);
  return res.data.data.methods as {
    id: string;
    type: PaymentMethodType;
    isPrimary: boolean;
    accountHolder?: string;
    accountNumber?: string;
    accountType?: string;
    bankName?: string;
    branchCode?: string;
    isMerchant?: boolean;
    merchantName?: string;
    merchantNumber?: string;
    recipientName?: string;
    cellphoneNumber?: string;
  }[];
};