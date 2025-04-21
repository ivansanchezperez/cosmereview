import "@fontsource/noto-serif";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import elantris from "../../assets/elantris.png";
import homepage from "../../assets/homepage.png";
import styles from "./welcome.module.css";

export default function Welcome() {
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

  const positionValue = "fixed";
  const overflowYValue = "auto";
  const sidebarOverflowYValue = "auto";

  return (
    <div className={styles.container}>
      <motion.div
        ref={sidebarRef}
        className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}
        style={{
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
        <div className={styles.sidebarInner}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>Home</li>
              <li className={styles.navItem}>Elantris</li>
              <li className={styles.navItem}>Mistborn</li>
            </ul>
          </nav>
        </div>
      </motion.div>

      <motion.main
        className={styles.main}
        style={{
          marginLeft: mainMarginLeft,
          overflowY: overflowYValue,
        }}
        animate={{
          marginLeft: mainMarginLeft,
        }}
        transition={{ duration: 0.3 }}
      >
        <header className={styles.header}>
          <button
            ref={toggleButtonRef}
            onClick={toggleSidebar}
            className={styles.headerToggleButton}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? "✕" : "☰"}
          </button>
        </header>

        <div
          className={styles.hero}
          style={{ backgroundImage: `url(${homepage.src})` }}
        >
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Cosmereview</h1>
          </div>
        </div>

        <section className={styles.reviewsSection}>
          <h2 className={styles.sectionTitle}>Libros destacados</h2>
          <div className={styles.booksGrid}>
            <div className={styles.bookItem}>
              <div
                className={styles.bookCover}
                style={{ backgroundImage: `url(${elantris.src})` }}
              ></div>
              <span className={styles.bookTitle}>Elantris</span>
            </div>
          </div>
        </section>
      </motion.main>
    </div>
  );
}
