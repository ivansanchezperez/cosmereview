import "dotenv/config";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { BadRequestError } from "./common/errors";
import { reviewRoutes } from "./routes/review.router";
import { bookRoutes } from "./routes/book.router";
import { reviewCommentRoutes } from "./routes/review-comment.router";
import { userRoutes } from "./routes/user.router";
import { authRoutes } from "./routes/auth.router";
import { authMiddleware } from "./middlewares/auth.middleware";

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
    return c.json(
      { error: err.message },
      err instanceof BadRequestError ? 400 : 500
    );
  }
  return c.json({ error: "Unknown error occurred" }, 500);
});

// Middlewares
app.use(logger());
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Registering routes
app.route("/auth", authRoutes);

if (process.env.ENVIRONMENT !== "development") {
  app.use(authMiddleware);
}

app.route("/books", bookRoutes);
app.route("/reviews", reviewRoutes);
app.route("/review-comments", reviewCommentRoutes);
app.route("/users", userRoutes);

export default {
  port: 3000,
  fetch: app.fetch,
};
