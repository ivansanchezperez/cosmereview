import { Context } from "hono";
import { logger } from "../common/logger";
import { EntityNotFound, BadRequest } from "../common/errors";
import { bookSchema } from "../schemas/book.schema";
import * as bookService from "../services/book.service";
import * as storageService from "../services/storage.service";

export async function getBooksController(c: Context) {
  try {
    logger.info("Fetching all books");
    const allBooks = await bookService.getAllBooks();
    logger.info("Fetched all books successfully");
    return c.json(allBooks, 200);
  } catch (error) {
    logger.error("Error creating book", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function getBookByIdController(c: Context) {
  try {
    const bookId = c.req.param("id");
    logger.info(`Fetching book by id ${bookId}`);

    if (!bookId) {
      throw new BadRequest("Book ID is required");
    }

    const book = await bookService.getBookById(bookId);
    logger.info("Fetched book successfully");
    return c.json(book, 200);
  } catch (error) {
    logger.error("Error creating book", error);
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function createBookController(c: Context) {
  try {
    logger.info("Creating a new book");

    const formData = await c.req.formData();
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const publishedYear = Number(formData.get("publishedYear"));
    const image = formData.get("image");

    const { success, data, error } = bookSchema.safeParse({
      title,
      author,
      publishedYear,
      image,
    });

    if (!success) {
      logger.error("Validation error", error);
      return c.json({ error: "Invalid input" }, 400);
    }

    if (image && image instanceof File) {
      const filename = `book_images/${image.name}`;
      const publicUrl = await storageService.uploadImage(image, filename);
      data.image = publicUrl;
    }

    const book = await bookService.createBook(data);

    logger.info("Created book successfully");
    return c.json(book, 201);
  } catch (error) {
    logger.error("Error creating book", error);
    if (error instanceof BadRequest) {
      return c.json({ error: error.message }, 400);
    }
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function patchBookByIdController(c: Context) {
  try {
    const bookId = c.req.param("id");
    const body = await c.req.json();
    logger.info(`Patching book by id ${bookId}`);

    await bookService.patchBookById(bookId, body);
    const book = await bookService.getBookById(bookId);
    logger.info("Patched book successfully");
    return c.json(book, 200);
  } catch (error) {
    logger.error("Error creating book", error);
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    console.log(error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function deleteBookByIdController(c: Context) {
  try {
    const bookId = c.req.param("id");
    logger.info(`Deleting book by id ${bookId}`);

    if (!bookId) {
      throw new BadRequest("Book ID is required");
    }

    await bookService.deleteBookById(bookId);
    logger.info("Deleted book successfully");
    return c.json({ message: "Book deleted successfully" }, 200);
  } catch (error) {
    logger.error("Error creating book", error);
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
