import { createProduceListing } from '@/actions/produce/produceListingActions';
import prisma from '@/lib/prisma/prisma';
import { uploadImage } from '@/lib/supabase/uploadimage';
import { createProduceListingSchema } from '@/lib/utils/farmer/FarmListingUtils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log("[ADD_LISTING_FORM_DATA]", formData);

    // ✅ Extract fields:
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const quantity = Number(formData.get("quantity"));
    const produceId = formData.get("produceId") as string;
    const farmId = formData.get("farmId") as string;
    const status = formData.get("status") as string;
    const harvestDateRaw = formData.get("harvestDate") as string | null;
    const harvestDate = harvestDateRaw ? new Date(harvestDateRaw) : undefined;

    // ✅ Process uploaded files:
    const files = formData.getAll("images") as File[];
    console.log("[ADD_LISTING_FILES]", files);

    // ✅ Validate main data:
    const input = createProduceListingSchema.parse({
      location,
      description,
      quantity,
      produceId,
      farmId,
      status,
      harvestDate,
      images: files.map(file => file.name), // Pass file names to validate count
    });

    // ✅ Create listing:
    const result = await createProduceListing(input);

    if (!result.success || !result.data) {
      return NextResponse.json(
        { success: false, error: "Failed to create listing" },
        { status: 500 }
      );
    }

    const listingId = result.data.id;
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const { imageUrl, error } = await uploadImage({
        file,
        bucket: "agrohubpics",
        folder: "listings",
      });

      if (error || !imageUrl) {
        console.error("Upload error:", error);
        continue;
      }

      uploadedUrls.push(imageUrl);
    }

    // ✅ Save image URLs in DB:
    if (uploadedUrls.length > 0) {
      await prisma.listingImg.createMany({
        data: uploadedUrls.map((url) => ({
          listingId,
          url,
        })),
      });
    }

    // ✅ Fetch final listing with images:
    const finalListing = await prisma.produceListing.findUnique({
      where: { id: listingId },
      include: {
        produce: true,
        farm: true,
        images: true,
        activeDraftListing: true,
        harvestListings: true,
      },
    });

    return NextResponse.json({ success: true, data: finalListing });
  } catch (error) {
    console.error("[ADD_LISTING_ERROR]", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Server error occurred while creating produce listing",
      },
      { status: 500 }
    );
  }
}
