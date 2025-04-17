import { db } from "../config/db";
import { books } from "../models";

export async function getAllBooks() {
  return db.select().from(books);
}

export async function createBook(book: { title: string; author: string; publishedYear: number }) {
  return db.insert(books).values(book).returning();
}
