// lib/actions/getProduceListings.ts

import { CreateProduceListingInput, createProduceListingSchema } from '@/lib/utils/farmer/FarmListingUtils';
import { ActiveDraftStatus, PrismaClient } from '@prisma/client';
import z from 'zod';

const prisma = new PrismaClient();

export type ListingStatus = 'active' | 'draft' | 'harvest' | 'sold';

export type GetProduceListingsParams = {
  farmId: string;
  status: ListingStatus;
  page?: number;
  limit?: number;
};

export const getProduceListings = async ({
  farmId,
  status,
  page = 1,
  limit = 10,
}: GetProduceListingsParams) => {
  try {
    const offset = (page - 1) * limit;
    let listings;
    let total;

    switch (status) {
      case 'active':
        listings = await prisma.produceListing.findMany({
          where: {
            farmId,
            activeDraftListing: {
              status: ActiveDraftStatus.active,
            },
          },
          include: {
            produce: true,
            images: true,
            activeDraftListing: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: offset,
          take: limit,
        });

        total = await prisma.produceListing.count({
          where: {
            farmId,
            activeDraftListing: {
              status: ActiveDraftStatus.active,
            },
          },
        });
        break;

      case 'draft':
        listings = await prisma.produceListing.findMany({
          where: {
            farmId,
            activeDraftListing: {
              status: ActiveDraftStatus.draft,
            },
          },
          include: {
            produce: true,
            images: true,
            activeDraftListing: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: offset,
          take: limit,
        });

        total = await prisma.produceListing.count({
          where: {
            farmId,
            activeDraftListing: {
              status: ActiveDraftStatus.draft,
            },
          },
        });
        break;

      case 'harvest':
        listings = await prisma.produceListing.findMany({
          where: {
            farmId,
            harvestListings: {
              some: {}, // Has at least one harvest listing
            },
          },
          include: {
            produce: true,
            images: true,
            harvestListings: {
              orderBy: {
                harvestDate: 'desc',
              },
              take: 1, // Get the latest harvest date
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: offset,
          take: limit,
        });

        total = await prisma.produceListing.count({
          where: {
            farmId,
            harvestListings: {
              some: {},
            },
          },
        });
        break;

      case 'sold':
        listings = await prisma.produceListing.findMany({
          where: {
            farmId,
            soldListings: {
              some: {}, // Has at least one sold listing
            },
          },
          include: {
            produce: true,
            images: true,
            soldListings: {
              orderBy: {
                soldDate: 'desc',
              },
              take: 1, // Get the latest sale
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: offset,
          take: limit,
        });

        total = await prisma.produceListing.count({
          where: {
            farmId,
            soldListings: {
              some: {},
            },
          },
        });
        break;

      default:
        throw new Error(`Invalid status: ${status}`);
    }

    // Transform data to match your store interface
    const transformedListings = listings.map((listing: any) => ({
      id: listing.id,
      location: listing.location,
      description: listing.description,
      quantity: listing.quantity,
      status: status,
      harvestDate: listing.harvestListings?.[0]?.harvestDate?.toISOString(),
      produce: {
        id: listing.produce.id,
        name: listing.produce.name,
        category: listing.produce.category,
        type: listing.produce.type,
        unitType: listing.produce.unitType,
        pricePerUnit: listing.produce.pricePerUnit,
      },
      images: listing.images.map((img: any) => ({
        id: img.id,
        url: img.url,
      })),
    }));

    return {
      listings: transformedListings,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasMore: offset + limit < total,
    };
  } catch (error) {
    console.error('[GET_PRODUCE_LISTINGS_ERROR]', error);
    throw new Error('Failed to fetch produce listings');
  }
};

// Filter Produce Listing on Farmers Side...

interface GetActiveListingsParams {
  category?: string;
  name?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export const getActiveListings = async ({
  category,
  name,
  type,
  page = 1,
  limit = 6,
}: GetActiveListingsParams) => {
  try {
    const skip = (page - 1) * limit;

    const listings = await prisma.produceListing.findMany({
      where: {
        activeDraftListing: {
          status: ActiveDraftStatus.active,
        },
        produce: {
          category: category || undefined,
          name: name || undefined,
          ...(type ? { type } : {}),
        },
      },
      include: {
        produce: true,
        farm: true,
        images: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error) {
    console.error("[GET_ACTIVE_LISTINGS_ERROR]", error);
    throw error;
  }
};

export const createProduceListing = async (input: CreateProduceListingInput) => {
  try {
    // Validate input based on status
    const validatedData = createProduceListingSchema.parse(input);

    // Use a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Create the produce listing with nullable fields
      const produceListing = await tx.produceListing.create({
        data: {
          ...(validatedData.location !== undefined ? { location: validatedData.location } : {}),
          ...(validatedData.description !== undefined ? { description: validatedData.description } : {}),
          ...(validatedData.quantity !== undefined && validatedData.quantity !== null
            ? { quantity: validatedData.quantity }
            : {}),
          produceId: validatedData.produceId,
          farmId: validatedData.farmId,
        },
      });

      // Handle status-specific logic
      if (validatedData.status === 'draft') {
        // Create draft status
        await tx.activeDraftListing.create({
          data: {
            listingId: produceListing.id,
            status: ActiveDraftStatus.draft,
          },
        });
      } else if (validatedData.status === 'active') {
        // Create active status
        await tx.activeDraftListing.create({
          data: {
            listingId: produceListing.id,
            status: ActiveDraftStatus.active,
          },
        });
      } else if (validatedData.status === 'harvest') {
        // Create active status (harvest listings are active)
        await tx.activeDraftListing.create({
          data: {
            listingId: produceListing.id,
            status: ActiveDraftStatus.active,
          },
        });

        // Create harvest listing
        await tx.harvestListing.create({
          data: {
            listingId: produceListing.id,
            harvestDate: validatedData.harvestDate!,
          },
        });
      }

      // Create images if provided
      if (validatedData.images && validatedData.images.length > 0) {
        await tx.listingImg.createMany({
          data: validatedData.images.map(url => ({
            listingId: produceListing.id,
            url,
          })),
        });
      }

      // Return the created listing with all relations
      return await tx.produceListing.findUnique({
        where: { id: produceListing.id },
        include: {
          produce: true,
          farm: true,
          images: true,
          activeDraftListing: true,
          harvestListings: true,
        },
      });
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('[CREATE_PRODUCE_LISTING_ERROR]', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        details: error.errors,
      };
    }

    return {
      success: false,
      error: 'Failed to create produce listing',
    };
  }
};