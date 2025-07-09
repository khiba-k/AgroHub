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

    const activeDraft = listing.activeDraftListing;
    const hasHarvest = listing.harvestListings.length > 0;

    if (activeDraft) {
      if (activeDraft.status === "active") {
        // Active listings: set quantity to 0 instead of delete
        await prisma.produceListing.update({
          where: { id },
          data: { quantity: 0 },
        });

        return success(null, "Active listing quantity set to 0");
      }

      if (activeDraft.status === "draft") {
        // Draft: delete child + listing
        await prisma.activeDraftListing.delete({
          where: { listingId: id },
        });

        await prisma.listingImg.deleteMany({
          where: { listingId: id },
        });

        await prisma.produceListing.delete({
          where: { id },
        });

        return success(null, "Draft listing deleted");
      }
    }

    if (hasHarvest) {
      // Harvest: delete children + listing
      await prisma.harvestListing.deleteMany({
        where: { listingId: id },
      });

      await prisma.listingImg.deleteMany({
        where: { listingId: id },
      });

      await prisma.produceListing.delete({
        where: { id },
      });

      return success(null, "Harvest listing deleted");
    }

    // Fallback: just set quantity to 0
    await prisma.produceListing.update({
      where: { id },
      data: { quantity: 0 },
    });

    return success(null, "Listing quantity set to 0");
  } catch (error) {
    return serverError("Failed to delete listing", error as Error);
  }
}
