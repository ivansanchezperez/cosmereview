import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { reviews, CreateReview, PatchReview } from "../models";

export async function getAllReviews() {
  return db.select().from(reviews);
}

export async function getReviewById(id: string) {
  return await db
    .select()
    .from(reviews)
    .where(eq(reviews.id, Number(id)))
    .execute();
}

export async function getReviewsByBookId(bookId: string) {
  return await db
    .select()
    .from(reviews)
    .where(eq(reviews.bookId, Number(bookId)))
    .execute();
}

export async function createReview(review: CreateReview) {
  const [insertedReview] = await db.insert(reviews).values(review).returning();
  return {
    ...insertedReview,
    createdAt: insertedReview.createdAt ? new Date(insertedReview.createdAt) : null,
  };
}

export async function patchReviewById(id: string, updates: PatchReview) {
  await db
    .update(reviews)
    .set(updates)
    .where(eq(reviews.id, Number(id)))
    .returning()
    .execute();
}

export async function deleteReviewById(id: string) {
  return db
    .delete(reviews)
    .where(eq(reviews.id, Number(id)))
    .execute();
}
