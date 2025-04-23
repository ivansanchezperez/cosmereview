import { z } from "zod";

export const userSchema = z.object({
  username: z.string().max(50, "Username must be no more than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  profilePicture: z.string().optional(),
});

export const userPatchSchema = userSchema
  .pick({
    username: true,
    email: true,
    password: true,
    profilePicture: true,
  })
  .partial();

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
