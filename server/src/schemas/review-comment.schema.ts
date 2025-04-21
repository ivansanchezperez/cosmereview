import { z } from "zod";

export const reviewCommentSchema = z.object({
  reviewId: z.number().int().positive(),
  userId: z.number().int().positive(),
  username: z.string().max(50, "Username must be no more than 50 characters"),
  content: z.string().min(1, "Content must not be empty"),
});

// Define the patch schema, allowing only `content` to be editable
export const reviewCommentPatchSchema = reviewCommentSchema
  .pick({
    content: true,
  })
  .partial();
