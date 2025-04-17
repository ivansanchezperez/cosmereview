import { Context } from "hono";
import * as bookRepository from "../repositories/book.repository";
import { BadRequest } from "../common/errors";

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
      throw new BadRequest("Missing required fields");
    }

    const [insertedBook] = await bookRepository.createBook({
      title,
      author,
      publishedYear,
    });

    return c.json(insertedBook);
  } catch (error) {
    if (error instanceof BadRequest) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
