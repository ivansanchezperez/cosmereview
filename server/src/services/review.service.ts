import { EntityNotFound } from "../common/errors";
import { CreateReview, FetchReview, PatchReview } from "../models";
import { getBookById } from "./book.service";
import { getReviewCommentsByReviewId } from "./review-comment.service";
import * as reviewRepository from "../repositories/review.repository";

export async function getAllReviews() {
  return reviewRepository.getAllReviews();
}

export async function getReviewsByBookId(bookId: string) {
  const reviews = await reviewRepository.getReviewsByBookId(bookId);

  const reviewsWithComments = await Promise.all(
    reviews.map(async (review) => {
      const reviewComments = await getReviewCommentsByReviewId(review.id.toString());
      return {
        ...review,
        reviewComments: reviewComments || [],
      };
    })
  );

  return reviewsWithComments;
}

export async function getReviewById(id: string): Promise<FetchReview> {
  const review = await reviewRepository.getReviewById(id);
  if (!review || review.length === 0) {
    throw new EntityNotFound(`Review with id ${id} not found`);
  }

  const reivewComments = await getReviewCommentsByReviewId(id);
  const reviewWithComments = {
    ...review[0],
    reviewComments: reivewComments,
  };
  return reviewWithComments;
}

export async function createReview(review: CreateReview) {
  await getBookById(review.bookId.toString());
  const reviewToCreate = {
    ...review,
    createdAt: new Date(),
  };
  return reviewRepository.createReview(reviewToCreate);
}

export async function patchReviewById(id: string, updates: PatchReview) {
  const reviewToUpdate = await getReviewById(id);
  const patchedReview = {
    ...reviewToUpdate,
    ...updates,
    updatedAt: new Date(),
  };
  return reviewRepository.patchReviewById(id, patchedReview);
}

export async function deleteReviewById(id: string) {
  await getReviewById(id);
  return reviewRepository.deleteReviewById(id);
}
