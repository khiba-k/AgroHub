// utils/onboardingFarmerValidation.ts

import { z } from 'zod';

export const onboardingFarmSchema = z.object({
  name: z.string({ required_error: "Farm name is required" }),
  description: z.string()
    .min(80, 'Description must be at least 80 characters')
    .max(180, 'Description must be at most 180 characters'),
  district: z.string({ required_error: "District is required" }),
  country: z.string({ required_error: "Country is required" }),
  contactNumber1: z.string()
    .min(5, 'Enter valid phone number'),
  contactNumber2: z
    .string()
    .min(5, 'Enter valid phone number')
    .optional()
    .or(z.literal('').transform(() => null)),
});

export type OnboardingFarmType = z.infer<typeof onboardingFarmSchema>;
