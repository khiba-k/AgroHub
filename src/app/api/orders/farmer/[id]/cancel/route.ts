import { NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { success, badRequest, serverError } from "@/lib/utils/responseHandler";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const breakdown = await prisma.orderItemBreakdown.findUnique({
      where: { id },
    });

    if (!breakdown) {
      return badRequest("Order breakdown not found.");
    }

    if (breakdown.agrohubConfirmsPayment) {
      return badRequest(
        "Cannot cancel — Agrohub has already confirmed payment."
      );
    }

    if (breakdown.cancelledBy) {
      return badRequest("Order already cancelled.");
    }

    const cancelled = await prisma.orderItemBreakdown.update({
      where: { id },
      data: {
        cancelledBy: "FARMER", // ✅ matches your enum `OrderParty.FARMER`
      },
    });

    return success(cancelled, "Order cancelled by farmer.");
  } catch (err) {
    console.error("[FARMER_CANCEL_ORDER_ERROR]", err);
    return serverError("Could not cancel order.");
  }
}
