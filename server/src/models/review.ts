import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { books } from "./Book";
import { FetchReviewComment } from "./ReviewComment";

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id")
    .references(() => books.id, { onDelete: "cascade" })
    .notNull(),
  userId: integer("user_id")
    .references(() => books.id)
    .notNull(),
  username: text("username").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type CreateReview = InferInsertModel<typeof reviews>;
export type FetchReview = InferSelectModel<typeof reviews>;
export type PatchReview = Partial<Omit<InferInsertModel<typeof reviews>, "id" | "createdAt">>;

export type ReviewWithComments = FetchReview & {
  reviewComments: FetchReviewComment[];
};
