import { EntityNotFoundError } from "../common/errors";
import { CreateReviewComment, FetchReviewComment, PatchReviewComment } from "../models/ReviewComment";
import { getReviewById } from "./review.service";
import * as reviewCommentsRepository from "../repositories/review-comment.repository";

export async function getReviewCommentsByReviewId(reviewId: string) {
  return reviewCommentsRepository.getReviewCommentsByReviewId(reviewId);
}

export async function getReviewCommentById(id: string): Promise<FetchReviewComment> {
  const reviewComment = await reviewCommentsRepository.getReviewCommentById(id);
  if (!reviewComment || reviewComment.length === 0) {
    throw new EntityNotFoundError(`Review comment with id ${id} not found`);
  }
  return reviewComment[0];
}

export async function createReviewComment(reviewComment: CreateReviewComment) {
  await getReviewById(reviewComment.reviewId.toString());
  const reviewCommentsToCreate = {
    ...reviewComment,
    createdAt: new Date(),
  };
  return reviewCommentsRepository.createReviewComment(reviewCommentsToCreate);
}

export async function patchReviewCommentById(id: string, updates: PatchReviewComment) {
  const reviewCommentToUpdate = await getReviewCommentById(id);
  const patchedReviewComment = {
    ...reviewCommentToUpdate,
    ...updates,
    updatedAt: new Date(),
  };
  return reviewCommentsRepository.patchReviewCommentById(id, patchedReviewComment);
}

export async function deleteReviewCommentById(id: string) {
  await getReviewCommentById(id);
  return reviewCommentsRepository.deleteReviewCommentById(id);
}
