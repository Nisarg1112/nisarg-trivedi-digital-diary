import styles from "../components/menu.module.css";
import { ThemeChanger } from "./theme";
import Link from "next/link";
import NavLink from "./navLink";
import Contact from "./contact";
import util from "../styles/util.module.css";
import { useState, useEffect } from 'react';

export default function Menu() {
  const [isFabOpen, setIsFabOpen] = useState(false);

  // Close FAB menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFabOpen && !event.target.closest(`.${styles.fabWrapper}`)) {
        setIsFabOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isFabOpen]);

  return (
    <>
      {/* Desktop Menu */}
      <div className={styles.container}>
        <div className={styles.upper}>
          <Link href="/">
            <img
              className={util.hiddenOnMobile + " " + util.pointer + " logoInvert"}
              src="/nisarg-trivedi-logo.png"
              alt="site logo"
            />
          </Link>

          <nav className={styles.nav}>
            <NavLink svg="recents" href="/" label="Home" shortcut="1" />
            <NavLink svg="about" href="/about" label="About" shortcut="2" />
            <NavLink svg="blogs" href="/blogs" label="Blogs" shortcut="3" />
            
            <p className={styles.divider}>Resources</p>
            <NavLink svg="reading" href="/reading-list" label="Reading List" shortcut="4" />
            <NavLink svg="shopping-bag" href="/goods" label="Aesthetic Goods" shortcut="5" />
            <NavLink svg="newsletters" href="/newsletters" label="Newsletters" shortcut="6" />
            <NavLink svg="podcasts" href="/youtube-channels" label="Youtube Channels" shortcut="7" />
            
            <p className={styles.divider}>Stay in touch</p>
            <NavLink svg="blogs" href="/subscribe" label="Subscribe" shortcut="8" />
            <Contact svg="chat" label="Contact" shortcut="/" />
            <NavLink svg="linkedin" href="https://www.linkedin.com/in/nisargtrivedi1112/" label="LinkedIn" external="true" />
          </nav>
        </div>
        <ThemeChanger />
      </div>

      {/* Mobile Menu */}
      <div className={styles.mobileContainer}>
        <nav className={styles.mobileNav}>
          <NavLink svg="recents" href="/" label="Home" shortcut="1" />
          <NavLink svg="about" href="/about" label="About" shortcut="2" />
          <NavLink svg="blogs" href="/blogs" label="Blogs" shortcut="3" />
        </nav>

        <div className={styles.fabWrapper}>
          <button 
            className={`${styles.fab} ${isFabOpen ? styles.fabOpen : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsFabOpen(!isFabOpen);
            }}
          >
            <span className={styles.fabIcon}>+</span>
          </button>

          {isFabOpen && (
            <div className={styles.fabMenu}>
              <div className={styles.fabSection}>
                <p className={styles.fabDivider}>Resources</p>
                <NavLink svg="reading" href="/reading-list" label="Reading List" />
                <NavLink svg="shopping-bag" href="/goods" label="Aesthetic Goods" />
                <NavLink svg="newsletters" href="/newsletters" label="Newsletters" />
                <NavLink svg="podcasts" href="/youtube-channels" label="Youtube Channels" />
              </div>
              <div className={styles.fabSection}>
                <p className={styles.fabDivider}>Stay in touch</p>
                <NavLink svg="blogs" href="/subscribe" label="Subscribe" />
                <Contact svg="chat" label="Contact" />
                <NavLink svg="linkedin" href="https://www.linkedin.com/in/nisargtrivedi1112/" label="LinkedIn" external="true" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
