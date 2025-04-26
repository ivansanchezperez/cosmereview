import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().max(100, "Title must be no more than 100 characters"),
  author: z.string().max(100, "Author must be no more than 100 characters"),
  publishedYear: z.number(),
  image: z.any().optional(),
});
