import { z } from "zod";

export const RegisterForm = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string(),
    role: z.enum(["farmer", "consumer"])
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// TypeScript inferred type
export type RegisterFormType = z.infer<typeof RegisterForm>;
