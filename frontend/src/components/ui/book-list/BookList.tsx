import styles from "./booklist.module.css";
import { useQuery } from "@tanstack/react-query";

// Define the type for a book
interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
}

// Function to fetch data
const fetchBooks = async () => {
  const response = await fetch("http://localhost:3000/books");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function BookList() {
  const {
    data: books,
    error,
    isLoading,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  // Display loading, error, or data
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className={styles.reviewsSection}>
      <h2 className={styles.sectionTitle}>Libros destacados</h2>
      <div className={styles.booksGrid}>
        {books?.map((book: Book) => (
          <div key={book.id} className={styles.bookItem}>
            <div
              className={styles.bookCover}
              style={{ backgroundImage: `url(${book.image})` }}
            />
            <div className={styles.bookContent}>
              <div className={styles.bookInfo}>
                <span className={styles.bookTitle}>{book.title}</span>
                <span className={styles.bookAuthor}>{book.author}</span>
              </div>
              <button className={styles.seeMoreButton}>Ver más</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
