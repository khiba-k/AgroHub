import { NextRequest } from "next/server";
import { success, badRequest, notFound, serverError } from "@/lib/utils/responseHandler";
import prisma from "@/lib/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) return badRequest("Listing ID is required");

    // Fetch listing + child status
    const listing = await prisma.produceListing.findUnique({
      where: { id },
      include: {
        activeDraftListing: true,
        harvestListings: true,
        soldListings: true,
      },
    });

    if (!listing) return notFound("Listing not found");

    const hasHarvest = listing.harvestListings.length > 0;

    if (hasHarvest) {
      // Harvest: delete children + listing
      await prisma.harvestListing.deleteMany({
        where: { listingId: id },
      });
      return success(null, "Harvest listing deleted");
    }


    return success(null, "Listing quantity set to 0");
  } catch (error) {
    return serverError("Failed to delete listing", error as Error);
  }
}
