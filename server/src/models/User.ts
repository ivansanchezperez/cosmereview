import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  profilePicture: text("profile_picture"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type CreateUser = InferInsertModel<typeof users>;
export type FetchUser = InferSelectModel<typeof users>;
export type PatchUser = Partial<Omit<InferInsertModel<typeof users>, "id" | "createdAt">> & {
  id: number;
};
