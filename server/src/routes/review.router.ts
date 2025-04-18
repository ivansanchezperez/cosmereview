import { Hono } from "hono";
import { createReviewController, getReviewController, patchReviewByIdController, deleteReviewByIdController } from "../controllers/review.controller";

export const reviewRoutes = new Hono();

reviewRoutes.get("/", getReviewController);
reviewRoutes.post("/", createReviewController);
reviewRoutes.patch("/:id", patchReviewByIdController);
reviewRoutes.delete("/:id", deleteReviewByIdController);
