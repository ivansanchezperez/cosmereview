import { EntityNotFoundError } from "../common/errors";
import { CreateReview, FetchReview, PatchReview } from "../models";
import { getBookById } from "./book.service";
import { getReviewCommentsByReviewId } from "./review-comment.service";
import * as reviewRepository from "../repositories/review.repository";

export async function getAllReviews() {
  return reviewRepository.getAllReviews();
}

export async function getReviewAndCommentsById(reviewId: string) {
  return reviewRepository.getReviewsWithCommentsById(reviewId);
}

export async function getReviewById(id: string): Promise<FetchReview> {
  const review = await reviewRepository.getReviewById(id);
  if (!review || review.length === 0) {
    throw new EntityNotFoundError(`Review with id ${id} not found`);
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
