import { db } from "../config/db";
import { books } from "../models";

export const getAllBooks = () => {
  return db.select().from(books);
};

export const createBook = (book: { title: string; author: string; publishedYear: number }) => {
  return db.insert(books).values(book).returning();
};
