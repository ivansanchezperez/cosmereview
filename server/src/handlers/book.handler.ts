import { Context } from "hono";
import * as bookRepository from "../repositories/book.repository";

export const getBooksHandler = async (c: Context) => {
  try {
    const allBooks = await bookRepository.getAllBooks();
    return c.json(allBooks);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export const createBookHandler = async (c: Context) => {
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
};
