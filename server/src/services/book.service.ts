import { CreateBook, FetchBook, PatchBook } from "../models";
import * as bookRepository from "../repositories/book.repository";

export async function getAllBooks() {
  return bookRepository.getAllBooks();
}

export async function getBookById(id: string): Promise<FetchBook> {
  return bookRepository.getBookById(id);
}

export async function createBook(book: CreateBook) {
  return bookRepository.createBook(book);
}

export async function patchBookById(id: string, updates: PatchBook) {
  const book = await getBookById(id);

  const patchedBook = {
    ...book,
    ...updates,
    updatedAt: new Date(),
  };

  return bookRepository.patchBookById(id, patchedBook);
}

export async function deleteBookById(id: string) {
  const book = await getBookById(id);

  if (!book) {
    throw new Error(`Book with id ${id} not found`);
  }

  return bookRepository.deleteBookById(id);
}
