// File: app/api/produce/farmer/add/listings/route.ts

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

    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const quantity = Number(formData.get("quantity"));
    const produceId = formData.get("produceId") as string;
    const farmId = formData.get("farmId") as string;
    const status = formData.get("status") as string;
    const harvestDateRaw = formData.get("harvestDate") as string | null;
    const harvestDate = harvestDateRaw ? new Date(harvestDateRaw) : undefined;

    const files = formData.getAll("images") as File[];
    const validFiles = files.filter(file => file instanceof File && file.size > 0);

    const input = createProduceListingSchema.parse({
      location,
      description,
      quantity,
      produceId,
      farmId,
      status,
      harvestDate,
    });

    // ✅ Get produce details once
    const produce = await prisma.produce.findUnique({
      where: { id: produceId },
      select: { category: true, name: true, type: true },
    });

    if (!produce) {
      return NextResponse.json(
        { success: false, error: "Invalid produce selected." },
        { status: 400 }
      );
    }

    // ✅ ACTIVE/DRAFT DUPLICATE CHECK
    if (status === "active" || status === "draft") {
      const existingActiveOrDraft = await prisma.produceListing.findFirst({
        where: {
          farmId,
          produce: {
            category: produce.category,
            name: produce.name,
            ...(produce.type ? { type: produce.type } : {}),
          },
          activeDraftListing: {
            status: {
              in: ['active', 'draft'],
            },
          },
          location: input.location,
          quantity: {
            not: 0,
          },
        },
      });

      if (existingActiveOrDraft) {
        return NextResponse.json(
          {
            success: false,
            error: "You already have an active or draft listing for this produce. Please edit the existing one instead.",
          },
          { status: 409 }
        );
      }
    }

    // ✅ HARVEST DUPLICATE CHECK
    if (status === "harvest") {
      if (!harvestDate) {
        return NextResponse.json(
          { success: false, error: "Harvest date is required for harvest listings." },
          { status: 400 }
        );
      }

      const existingHarvest = await prisma.produceListing.findFirst({
        where: {
          farmId,
          produce: {
            category: produce.category,
            name: produce.name,
            ...(produce.type ? { type: produce.type } : {}),
          },
          location: input.location,
          harvestListings: {
            some: {
              harvestDate: harvestDate,
            },
          },
        },
      });

      if (existingHarvest) {
        return NextResponse.json(
          {
            success: false,
            error: "You already have a harvest listing for this produce with the same location and date.",
          },
          { status: 409 }
        );
      }
    }

    // ✅ Create the listing in the action
    const result = await createProduceListing(input);

    if (!result.success || !result.data) {
      return NextResponse.json(
        { success: false, error: "Failed to create listing." },
        { status: 500 }
      );
    }

    const listingId = result.data.id;

    const uploadedUrls: string[] = [];
    for (const file of validFiles) {
      const { imageUrl, error } = await uploadImage({
        file,
        bucket: "agrohubpics",
        folder: "listings",
      });

      if (error || !imageUrl) {
        console.error("[UPLOAD_IMAGE_ERROR]", error);
        continue;
      }

      uploadedUrls.push(imageUrl);
    }

    if (uploadedUrls.length > 0) {
      await prisma.listingImg.createMany({
        data: uploadedUrls.map((url) => ({
          listingId,
          url,
        })),
      });
    }

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
        { success: false, error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Server error occurred while creating listing." },
      { status: 500 }
    );
  }
}
