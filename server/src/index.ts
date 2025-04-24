import { Hono } from "hono";
import { logger } from "hono/logger";
import { BadRequest } from "./common/errors";
import { reviewRoutes } from "./routes/review.router";
import { bookRoutes } from "./routes/book.router";
import { reviewCommentRoutes } from "./routes/review-comment.router";
import { userRoutes } from "./routes/user.router";
import { authRoutes } from "./routes/auth.router";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.notFound((c) => {
  return c.json(
    {
      error: "Error page not Found",
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

// Registering routes
app.route("/books", bookRoutes);
app.route("/reviews", reviewRoutes);
app.route("/review-comments", reviewCommentRoutes);
app.route("/users", userRoutes);
app.route("/auth", authRoutes);

export default {
  port: 3000,
  fetch: app.fetch,
};
