import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { books } from "../models";
import { EntityNotFound } from "../common/errors";

export async function getAllBooks() {
  return db.select().from(books);
}

export async function getBookById(id: string) {
  const book = await db
    .select()
    .from(books)
    .where(eq(books.id, Number(id)))
    .execute();

  if (!book || book.length === 0) {
    throw new EntityNotFound(`Book with id ${id} not found`);
  }

  return book;
}

export async function createBook(book: { title: string; author: string; publishedYear: number }) {
  return db.insert(books).values(book).returning();
}
