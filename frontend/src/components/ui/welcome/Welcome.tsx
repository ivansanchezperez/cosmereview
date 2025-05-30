import "@fontsource/noto-serif";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import homepage from "@assets/homepage.png";
import styles from "./welcome.module.css";
import BookList from "@ui/book-list/BookList";
import useWindowResize from "@hooks/useWindowResize";

export default function Welcome() {
  const { windowWidth } = useWindowResize();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [windowWidth]);

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

  // Fixed width values - use exact pixel values for more precise control
  const sidebarWidth = isSidebarOpen ? "250px" : "60px";
  const mainMarginLeft = isSidebarOpen ? "250px" : "60px";

  return (
    <div className={styles.container}>
      <motion.div
        ref={sidebarRef}
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.open : styles.collapsed
        }`}
        style={{
          width: sidebarWidth,
        }}
        initial={false}
        animate={{
          width: sidebarWidth,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <div className={styles.navItemContent} onClick={toggleSidebar}>
                <span className={styles.navIcon}>
                  {isSidebarOpen ? "⟩" : "⟨"}
                </span>
                {isSidebarOpen && (
                  <span className={styles.navText}>Librería</span>
                )}
              </div>
            </li>
            <li className={styles.navItem}>
              <div className={styles.navItemContent}>
                <span className={styles.navIcon}>🏠</span>
                {isSidebarOpen && <span className={styles.navText}>Home</span>}
              </div>
            </li>
            <li className={styles.navItem}>
              <div className={styles.navItemContent}>
                <span className={styles.navIcon}>📖</span>
                {isSidebarOpen && (
                  <span className={styles.navText}>Elantris</span>
                )}
              </div>
            </li>
            <li className={styles.navItem}>
              <div className={styles.navItemContent}>
                <span className={styles.navIcon}>📚</span>
                {isSidebarOpen && (
                  <span className={styles.navText}>Mistborn</span>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </motion.div>

      <motion.main
        className={styles.main}
        style={{
          width: `calc(100% - ${mainMarginLeft})`,
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
        animate={{
          width: `calc(100% - ${mainMarginLeft})`,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={styles.hero}
          style={{ backgroundImage: `url(${homepage.src})` }}
        >
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Cosmereview</h1>
          </div>
        </div>

        <BookList />
      </motion.main>
    </div>
  );
}
