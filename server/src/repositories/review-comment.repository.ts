import { eq } from "drizzle-orm";
import { db } from "../config/supabase_db";
import { reviewComments, CreateReviewComment, PatchReviewComment } from "../models/ReviewComment";

// CRUD operations for review comments
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

// Fetch all review comments for a specific review
export async function getReviewCommentsByReviewId(reviewId: string) {
  return db
    .select()
    .from(reviewComments)
    .where(eq(reviewComments.reviewId, Number(reviewId)))
    .execute();
}
