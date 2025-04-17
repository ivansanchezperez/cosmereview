import { Hono } from "hono";
import { getBooksHandler, createBookHandler } from "../handlers/book.handler";

export const booksRoutes = new Hono();

booksRoutes.get("/", getBooksHandler);
booksRoutes.post("/", createBookHandler);
