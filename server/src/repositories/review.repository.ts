import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { reviews, CreateReview, PatchReview, ReviewWithComments, reviewComments, FetchReviewComment } from "../models";

// CRUD operations for reviews
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

// Fetch all reviews with their comments
export async function getReviewsWithCommentsById(bookId: string): Promise<ReviewWithComments[]> {
  const result = await db
    .select({
      reviewId: reviews.id,
      reviewBookId: reviews.bookId,
      reviewContent: reviews.content,
      reviewRating: reviews.rating,
      reviewCreatedAt: reviews.createdAt,
      reviewUpdatedAt: reviews.updatedAt,
      reviewUsername: reviews.username,
      reviewCommentId: reviewComments.id,
      reviewCommentContent: reviewComments.content,
      reviewCommentUsername: reviewComments.username,
      reviewCommentCreatedAt: reviewComments.createdAt,
      reviewCommentUpdatedAt: reviewComments.updatedAt,
    })
    .from(reviews)
    .leftJoin(reviewComments, eq(reviews.id, reviewComments.reviewId))
    .where(eq(reviews.bookId, Number(bookId)))
    .execute();

  const reviewMap = new Map<number, ReviewWithComments>();

  result.forEach((row) => {
    if (!row.reviewId) return;

    if (!reviewMap.has(row.reviewId)) {
      reviewMap.set(row.reviewId, {
        id: row.reviewId!,
        bookId: row.reviewBookId!,
        username: row.reviewUsername!,
        content: row.reviewContent!,
        rating: row.reviewRating!,
        createdAt: row.reviewCreatedAt!,
        updatedAt: row.reviewUpdatedAt!,
        reviewComments: [],
      });
    }

    if (row.reviewCommentId) {
      const comment: FetchReviewComment = {
        id: row.reviewCommentId!,
        content: row.reviewCommentContent!,
        username: row.reviewCommentUsername!,
        createdAt: row.reviewCommentCreatedAt!,
        updatedAt: row.reviewCommentUpdatedAt!,
        reviewId: row.reviewId!,
      };

      reviewMap.get(row.reviewId!)!.reviewComments.push(comment);
    }
  });

  return Array.from(reviewMap.values());
}
