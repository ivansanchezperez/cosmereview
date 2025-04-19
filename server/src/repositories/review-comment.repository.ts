import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { reviewComments, CreateReviewComment, PatchReviewComment } from "../models/ReviewComment";

export async function getReviewCommentsByReviewId(reviewId: string) {
  return db
    .select()
    .from(reviewComments)
    .where(eq(reviewComments.reviewId, Number(reviewId)))
    .execute();
}

export async function getReviewCommentById(id: string) {
  return db
    .select()
    .from(reviewComments)
    .where(eq(reviewComments.id, Number(id)))
    .execute();
}

export async function createReviewComment(reviewComment: CreateReviewComment) {
  const [insertedReviewComment] = await db.insert(reviewComments).values(reviewComment).returning();
  return {
    ...insertedReviewComment,
    createdAt: insertedReviewComment.createdAt ? new Date(insertedReviewComment.createdAt) : null,
  };
}

export async function patchReviewCommentById(id: string, updates: PatchReviewComment) {
  await db
    .update(reviewComments)
    .set(updates)
    .where(eq(reviewComments.id, Number(id)))
    .returning()
    .execute();
}

export async function deleteReviewCommentById(id: string) {
  return db
    .delete(reviewComments)
    .where(eq(reviewComments.id, Number(id)))
    .execute();
}
