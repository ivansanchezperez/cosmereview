import { Hono } from "hono";
import { logger } from "hono/logger";
import { bookRoutes } from "./routes/books.router";
import { BadRequest } from "./common/errors";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.notFound((c) => {
  return c.json(
    {
      error: "Error page, Not Found",
    },
    404
  );
});

app.onError((err, c) => {
  if (err instanceof Error) {
    return c.json({ error: err.message }, err instanceof BadRequest ? 400 : 500);
  }
  return c.json({ error: "Unknown error occurred" }, 500);
});

// Middlewares
app.use(logger());

// Registering router
app.route("/books", bookRoutes);

export default {
  port: 3000,
  fetch: app.fetch,
};
