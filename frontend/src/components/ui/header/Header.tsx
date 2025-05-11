import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Header.module.css";
import userIcon from "@assets/elantris.png";
import logoIcon from "@assets/elantris.png";
import useWindowResize from "@hooks/useWindowResize";

export default function Header() {
  const { windowWidth } = useWindowResize();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <motion.header
      initial={false}
      animate={isScrolled ? "scrolled" : "top"}
      variants={{
        top: {
          backgroundColor: "#ffffff",
          borderRadius: "0px",
          margin: "0px",
          boxShadow: "none",
        },
        scrolled: {
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          margin: "1rem",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
      transition={{ duration: 0.3 }}
      className={styles.header}
    >
      <div className={styles.left}>
        <img src={logoIcon.src} alt="logo" className={styles.logo} />
        {!isMobile && <span className={styles.title}>Cosmereview</span>}
      </div>
      <div className={styles.right}>
        <button className={styles.loginButton}>Iniciar sesión</button>
        <img src={userIcon.src} alt="usuario" className={styles.userIcon} />
      </div>
    </motion.header>
  );
}
