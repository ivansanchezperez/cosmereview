import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(), // Ensure email is unique
  password: text("password").notNull(),
  profilePicture: text("profile_picture"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type CreateBook = InferInsertModel<typeof users>;
export type FetchBook = InferSelectModel<typeof users>;
export type PatchBook = Partial<Omit<InferInsertModel<typeof users>, "id" | "createdAt">> & {
  id: number;
};
