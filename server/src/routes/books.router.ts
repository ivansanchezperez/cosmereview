import { Hono } from "hono";
import { db } from "../db/client";
import { books } from "../db/schema";

export const booksRoutes = new Hono();

booksRoutes.get("/", async (c) => {
  try {
    const allBooks = await db.select().from(books);
    return c.json(allBooks);
  } catch (error) {
    if (error instanceof Error && error.message.includes("required")) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

booksRoutes.post("/", async (c) => {
  try {
    const { title, author, published_date } = await c.req.json();
    if (!title || !author || !published_date) {
      throw new Error("Missing required fields");
    }
    const body = await c.req.json();
    const inserted = await db
      .insert(books)
      .values({
        title: body.title,
        author: body.author,
        publishedYear: body.publishedYear,
      })
      .returning();
    return c.json(inserted[0]);
  } catch (error) {
    if (error instanceof Error && error.message.includes("required")) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
});
