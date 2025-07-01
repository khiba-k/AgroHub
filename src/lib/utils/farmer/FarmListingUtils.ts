import { ActiveDraftStatus, PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// ... existing code ...

// Base schema with nullable fields (matches your updated schema)
export const baseProduceListingSchema = z.object({
    location: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().int().min(0).optional(),
    produceId: z.string().uuid(),
    farmId: z.string().uuid(),
    images: z.array(z.string().url()).optional().default([]),
    harvestDate: z.date().optional(),
});

// Draft schema - minimal requirements
export const draftListingSchema = baseProduceListingSchema.extend({
    status: z.literal('draft'),
});

// Active schema - all fields required
export const activeListingSchema = baseProduceListingSchema.extend({
    status: z.literal('active'),
    location: z.string().min(1, 'Location is required for active listings'),
    description: z.string().min(1, 'Description is required for active listings'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1 for active listings'),
});

// Harvest schema - all fields + harvest date required
export const harvestListingSchema = baseProduceListingSchema.extend({
    status: z.literal('harvest'),
    location: z.string().min(1, 'Location is required for harvest listings'),
    description: z.string().min(1, 'Description is required for harvest listings'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1 for harvest listings'),
    harvestDate: z.date({ required_error: 'Harvest date is required for harvest listings' }),
});

// Union schema for all listing types
export const createProduceListingSchema = z.discriminatedUnion('status', [
    draftListingSchema,
    activeListingSchema,
    harvestListingSchema,
]);

export type CreateProduceListingInput = z.infer<typeof createProduceListingSchema>;