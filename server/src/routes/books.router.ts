import { Hono } from "hono";
import {
  getBooksController,
  createBookController,
  getBookByIdController,
  patchBookByIdController,
  deleteBookByIdController,
} from "../controllers/book.controller";

export const bookRoutes = new Hono();

bookRoutes.get("/", getBooksController);
bookRoutes.post("/", createBookController);
bookRoutes.get("/:id", getBookByIdController);
bookRoutes.patch("/:id", patchBookByIdController);
bookRoutes.delete("/:id", deleteBookByIdController);
