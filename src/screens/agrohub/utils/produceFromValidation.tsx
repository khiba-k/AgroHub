
import { z } from "zod"

export const produceFormSchema = z.object({
  category: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Product name is required"),
  type: z.string().optional(),
  pricePerUnit: z.string().min(1, "Price per unit is required"),
  unitType: z.string().min(1, "Unit type is required"),
})

export type ProduceFormData = z.infer<typeof produceFormSchema>
