import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { books, CreateBook, PatchBook } from "../models";

export async function getAllBooks() {
  return db.select().from(books);
}

export async function getBookById(id: string) {
  return await db
    .select()
    .from(books)
    .where(eq(books.id, Number(id)))
    .execute();
}

export async function createBook(book: CreateBook) {
  const [insertedBook] = await db.insert(books).values(book).returning();
  return {
    ...insertedBook,
    createdAt: insertedBook.createdAt ? new Date(insertedBook.createdAt) : null,
  };
}

export async function patchBookById(id: string, updates: PatchBook) {
  await db
    .update(books)
    .set(updates)
    .where(eq(books.id, Number(id)))
    .returning()
    .execute();
}

export async function deleteBookById(id: string) {
  return db
    .delete(books)
    .where(eq(books.id, Number(id)))
    .execute();
}
