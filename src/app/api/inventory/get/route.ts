// /app/api/produce/inventory/route.ts
import prisma from "@/lib/prisma/prisma";
import { badRequest, serverError, success } from "@/lib/utils/responseHandler";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const farmId = searchParams.get("farmId");

        if (!farmId) {
            return badRequest("Missing farmId");
        }

        const listings = await prisma.produceListing.findMany({
            where: { farmId },
            include: {
                produce: true,
                activeDraftListing: true,
                harvestListings: {
                    include: {
                      listing: {
                        include: {
                          produce: true,
                        },
                      },
                    },
                  },
                soldListings: true,
                images: true,
            },
        });

        console.log("[INVENTORY_FETCHED]", listings);

        const groups = new Map();

        for (const item of listings) {
            const key = `${item.location ?? ""}|${item.produce.category}|${item.produce.name}|${item.produce.type ?? ""}`;

            if (!groups.has(key)) {
                groups.set(key, {
                    location: item.location ?? "",
                    category: item.produce.category,
                    name: item.produce.name,
                    type: item.produce.type,
                    active: null,
                    harvests: [],
                    solds: [],
                    images: [],
                    description: null,
                    quantity: null,
                });
            }

            const group = groups.get(key);

            if (
                item.activeDraftListing?.status === "active" &&
                (item.quantity ?? 0) > 0
            ) {
                group.active = item;
                group.description = item.description;
                group.quantity = item.quantity;
            }

            if (item.harvestListings?.length) {
                group.harvests.push(...item.harvestListings);
            }

            if (item.soldListings?.length) {
                group.solds.push(...item.soldListings);
            }

            if (item.images?.length) {
                group.images.push(...item.images);
            }

            if (!group.active && !group.description) {
                group.description = item.description;
            }
        }

        // ✅ FILTER: Only keep groups that have meaningful data
        const result = Array.from(groups.values())
            .filter(
                (group) =>
                    (group.quantity ?? 0) > 0 ||
                    group.harvests.length > 0 ||
                    group.solds.length > 0
            )
            .map((group) => ({
                ...group,
                quantity: group.quantity ?? 0,
            }));

        return success(result, "Inventory fetched");
    } catch (error) {
        return serverError(
            "Failed to fetch produce inventory",
            error instanceof Error ? error : new Error(String(error))
        );
    }
}
