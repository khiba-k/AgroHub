import { z } from "zod";

export const InviteAcceptSchema = z
  .object({
    token: z.string().optional(),
    email: z.string().email().optional(), // email is optional since it might be fetched by token
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    role: z.string().optional().default("agrohub"), // default role
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
  

export type InviteAcceptType = z.infer<typeof InviteAcceptSchema>;
