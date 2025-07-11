// /app/api/agrohub/orders/route.ts

import { NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const tab = searchParams.get("tab");

    let whereClause = {};

    switch (tab) {
        case "processing":
            whereClause = { farmerConfirmed: false, status: "PROCESSING", cancelledBy: null };
            break;
        case "confirmed":
            whereClause = { farmerConfirmed: true, status: "PROCESSING", agrohubShipped: false, cancelledBy: null };
            break;
        case "ready":
            whereClause = { farmerConfirmed: true, status: "READY_FOR_PICKUP", agrohubShipped: false, cancelledBy: null };
            break;
        case "shipped":
            whereClause = { agrohubShipped: true, delivered: false, cancelledBy: null };
            break;
        case "delivered":
            whereClause = { delivered: true };
            break;
        case "cancelled":
            whereClause = { cancelledBy: { not: null } };
            break;
        default:
            whereClause = {}; // all
    }

    const breakdowns = await prisma.orderItemBreakdown.findMany({
        where: whereClause,
        include: {
            orderItem: {
                include: {
                    order: {
                        include: {
                            buyer: true,
                        },
                    },
                },
            },
            produceListing: {
                include: {
                    produce: true,
                    farm: {
                        include: {
                            paymentMethods: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return Response.json(breakdowns);
}
