// import exp from 'constants';
import { z } from 'zod';

export const onboardingAgrohubSchema = z.object({
    firstname: z.string().min(2, "First name is required"),
    lastname: z.string().min(2, "Last name is required"),
});
export type OnboardingAgrohubType = z.infer<typeof onboardingAgrohubSchema>;
