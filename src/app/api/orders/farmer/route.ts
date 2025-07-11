// src/app/api/orders/farmer/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export async function GET(req: NextRequest) {
    const farmId = req.nextUrl.searchParams.get("farmId");
    const tab = req.nextUrl.searchParams.get("tab");

    if (!farmId) {
        return NextResponse.json({ error: "Missing farmId" }, { status: 400 });
    }

    // Base where clause - all queries should exclude cancelled orders by default
    let where: any = {
        farmId,
    };

    // Build the where clause based on the tab
    switch (tab) {
        case "unconfirmed":
            where = {
                ...where,
                status: "PROCESSING",
                farmerConfirmed: false,
                cancelledBy: null,
            };
            break;
        case "confirmed":
            where = {
                ...where,
                status: "PROCESSING",
                farmerConfirmed: true,
                cancelledBy: null,
            };
            break;
        case "awaiting":
            where = {
                ...where,
                status: "READY_FOR_PICKUP",
                farmerConfirmed: true,
                farmerShipped: false,
                cancelledBy: null,
            };
            break;
        case "complete":
            where = {
                ...where,
                farmerShipped: true,
                cancelledBy: null,
            };
            break;
        case "cancelled":
            where = {
                ...where,
                cancelledBy: { not: null },
            };
            break;
        default:
            // For "all" or undefined tab, show all non-cancelled orders
            where = {
                ...where,
            };
    }

    try {
        // Add logging to debug the query
        console.log('Query where clause:', JSON.stringify(where, null, 2));

        const breakdowns = await prisma.orderItemBreakdown.findMany({
            where,
            include: {
                orderItem: {
                    include: {
                        order: true, // Include nested order for order number, dates, etc.
                    },
                },
                produceListing: {
                    include: {
                        produce: true, // Nested produce details
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        console.log(`Found ${breakdowns.length} order breakdowns for farmId: ${farmId}, tab: ${tab}`);

        return NextResponse.json(breakdowns);
    } catch (error) {
        console.error('Error fetching farmer orders:', error);
        return NextResponse.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}