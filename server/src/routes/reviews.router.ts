import { Hono } from "hono";
import { db } from "../db/client";
import { reviews } from "../db/schema";

export const reviewsRoutes = new Hono();

reviewsRoutes.get("/", async (c) => {
  const allReviews = await db.select().from(reviews);
  return c.json(allReviews);
});

reviewsRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const result = await db.insert(reviews).values(body).returning();
  return c.json(result[0]);
});
