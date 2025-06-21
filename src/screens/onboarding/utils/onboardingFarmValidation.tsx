import { z } from 'zod';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

function validatePhoneNumber(value: string, country: string = 'LS'): boolean {
  try {
    const phoneNumber = parsePhoneNumberFromString(`+${value}`, country as CountryCode);
    return phoneNumber?.isValid() ?? false;
  } catch {
    return false;
  }
}

export const onboardingFarmSchema = z.object({
  name: z.string({ required_error: "Farm name is required" }),
  description: z.string()
    .min(80, 'Description must be at least 80 characters')
    .max(180, 'Description must be at most 180 characters'),
  district: z.string({ required_error: "District is required" }),
  country: z.string({ required_error: "Country is required" }),
  contactNumber1: z.string().min(5, 'Enter valid phone number'),
  contactNumber2: z
    .string()
    .min(5, 'Enter valid phone number')
    .optional()
    .or(z.literal('').transform(() => null)),
}).superRefine((data, ctx) => {
  const { contactNumber1, contactNumber2, country } = data;

  if (!validatePhoneNumber(contactNumber1, country)) {
    ctx.addIssue({
      path: ['contactNumber1'],
      code: z.ZodIssueCode.custom,
      message: 'Invalid phone number format for selected country',
    });
  }

  if (contactNumber2 && !validatePhoneNumber(contactNumber2, country)) {
    ctx.addIssue({
      path: ['contactNumber2'],
      code: z.ZodIssueCode.custom,
      message: 'Invalid phone number format for selected country',
    });
  }

  if (contactNumber1 && contactNumber2 && contactNumber1 === contactNumber2) {
    ctx.addIssue({
      path: ['contactNumber2'],
      code: z.ZodIssueCode.custom,
      message: 'Contact numbers cannot be the same',
    });
  }
});

export type OnboardingFarmType = z.infer<typeof onboardingFarmSchema>;