import { EntityNotFound } from "../common/errors";
import { CreateReview, FetchReview } from "../models";
import * as reviewRepository from "../repositories/review.repository";
import { getBookById } from "./book.service";

export async function getAllReviews() {
  return reviewRepository.getAllReviews();
}

export async function getReviewById(id: string): Promise<FetchReview> {
  const review = await reviewRepository.getReviewById(id);
  if (!review || review.length === 0) {
    throw new EntityNotFound(`Review with id ${id} not found`);
  }

  return review[0];
}

export async function createReview(review: CreateReview) {
  await getBookById(review.bookId.toString());
  const reviewToCreate = {
    ...review,
    createdAt: new Date(),
  };
  return reviewRepository.createReview(reviewToCreate);
}

export async function patchReviewById(id: string, updates: CreateReview) {
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
