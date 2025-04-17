import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { books } from "./book";

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),
  content: text("content").notNull(),
  rating: integer("rating"),
  createdAt: timestamp("created_at").defaultNow(),
});
