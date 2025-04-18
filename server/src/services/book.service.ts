import { EntityNotFound } from "../common/errors";
import { CreateBook, FetchBook, PatchBook } from "../models";
import * as bookRepository from "../repositories/book.repository";

export async function getAllBooks() {
  return bookRepository.getAllBooks();
}

export async function getBookById(id: string): Promise<FetchBook> {
  const book = await bookRepository.getBookById(id);
  if (!book || book.length === 0) {
    throw new EntityNotFound(`Book with id ${id} not found`);
  }

  return book[0];
}

export async function createBook(book: CreateBook) {
  const bookToCreate = {
    ...book,
    createdAt: new Date(),
  };
  return bookRepository.createBook(bookToCreate);
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
  await getBookById(id);
  return bookRepository.deleteBookById(id);
}
