import { z } from 'zod';

export const onboardingFarmerSchema = z.object({
  id: z.string().nullable(), // database-generated
  name: z.string(),
  description: z.string().min(80, 'Description must be at least 80 characters').max(180, 'Description must be at most 180 characters'),
  district: z.string(),
  country: z.string(),
  contactNumber1: z.string(),
  contactNumber2: z.string().nullable(), // optional second contact
  userId: z.string(), // associated user
});

export type OnboardingFarmerType = z.infer<typeof onboardingFarmerSchema>;
