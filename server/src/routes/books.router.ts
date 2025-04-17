import { Hono } from "hono";
import { getBooksHandler, createBookHandler, getBookByIdHandler } from "../handlers/book.handler";

export const booksRoutes = new Hono();

booksRoutes.get("/", getBooksHandler);
booksRoutes.post("/", createBookHandler);
booksRoutes.get("/:id", getBookByIdHandler);
