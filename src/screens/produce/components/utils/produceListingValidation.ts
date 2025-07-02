import { z } from "zod";

// Enum for ListingStatus
export const listingStatusEnum = z.enum(["active", "harvest", "draft"]);

// Create schema for input validation (e.g., create/update form)
export const produceListingSchema = z.object({
  id: z.string().uuid().optional(),  // optional for creation
    location: z.string().min(1),
    description: z.string().min(1),
    quantity: z.number().int().nonnegative(),
    status: listingStatusEnum,
    harvestDate: z.coerce.date().optional(),

    produceId: z.string().uuid(),
    farmId: z.string().uuid(),

  // `images` can be validated separately when attached
    images: z.array(z.object({
    id: z.string().uuid().optional(),
    url: z.string().url(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
    })).optional(),
});
