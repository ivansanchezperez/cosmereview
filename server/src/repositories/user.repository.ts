import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { users, CreateUser, PatchUser, FetchUser } from "../models";

export async function getUserById(id: string) {
  return await db
    .select()
    .from(users)
    .where(eq(users.id, Number(id)))
    .execute();
}

export async function createUser(user: CreateUser) {
  const [insertedUser] = await db.insert(users).values(user).returning();
  return {
    ...insertedUser,
    createdAt: insertedUser.createdAt ? new Date(insertedUser.createdAt) : null,
  };
}

export async function patchUserById(id: string, updates: PatchUser) {
  await db
    .update(users)
    .set(updates)
    .where(eq(users.id, Number(id)))
    .returning()
    .execute();
}

export async function deleteUserById(id: string) {
  return db
    .delete(users)
    .where(eq(users.id, Number(id)))
    .execute();
}

export async function getUserByEmail(email: string): Promise<FetchUser | null> {
  const [user] = await db.select().from(users).where(eq(users.email, email)).execute();
  return user || null; // Return the user or null if not found
}
