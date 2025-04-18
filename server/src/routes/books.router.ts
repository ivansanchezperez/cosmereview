import { Hono } from "hono";
import { getBooksController, createBookController, getBookByIdController } from "../controllers/book.controller";

export const booksRoutes = new Hono();

booksRoutes.get("/", getBooksController);
booksRoutes.post("/", createBookController);
booksRoutes.get("/:id", getBookByIdController);
