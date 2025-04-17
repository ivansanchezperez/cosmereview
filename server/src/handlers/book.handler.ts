import { Context } from "hono";
import * as bookRepository from "../repositories/book.repository";

export async function getBooksHandler(c: Context) {
  try {
    const allBooks = await bookRepository.getAllBooks();
    return c.json(allBooks);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function createBookHandler(c: Context) {
  try {
    const { title, author, publishedYear } = await c.req.json();

    if (!title || !author || !publishedYear) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const [insertedBook] = await bookRepository.createBook({
      title,
      author,
      publishedYear,
    });

    return c.json(insertedBook);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
