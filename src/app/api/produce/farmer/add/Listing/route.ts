import { createProduceListing } from '@/actions/produce/produceListingActions';
import prisma from '@/lib/prisma/prisma';
import { uploadImage } from '@/lib/supabase/uploadimage';
import { convertBlobUrlToFile, createProduceListingSchema } from '@/lib/utils/farmer/FarmListingUtils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      location,
      description,
      quantity,
      produceId,
      farmId,
      status,
      harvestDate,
      images = [],
    } = body;

    // Validate input with Zod
    const input = createProduceListingSchema.parse({
      location,
      description,
      quantity,
      produceId,
      farmId,
      status,
      harvestDate,
      images: [], // handled separately after listing creation
    });

    // Create listing first (without images)
    const result = await createProduceListing(input);

    if (!result.success || !result.data) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create listing',
        },
        { status: 500 }
      );
    }

    const listingId = result.data.id;
    const uploadedUrls: string[] = [];

    for (const blobUrl of images) {
      try {
        const file = await convertBlobUrlToFile(blobUrl);

        const { imageUrl, error } = await uploadImage({
          file,
          bucket: 'agrohubpics',
          folder: 'listings',
        });

        if (error || !imageUrl) {
          console.error('Upload error:', error);
          continue;
        }

        uploadedUrls.push(imageUrl);
      } catch (err) {
        console.error('Blob to File conversion failed:', err);
        continue;
      }
    }

    // Save image URLs to DB
    if (uploadedUrls.length > 0) {
      await prisma.listingImg.createMany({
        data: uploadedUrls.map((url) => ({
          listingId,
          url,
        })),
      });
    }

    // Fetch final listing with related data
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

    return NextResponse.json({
      success: true,
      data: finalListing,
    });
  } catch (error) {
    console.error('[ADD_LISTING_ERROR]', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Server error occurred while creating produce listing',
      },
      { status: 500 }
    );
  }
}
