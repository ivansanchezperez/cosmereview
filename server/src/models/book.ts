import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  publishedYear: integer("published_year"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type CreateBook = InferInsertModel<typeof books>;
export type FetchBook = InferSelectModel<typeof books>;
export type PatchBook = Partial<Omit<InferInsertModel<typeof books>, "id" | "createdAt">> & {
  id: number;
};
