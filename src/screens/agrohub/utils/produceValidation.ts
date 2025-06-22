
import { produceListingSchema } from "@/screens/produce/components/utils/produceListingValidation";
import { z } from "zod";

export const produceSchema = z.object({
  id: z.string().uuid().optional(), // optional for create
    category: z.string().min(1),
    name: z.string().min(1),
    type: z.string().min(1),
    unitType: z.string().min(1),
    pricePerUnit: z.string().min(1),

    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),

    listings: z.array(produceListingSchema).optional()
});
