// import exp from 'constants';
import { z } from 'zod';

export const onboardingAgrohubSchema = z.object({
    firstname: z.string()
    .min(2, { message: 'Firstname must be at least 2 characters' })
    .max(50, { message: 'Firstname must be 50 characters or fewer' }),

    lastname: z.string()
    .min(2, { message: 'Lastname must be at least 2 characters' })
    .max(50, { message: 'Lastname must be 50 characters or fewer' }),
});
export type OnboardingAgrohubType = z.infer<typeof onboardingAgrohubSchema>;
