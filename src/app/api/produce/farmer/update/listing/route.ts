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

    // 🔥 Delete only images flagged for removal
    if (input.removeImageIds && input.removeImageIds.length > 0) {
      await prisma.listingImg.deleteMany({
        where: {
          id: { in: input.removeImageIds },
          listingId: input.id,
        },
      });
    }

    // ✅ Insert only new ones
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
      },
    });

    return NextResponse.json({ success: true, data: finalListing });

  } catch (error) {
    console.error("[UPDATE_LISTING_ERROR]", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: "Invalid input", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

