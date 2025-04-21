import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { reviews } from "./Review";
import { books } from "./Book";

export const reviewComments = pgTable("review_comments", {
  id: serial("id").primaryKey(),
  reviewId: integer("review_id")
    .references(() => reviews.id, { onDelete: "cascade" })
    .notNull(),
  userId: integer("user_id")
    .references(() => books.id)
    .notNull(),
  username: text("username").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type CreateReviewComment = InferInsertModel<typeof reviewComments>;
export type FetchReviewComment = InferSelectModel<typeof reviewComments>;
export type PatchReviewComment = Partial<Omit<InferInsertModel<typeof reviewComments>, "id" | "createdAt" | "updatedAt">>;
