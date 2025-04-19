import { Hono } from "hono";
import {
  createReviewController,
  getReviewController,
  patchReviewByIdController,
  deleteReviewByIdController,
  getReviewByIdController,
} from "../controllers/review.controller";

export const reviewRoutes = new Hono();

reviewRoutes.get("/", getReviewController);
reviewRoutes.post("/", createReviewController);
reviewRoutes.get("/:id", getReviewByIdController);
reviewRoutes.patch("/:id", patchReviewByIdController);
reviewRoutes.delete("/:id", deleteReviewByIdController);
