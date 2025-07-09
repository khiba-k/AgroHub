import { uploadImage } from '@/lib/supabase/uploadimage';
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
    harvestDate: z.date().optional(),
    // ❌ Remove images from initial listing creation
    // images: z.array(z.string()).min(1, 'At least 1 image is required').max(5, 'Maximum of 5 images allowed').optional(),
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
    quantity: z.number().int().min(1, 'Quantity is required for active listings'),
});

// Harvest schema - all fields + harvest date required
export const harvestListingSchema = baseProduceListingSchema.extend({
    status: z.literal('harvest'),
    location: z.string().min(1, 'Location is required for harvest listings'),
    quantity: z.number().int().min(1, 'Quantity is required for harvest listings'),
    harvestDate: z.coerce.date({ required_error: 'Harvest date is required for harvest listings' }),
});

// Union schema for all listing types
export const createProduceListingSchema = z.discriminatedUnion('status', [
    draftListingSchema,
    activeListingSchema,
    harvestListingSchema,
]);

// ✅ NEW: update schema: merge id with union
export const updateProduceListingSchema = z.object({
    id: z.string().uuid(),
    keepImages: z.array(z.string().url()).optional().default([]),
    removeImageIds: z.array(z.string().uuid()).optional().default([]),
}).and(createProduceListingSchema);


// export async function convertBlobUrlToFile(bloburl: string){
//     const response = await fetch(bloburl);
//     const blob = await response.blob();
//     const filename = Math.random().toString(36).slice(2, 9);
//     const mimeType = blob.type || 'application/octet-stream';
//     const file = new File([blob], `${filename}.${mimeType.split('/')[1]}`,
//     {type: mimeType, 
//         });
//     return file;

// }

// export const uploadListingImages = async (
//     blobUrls: string[],
//     bucket: string = "agrohubpics",
//     folder: string = "listings"
// ): Promise<{ urls: string[]; errors: string[] }> => {
//     const uploadedUrls: string[] = [];
//     const errors: string[] = [];

//     for (const blobUrl of blobUrls) {
//     try {
//         const file = await convertBlobUrlToFile(blobUrl);
//         const { imageUrl, error } = await uploadImage({ file, bucket: bucket, folder });

//         if (error || !imageUrl) {
//         console.error("Upload error:", error);
//         errors.push(error || "Unknown upload error");
//         continue;
//         }

//         uploadedUrls.push(imageUrl);
//     } catch (err: any) {
//         console.error("Conversion/upload failed:", err);
//         errors.push(err.message || "Unknown error");
//     }
//     }

//     return { urls: uploadedUrls, errors };
// };

export type CreateProduceListingInput = z.infer<typeof createProduceListingSchema>;

export type UpdateProduceListingInput = z.infer<typeof updateProduceListingSchema>;
