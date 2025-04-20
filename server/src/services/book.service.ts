import { BookWithReviewsAndComments, CreateBook, PatchBook } from "../models";
import * as bookRepository from "../repositories/book.repository";

export async function getAllBooks() {
  return bookRepository.getAllBooks();
}

export async function getBookById(id: string): Promise<BookWithReviewsAndComments> {
  return bookRepository.getBookWithReviewsAndCommentsById(id);
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
