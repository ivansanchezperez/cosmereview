import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  publishedYear: integer("published_year"),
  createdAt: timestamp("created_at").defaultNow(),
});
