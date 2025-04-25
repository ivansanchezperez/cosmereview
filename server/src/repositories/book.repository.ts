import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { books, reviews, reviewComments, CreateBook, PatchBook, BookWithReviewsAndComments, FetchReview, FetchReviewComment } from "../models";
import { EntityNotFound } from "../common/errors";

// CRUD operations for books
export async function getAllBooks() {
  return db.select().from(books);
}

export async function getBookById(id: string) {
  return await db
    .select()
    .from(books)
    .where(eq(books.id, Number(id)))
    .execute();
}

export async function createBook(book: CreateBook) {
  const [insertedBook] = await db.insert(books).values(book).returning();
  return {
    ...insertedBook,
    createdAt: insertedBook.createdAt ? new Date(insertedBook.createdAt) : null,
  };
}

export async function patchBookById(id: string, updates: PatchBook) {
  await db
    .update(books)
    .set(updates)
    .where(eq(books.id, Number(id)))
    .returning()
    .execute();
}

export async function deleteBookById(id: string) {
  return db
    .delete(books)
    .where(eq(books.id, Number(id)))
    .execute();
}

// Fetch a book with its reviews and comments
export async function getBookWithReviewsAndCommentsById(bookId: string): Promise<BookWithReviewsAndComments> {
  const result = await db
    .select({
      bookId: books.id,
      bookTitle: books.title,
      bookAuthor: books.author,
      bookPublishedYear: books.publishedYear,
      bookCreatedAt: books.createdAt,
      bookUpdatedAt: books.updatedAt,
      reviewId: reviews.id,
      reviewUserId: reviews.userId,
      reviewContent: reviews.content,
      reviewRating: reviews.rating,
      reviewCreatedAt: reviews.createdAt,
      reviewUpdatedAt: reviews.updatedAt,
      reviewUsername: reviews.username,
      reviewBookId: reviews.bookId,
      reviewCommentId: reviewComments.id,
      reviewCommentContent: reviewComments.content,
      reviewCommentUsername: reviewComments.username,
      reviewCommentCreatedAt: reviewComments.createdAt,
      reviewCommentUpdatedAt: reviewComments.updatedAt,
      reviewCommentReviewId: reviewComments.reviewId,
    })
    .from(books)
    .leftJoin(reviews, eq(books.id, reviews.bookId))
    .leftJoin(reviewComments, eq(reviews.id, reviewComments.reviewId))
    .where(eq(books.id, Number(bookId)));

  if (result.length === 0) {
    throw new EntityNotFound(`Book with id ${bookId} not found`);
  }

  // Transform the flat result into a hierarchical structure
  const book: BookWithReviewsAndComments = {
    id: result[0]?.bookId,
    title: result[0]?.bookTitle,
    author: result[0]?.bookAuthor,
    publishedYear: result[0]?.bookPublishedYear,
    createdAt: result[0]?.bookCreatedAt,
    updatedAt: result[0]?.bookUpdatedAt,
    reviews: [],
  };

  const reviewMap = new Map<number, FetchReview & { reviewComments: FetchReviewComment[] }>();

  result.forEach((row) => {
    if (!row.reviewId) return;

    if (!reviewMap.has(row.reviewId)) {
      const newReview: FetchReview & { reviewComments: FetchReviewComment[] } = {
        id: row.reviewId,
        userId: row.reviewUserId!,
        content: row.reviewContent!,
        rating: row.reviewRating!,
        createdAt: row.reviewCreatedAt!,
        updatedAt: row.reviewUpdatedAt!,
        username: row.reviewUsername!,
        bookId: row.reviewBookId!,
        reviewComments: [],
      };
      reviewMap.set(row.reviewId, newReview);
      book.reviews.push(newReview);
    }

    if (row.reviewCommentId) {
      reviewMap.get(row.reviewId)!.reviewComments.push({
        id: row.reviewCommentId,
        userId: row.reviewUserId!,
        content: row.reviewCommentContent!,
        username: row.reviewCommentUsername!,
        createdAt: row.reviewCommentCreatedAt!,
        updatedAt: row.reviewCommentUpdatedAt!,
        reviewId: row.reviewCommentReviewId!,
      });
    }
  });

  return book;
}
