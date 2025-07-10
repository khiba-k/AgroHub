import { NextRequest } from "next/server";
import { z } from "zod";
import { success,
  badRequest,
  serverError,
  notFound, } from "@/lib/utils/responseHandler";
import { paymentFormSchema } from "@/lib/utils/farmer/FarmerProfileUtils";
import prisma from "@/lib/prisma/prisma";

// POST /api/user/farm/payment-methods
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod
    const schema = z.object({
      farmId: z.string().uuid(),
      paymentMethods: z.array(paymentFormSchema.shape.primaryMethod),
    });

    const result = schema.safeParse(body);

    if (!result.success) {
      const msg = result.error.errors
        .map((e) => `${e.message} (${e.path.join(".")})`)
        .join("; ");
      return badRequest(msg);
    }

    const { farmId, paymentMethods } = result.data;

    // Check that farm exists
    const farm = await prisma.farm.findUnique({ where: { id: farmId } });
    if (!farm) {
      return notFound("Farm not found");
    }

    // 🧹 Delete previous payment methods
    await prisma.paymentMethod.deleteMany({ where: { farmId } });

    // 💾 Create new payment methods
    const createOps = paymentMethods.map((pm) =>
      prisma.paymentMethod.create({
        data: {
          farmId,
          type: pm.type,
          isPrimary: pm.isPrimary,
          isMerchant: pm.type !== "EFT" ? pm.isMerchant : undefined,

          // EFT fields
          accountHolder: pm.type === "EFT" ? pm.accountHolder : undefined,
          accountNumber: pm.type === "EFT" ? pm.accountNumber : undefined,
          accountType: pm.type === "EFT" ? pm.accountType : undefined,
          bankName: pm.type === "EFT" ? pm.bankName : undefined,
          branchCode: pm.type === "EFT" ? pm.branchCode : undefined,

          // Mobile merchant
          merchantName: pm.type !== "EFT" && pm.isMerchant ? pm.merchantName : undefined,
          merchantNumber: pm.type !== "EFT" && pm.isMerchant ? pm.merchantNumber : undefined,

          // Mobile personal
          recipientName: pm.type !== "EFT" && !pm.isMerchant ? pm.recipientName : undefined,
          cellphoneNumber: pm.type !== "EFT" && !pm.isMerchant ? pm.cellphoneNumber : undefined,
        },
      })
    );

    await Promise.all(createOps);

    // ✅ Update flag on Farm
    await prisma.farm.update({
      where: { id: farmId },
      data: { hasPaymentMethod: true },
    });

    return success(null, "Payment methods saved successfully.");
  } catch (error) {
    return serverError("Could not save payment methods", error as Error);
  }
}

