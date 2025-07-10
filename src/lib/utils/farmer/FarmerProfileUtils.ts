import { z } from "zod";

export const farmUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Farm name is required"),
  description: z.string().min(1, "Description is required"),
  district: z.string().min(1, "District is required"),
  country: z.string().min(1, "Country is required"),
  contactNumber1: z.string().min(1, "Phone number 1 is required"),
  contactNumber2: z.string().min(1, "Phone number 2 is required"),
});


// All payment types
export const paymentMethodEnum = z.enum(["EFT", "MPESA", "ECOCASH"]);
export type PaymentMethodType = z.infer<typeof paymentMethodEnum>;

// 🏦 EFT base schema
const eftSchema = z.object({
  type: z.literal("EFT"),
  isPrimary: z.boolean(),
  accountHolder: z.string().min(1, "Account holder is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  accountType: z.string().min(1, "Account type is required"),
  bankName: z.string().min(1, "Bank name is required"),
  branchCode: z.string().min(1, "Branch code is required"),
});

// 📱 MPESA base schema
const mpesaSchemaBase = z.object({
  type: z.literal("MPESA"),
  isPrimary: z.boolean(),
  isMerchant: z.boolean(),

  // Optional initially; validated later
  merchantName: z.string().optional(),
  merchantNumber: z.string().optional(),
  recipientName: z.string().optional(),
  cellphoneNumber: z.string().optional(),
});

// 📱 ECOCASH base schema
const ecocashSchemaBase = z.object({
  type: z.literal("ECOCASH"),
  isPrimary: z.boolean(),
  isMerchant: z.boolean(),

  // Optional initially; validated later
  merchantName: z.string().optional(),
  merchantNumber: z.string().optional(),
  recipientName: z.string().optional(),
  cellphoneNumber: z.string().optional(),
});

// ✅ Valid discriminated union schema (ZodObjects only)
const rawPaymentMethodUnion = z.discriminatedUnion("type", [
  eftSchema,
  mpesaSchemaBase,
  ecocashSchemaBase,
]);

export const singlePaymentMethodSchema = rawPaymentMethodUnion.superRefine((data, ctx) => {
  if (data.type === "MPESA" || data.type === "ECOCASH") {
    if (data.isMerchant) {
      if (!data.merchantName) {
        ctx.addIssue({
          path: ["merchantName"],
          code: z.ZodIssueCode.custom,
          message: "Merchant name is required",
        });
      }
      if (!data.merchantNumber) {
        ctx.addIssue({
          path: ["merchantNumber"],
          code: z.ZodIssueCode.custom,
          message: "Merchant number is required",
        });
      }
    } else {
      if (!data.recipientName) {
        ctx.addIssue({
          path: ["recipientName"],
          code: z.ZodIssueCode.custom,
          message: "Recipient name is required",
        });
      }
      if (!data.cellphoneNumber) {
        ctx.addIssue({
          path: ["cellphoneNumber"],
          code: z.ZodIssueCode.custom,
          message: "Cellphone number is required",
        });
      }
    }
  }
});

// 🧾 Final full schema
export const paymentFormSchema = z.object({
  primaryMethod: singlePaymentMethodSchema,
  additionalMethods: z.array(singlePaymentMethodSchema).optional(),
});
