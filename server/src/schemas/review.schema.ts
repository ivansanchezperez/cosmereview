import { z } from "zod";

export const reviewSchema = z.object({
  bookId: z.number().int().positive(),
  userId: z.number().int().positive(),
  username: z.string().max(50, "Username must be no more than 50 characters"),
  content: z.string().min(1, "Content must not be empty"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
});

// Define the patch schema, allowing only `rating` and `content` to be editable
export const reviewPatchSchema = reviewSchema
  .pick({
    content: true,
    rating: true,
  })
  .partial();
