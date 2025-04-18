import * as bookRepository from "../repositories/book.repository";

export async function getAllBooks() {
  return bookRepository.getAllBooks();
}

export async function getBookById(id: string) {
  return bookRepository.getBookById(id);
}

export async function createBook(book: { title: string; author: string; publishedYear: number }) {
  return bookRepository.createBook(book);
}
