import { Hono } from "hono";
import {
  createReviewCommentController,
  deleteReviewCommentByIdController,
  getReviewCommentsByReviewIdController,
  patchReviewCommentByIdController,
} from "../controllers/review-comment.controller";

export const reviewCommentRoutes = new Hono();

reviewCommentRoutes.post("/", createReviewCommentController);
reviewCommentRoutes.get("/:id", getReviewCommentsByReviewIdController);
reviewCommentRoutes.patch("/:id", patchReviewCommentByIdController);
reviewCommentRoutes.delete("/:id", deleteReviewCommentByIdController);
