import { Context } from "hono";
import { logger } from "../common/logger";
import { EntityNotFound } from "../common/errors";
import { reviewCommentPatchSchema, reviewCommentSchema } from "../schemas/review-comment.schema";
import * as reviewCommentService from "../services/review-comment.service";

export async function getReviewCommentsByReviewIdController(c: Context) {
  try {
    const reviewId = c.req.param("id");
    logger.info(`Fetching review comment by id ${reviewId}`);

    if (!reviewId) {
      throw new EntityNotFound("Review comment ID is required");
    }

    const reviewComments = await reviewCommentService.getReviewCommentById(reviewId);
    logger.info("Fetched review comment successfully");
    return c.json(reviewComments, 200);
  } catch (error) {
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function createReviewCommentController(c: Context) {
  try {
    const { reviewId, content, username } = await c.req.json();
    logger.info(`Creating review comment for review id ${reviewId}`);

    const { success, data, error } = reviewCommentSchema.safeParse({ reviewId, content, username });

    if (!success) {
      logger.error("Validation error", error);
      return c.json({ error: error.errors }, 400);
    }

    const reviewComment = await reviewCommentService.createReviewComment(data);
    logger.info("Created review comment successfully");
    return c.json(reviewComment, 201);
  } catch (error) {
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}

export async function patchReviewCommentByIdController(c: Context) {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    logger.info(`Patching review comment by id ${id}`);

    const { success, data, error } = reviewCommentPatchSchema.safeParse({ ...body });

    if (!success) {
      logger.error("Validation error", error);
      return c.json({ error: error.errors }, 400);
    }

    await reviewCommentService.patchReviewCommentById(id, data);
    const updatedReviewComment = await reviewCommentService.getReviewCommentById(id);
    logger.info("Patched review comment successfully");
    return c.json(updatedReviewComment, 200);
  } catch (error) {
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
export async function deleteReviewCommentByIdController(c: Context) {
  try {
    const id = c.req.param("id");
    logger.info(`Deleting review comment by id ${id}`);

    await reviewCommentService.deleteReviewCommentById(id);
    logger.info("Deleted review comment successfully");
    return c.json({ message: "Review comment deleted successfully" }, 200);
  } catch (error) {
    if (error instanceof EntityNotFound) {
      return c.json({ error: error.message }, 404);
    }
    return c.json({ error: "Internal Server Error" }, 500);
  }
}
