import { Context } from "hono";
import { logger } from "../common/logger";
import { EntityNotFound } from "../common/errors";
import { reviewPatchSchema, reviewSchema } from "../schemas/review.schema";
import * as reviewService from "../services/review.service";

export async function getReviewController(c: Context) {
  try {
    logger.info("Fetching all reviews");
    const reviews = await reviewService.getAllReviews();
    logger.info("Fetched all reviews successfully");
    return c.json(reviews, 200);
  } catch (error) {
    logger.error("Error fetching reviews", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function createReviewController(c: Context) {
  try {
    const { bookId, username, content, rating } = await c.req.json();
    logger.info("Creating review for book");

    const { success, data, error } = reviewSchema.safeParse({
      bookId,
      username,
      content,
      rating,
    });

    if (!success) {
      logger.error("Validation error", error);
      return c.json({ error: error.errors }, 400);
    }

    const review = await reviewService.createReview(data);
    logger.info("Created review successfully");
    return c.json(review, 201);
  } catch (error) {
    logger.error("Error creating review", error);
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 400);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function patchReviewByIdController(c: Context) {
  try {
    const reviewId = c.req.param("id");
    const body = await c.req.json();
    logger.info(`Patching review by id ${reviewId}`);

    const { success, data, error } = reviewPatchSchema.safeParse({
      ...body,
    });

    if (!success) {
      logger.error("Validation error", error);
      return c.json({ error: error.errors }, 400);
    }

    await reviewService.patchReviewById(reviewId, body);
    const review = await reviewService.getReviewById(reviewId);
    logger.info("Patched review successfully");
    return c.json(review, 200);
  } catch (error) {
    logger.error("Error creating review", error);
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    console.log(error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function deleteReviewByIdController(c: Context) {
  try {
    const reviewId = c.req.param("id");
    logger.info(`Deleting review by id ${reviewId}`);

    await reviewService.deleteReviewById(reviewId);
    logger.info("Deleted review successfully");
    return c.json({ message: "Review deleted successfully" }, 200);
  } catch (error) {
    logger.error("Error deleting review", error);
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
