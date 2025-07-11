import { NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { success, badRequest, serverError } from "@/lib/utils/responseHandler";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
        const breakdown = await prisma.orderItemBreakdown.findUnique({
            where: { id },
        });

        if (!breakdown) {
            return badRequest("Order breakdown not found.");
        }

        if (breakdown.farmerConfirmsPayment) {
            return badRequest("Payment already confirmed by farmer.");
        }

        // Mark only the farmer’s side as confirmed
        const updated = await prisma.orderItemBreakdown.update({
            where: { id },
            data: {
                farmerConfirmsPayment: true,
            },
        });

        return success(updated, "Payment confirmed by farmer.");
    } catch (err) {
        console.error("[FARMER_CONFIRM_PAYMENT_ERROR]", err);
        return serverError("Could not confirm payment.");
    }
}
