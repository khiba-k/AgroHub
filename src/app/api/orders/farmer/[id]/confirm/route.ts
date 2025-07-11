// src/app/api/farmer/orders/[id]/confirm/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const breakdownId = params.id;

    try {
        const breakdown = await prisma.orderItemBreakdown.update({
            where: { id: breakdownId },
            data: {
                farmerConfirmed: true,
            },
            include: {
                produceListing: {
                    include: {
                        activeDraftListing: true,
                    },
                },
            },
        });

        // Reduce quantity
        if (breakdown.produceListing.activeDraftListing?.status === "active") {
            await prisma.produceListing.update({
                where: { id: breakdown.produceListingId },
                data: {
                    quantity: {
                        decrement: breakdown.quantity,
                    },
                },
            });

            await prisma.soldListing.upsert({
                where: { listingId: breakdown.produceListingId },
                update: { soldPrice: { increment: breakdown.price } },
                create: {
                    listingId: breakdown.produceListingId,
                    soldPrice: breakdown.price,
                },
            });
        }

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Failed to confirm" }, { status: 500 });
    }
}
