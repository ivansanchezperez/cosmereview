import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { FetchReviewComment } from "./ReviewComment";
import { FetchReview } from "./Review";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  publishedYear: integer("published_year"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type CreateBook = InferInsertModel<typeof books>;
export type FetchBook = InferSelectModel<typeof books>;
export type PatchBook = Partial<Omit<InferInsertModel<typeof books>, "id" | "createdAt">> & {
  id: number;
};

export type BookWithReviewsAndComments = FetchBook & {
  reviews: (FetchReview & { reviewComments: FetchReviewComment[] })[];
};
