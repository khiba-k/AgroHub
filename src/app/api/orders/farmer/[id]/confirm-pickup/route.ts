// src/app/api/orders/farmer/[id]/confirm-pickup/route.ts
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

        if (breakdown.farmerShipped) {
            return badRequest("Already marked as picked up.");
        }

        if (breakdown.cancelledBy) {
            return badRequest("Cannot confirm pickup — order is cancelled.");
        }

        if (breakdown.status !== "READY_FOR_PICKUP") {
            return badRequest("Cannot confirm pickup — order not ready for pickup.");
        }

        const updated = await prisma.orderItemBreakdown.update({
            where: { id },
            data: {
                farmerShipped: true,
            },
        });

        return success(updated, "Pickup confirmed.");
    } catch (err) {
        console.error("[FARMER_CONFIRM_PICKUP_ERROR]", err);
        return serverError("Could not confirm pickup.");
    }
}
