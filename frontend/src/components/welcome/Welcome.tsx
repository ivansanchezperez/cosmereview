import "@fontsource/noto-serif";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import elantris from "../../assets/elantris.png";
import homepage from "../../assets/homepage.png";
import "./welcome.css";
import type { CSSProperties } from "react";

export default function CosmerePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!isSidebarOpen) return;

      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarOpen, windowWidth]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const sidebarWidth = isSidebarOpen ? "20%" : windowWidth < 768 ? "0" : "0";
  const sidebarTransform = !isSidebarOpen
    ? "translateX(-100%)"
    : "translateX(0)";
  const mainMarginLeft = isSidebarOpen ? "20%" : "0";

  const overflowYValue = useMotionValue("auto");
  const positionValue = useMotionValue("fixed");
  const sidebarOverflowYValue = useMotionValue("auto");

  return (
    <div style={styles.container}>
      <motion.div
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        style={{
          ...styles.sidebar,
          width: sidebarWidth,
          transform: sidebarTransform,
          position: positionValue,
          overflowY: sidebarOverflowYValue,
        }}
        initial={{ width: windowWidth < 768 ? 0 : "20%" }}
        animate={{
          width: sidebarWidth,
          x: !isSidebarOpen ? "-100%" : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div style={styles.sidebarInner}>
          <div style={styles.sidebarHeader}>
            <h2 style={styles.sidebarTitle}>Libreria</h2>
          </div>

          <nav style={styles.nav}>
            <ul style={styles.navList}>
              <li className="nav-item" style={styles.navItem}>
                Home
              </li>
              <li className="nav-item" style={styles.navItem}>
                Elantris
              </li>
              <li className="nav-item" style={styles.navItem}>
                Mistborn
              </li>
            </ul>
          </nav>
        </div>
      </motion.div>

      <motion.main
        style={{
          ...styles.main,
          marginLeft: mainMarginLeft,
          overflowY: overflowYValue,
        }}
        animate={{
          marginLeft: mainMarginLeft,
        }}
        transition={{ duration: 0.3 }}
      >
        <header style={styles.header}>
          <button
            ref={toggleButtonRef}
            onClick={toggleSidebar}
            style={styles.headerToggleButton}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? "✕" : "☰"}
          </button>
          <h3 style={styles.headerTitle}>Libreria</h3>
        </header>

        <div
          style={{
            ...styles.hero,
            backgroundImage: `url(${homepage.src})`,
          }}
        >
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>Cosmereview</h1>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Buscar"
                style={styles.searchInput}
              />
              <button style={styles.searchButton}>Buscar</button>
            </div>
          </div>
        </div>

        <section style={styles.reviewsSection}>
          <h2 style={styles.sectionTitle}>Libros destacados</h2>
          <div style={styles.booksGrid}>
            <div style={styles.bookItem}>
              <div
                style={{
                  ...styles.bookCover,
                  backgroundImage: `url(${elantris.src})`,
                }}
              ></div>
              <span style={styles.bookTitle}>Elantris</span>
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 0",
    marginBottom: "1rem",
  },
  headerToggleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    marginRight: "1rem",
    cursor: "pointer",
    fontSize: "18px",
  },
  headerTitle: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  sidebar: {
    position: "fixed",
    height: "100%",
    backgroundColor: "#2c3e50",
    color: "white",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    overflowY: "auto",
    zIndex: 10,
    transition: "width 0.3s ease, transform 0.3s ease",
  },
  sidebarInner: {
    padding: "1rem",
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  sidebarTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    margin: 0,
  },
  nav: {
    transition: "opacity 0.2s",
  },
  navList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  navItem: {
    padding: "0.5rem",
    marginBottom: "0.5rem",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  main: {
    flexGrow: 1,
    overflowY: "auto",
    padding: "2rem",
    marginLeft: "20%",
    transition: "margin-left 0.3s ease",
    width: "100%",
  },
  hero: {
    width: "100%",
    height: "70vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: "1rem",
  },
  heroTitle: {
    fontFamily: "Noto Serif",
    fontSize: "4rem",
    fontWeight: "bold",
    color: "white",
    margin: 0,
  },
  searchContainer: {
    display: "flex",
    width: "25%",
    maxWidth: "500px",
    minWidth: "250px",
    borderRadius: "5px",
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  searchInput: {
    padding: "1rem",
    border: "none",
    fontSize: "16px",
    color: "white",
    backgroundColor: "transparent",
    flex: 1,
    outline: "none",
  },
  searchButton: {
    margin: "0.5rem",
    padding: "1rem",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    cursor: "pointer",
  },
  reviewsSection: {
    padding: "1rem 0",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  booksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "1.5rem",
  },
  bookItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  bookCover: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginBottom: "0.5rem",
  },
  bookTitle: {
    textAlign: "center",
  },
};
