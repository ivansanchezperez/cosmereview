import { Context } from "hono";
import * as bookService from "../services/book.service";
import { EntityNotFound, BadRequest } from "../common/errors";

export async function getBooksController(c: Context) {
  try {
    const allBooks = await bookService.getAllBooks();
    return c.json(allBooks);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function getBookByIdController(c: Context) {
  try {
    const bookId = c.req.param("id");

    if (!bookId) {
      throw new BadRequest("Book ID is required");
    }

    const book = await bookService.getBookById(bookId);
    return c.json(book);
  } catch (error) {
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function createBookController(c: Context) {
  try {
    const { title, author, publishedYear } = await c.req.json();

    if (!title || !author || !publishedYear) {
      throw new BadRequest("Missing required fields");
    }

    const [insertedBook] = await bookService.createBook({
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
