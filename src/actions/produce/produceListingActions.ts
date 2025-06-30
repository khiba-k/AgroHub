// lib/actions/getProduceListings.ts

import { ActiveDraftStatus, PrismaClient } from '@prisma/client';

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
