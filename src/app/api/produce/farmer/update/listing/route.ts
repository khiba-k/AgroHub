import { updateProduceListing as doUpdateProduceListing } from '@/actions/produce/produceListingActions';
import prisma from '@/lib/prisma/prisma';
import { uploadImage } from '@/lib/supabase/uploadimage';
import { updateProduceListingSchema } from '@/lib/utils/farmer/FarmListingUtils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const payloadRaw = formData.get("payload") as string;
    if (!payloadRaw) throw new Error("Missing payload");

    const input = updateProduceListingSchema.parse(JSON.parse(payloadRaw));
    console.log("[UPDATE_INPUT]", input);

    const files = formData.getAll("images") as File[];
    const validFiles = files.filter(f => f instanceof File && f.size > 0);
    console.log("[UPDATE_FILES]", validFiles.length);

    // ✅ Get produce details for duplicate checks
    const produce = await prisma.produce.findUnique({
      where: { id: input.produceId },
      select: { category: true, name: true, type: true },
    });

    if (!produce) {
      return NextResponse.json(
        { success: false, error: "Invalid produce selected." },
        { status: 400 }
      );
    }

    // ✅ Check if listing is active/draft
    // if (input.status === "active" || input.status === "draft") {
    //   const existingActiveOrDraft = await prisma.produceListing.findFirst({
    //     where: {
    //       id: { not: input.id }, // ← exclude current listing!
    //       farmId: input.farmId,
    //       produce: {
    //         category: produce.category,
    //         name: produce.name,
    //         ...(produce.type ? { type: produce.type } : {}),
    //       },
    //       activeDraftListing: {
    //         status: {
    //           in: ["active", "draft"],
    //         },
    //       },
    //       location: input.location,
    //     },
    //   });

    //   if (existingActiveOrDraft) {
    //     return NextResponse.json(
    //       {
    //         success: false,
    //         error: "Another active or draft listing already exists with this produce and location.",
    //       },
    //       { status: 409 }
    //     );
    //   }
    // }

    // ✅ Check if listing is harvest
    // if (input.status === "harvest" && input.harvestDate) {
    //   const existingHarvest = await prisma.produceListing.findFirst({
    //     where: {
    //       id: { not: input.id }, // ← exclude current listing!
    //       farmId: input.farmId,
    //       produce: {
    //         category: produce.category,
    //         name: produce.name,
    //         ...(produce.type ? { type: produce.type } : {}),
    //       },
    //       location: input.location,
    //       harvestListings: {
    //         some: {
    //           harvestDate: input.harvestDate,
    //         },
    //       },
    //     },
    //   });

    //   if (existingHarvest) {
    //     return NextResponse.json(
    //       {
    //         success: false,
    //         error: "Another harvest listing already exists with this produce, location, and date.",
    //       },
    //       { status: 409 }
    //     );
    //   }
    // }

    // ✅ Proceed to upload new images
    const uploadedUrls: string[] = [];
    for (const file of validFiles) {
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

    const updatedListing = await doUpdateProduceListing({
      ...input,
      newImageUrls: uploadedUrls,
    });

    // 🔥 Delete flagged images
    if (input.removeImageIds && input.removeImageIds.length > 0) {
      await prisma.listingImg.deleteMany({
        where: {
          id: { in: input.removeImageIds },
          listingId: input.id,
        },
      });
    }

    // ✅ Insert new images if any
    if (uploadedUrls.length > 0) {
      await prisma.listingImg.createMany({
        data: uploadedUrls.map(url => ({
          listingId: input.id,
          url,
        })),
      });
    }

    const finalListing = await prisma.produceListing.findUnique({
      where: { id: input.id },
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
    console.error("[UPDATE_LISTING_ERROR]", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
