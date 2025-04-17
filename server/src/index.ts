import { Hono } from "hono";
import { booksRoutes } from "./routes/books.router";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.route("/books", booksRoutes);

app.notFound((c) => {
  return c.json(
    {
      error: "Error page, Not Found",
    },
    404
  );
});

export default {
  port: 3000,
  fetch: app.fetch,
};
