import styles from "../components/menu.module.css";
import { ThemeChanger } from "./theme";
import Link from "next/link";
import NavLink from "./navLink";
import Contact from "./contact";
import util from "../styles/util.module.css";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const DesktopMenu = () => (
  <div className={styles.container}>
    <div className={styles.upper}>
      <Link href="/">
        <img
          className={util.hiddenOnMobile + " " + util.pointer + " logoInvert"}
          src="/nisarg-trivedi-logo.png"
          alt="site logo"
        />
      </Link>
      <DesktopNavigation />
    </div>
    <ThemeChanger />
  </div>
);

const DesktopNavigation = () => (
  <nav className={styles.nav}>
    <NavLink svg="recents" href="/" label="Home" shortcut="1" />
    <NavLink svg="about" href="/about" label="About" shortcut="2" />
    <NavLink svg="blogs" href="/blogs" label="Blogs" shortcut="3" />
    
    <p className={styles.divider}>Resources</p>
    <NavLink svg="reading" href="/reading-list" label="Reading List" shortcut="4" />
    <NavLink svg="shopping-bag" href="/goods" label="Aesthetic Goods" shortcut="5" />
    <NavLink svg="newsletters" href="/newsletters" label="Newsletters" shortcut="6" />
    <NavLink svg="youtube" href="/youtube-channels" label="Youtube Channels" shortcut="7" />
    
    <p className={styles.divider}>Stay in touch</p>
    <NavLink svg="subscribe" href="/subscribe" label="Subscribe" shortcut="8" />
    <Contact svg="chat" label="Contact" shortcut="/" />
    <NavLink svg="linkedin" href="https://www.linkedin.com/in/nisargtrivedi1112/" label="LinkedIn" external="true" />
  </nav>
);

const ThemeSwitcher = ({ theme, setTheme, closeFabMenu }) => (
  <div className={styles.fabThemeWrapper} 
    onClick={() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      closeFabMenu();
    }}
  >
    <span className={styles.fabThemeIcon}>
      <Image
        src={theme === 'dark' ? '/feather/sun.svg' : '/feather/moon.svg'}
        width={22}
        height={22}
        alt={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        className="iconInvert"
      />
    </span>
    <span className={styles.fabThemeLabel}>
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </span>
  </div>
);

const FabMenu = ({ isClosing, theme, setTheme, closeFabMenu }) => (
  <div className={`${styles.fabMenu} ${isClosing ? styles.fabMenuClosing : ''}`}>
    <div className={styles.fabMenuHeader}>Explore More</div>
    <NavLink svg="reading" href="/reading-list" label="Reading List" isFabItem={true} />
    <NavLink svg="shopping-bag" href="/goods" label="Aesthetic Goods" isFabItem={true} />
    <NavLink svg="newsletters" href="/newsletters" label="Newsletters" isFabItem={true} />
    <NavLink svg="youtube" href="/youtube-channels" label="Youtube Channels" isFabItem={true} />
    <NavLink svg="subscribe" href="/subscribe" label="Subscribe" isFabItem={true} />
    <div className={styles.fabDivider} />
    <ThemeSwitcher theme={theme} setTheme={setTheme} closeFabMenu={closeFabMenu} />
    <div className={styles.fabDivider} />
  </div>
);

const MobileMenu = ({ isFabOpen, isClosing, theme, setTheme, closeFabMenu, toggleFab }) => (
  <div className={styles.mobileContainer}>
    <div
      className={`${styles.fabOverlay} ${isFabOpen ? styles.fabOverlayVisible : ''}`}
      onClick={closeFabMenu}
    />
    <nav className={styles.mobileNav}>
      <NavLink svg="recents" href="/" label="Home" shortcut="1" />
      <NavLink svg="about" href="/about" label="About" shortcut="2" />
      <NavLink svg="blogs" href="/blogs" label="Blogs" shortcut="3" />
      <Contact svg="chat" label="Contact" isFabItem={true} />
      <NavLink svg="linkedin" href="https://www.linkedin.com/in/nisargtrivedi1112/" label="LinkedIn" external="true" isFabItem={true} />
    </nav>

    <div className={styles.fabWrapper}>
      <button
        className={`${styles.fab} ${isFabOpen ? styles.fabOpen : ''}`}
        onClick={toggleFab}
      >
        <span className={styles.fabIcon}>+</span>
      </button>

      {isFabOpen && (
        <FabMenu 
          isClosing={isClosing}
          theme={theme}
          setTheme={setTheme}
          closeFabMenu={closeFabMenu}
        />
      )}
    </div>
  </div>
);

export default function Menu() {
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const closeFabMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsFabOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const toggleFab = (e) => {
    e.stopPropagation();
    setIsFabOpen(!isFabOpen);
  };

  useEffect(() => {
    const handleRouteChange = () => closeFabMenu();
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isFabOpen && !event.target.closest(`.${styles.fabWrapper}`)) {
        closeFabMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isFabOpen]);

  return (
    <>
      <DesktopMenu />
      <MobileMenu 
        isFabOpen={isFabOpen}
        isClosing={isClosing}
        theme={theme}
        setTheme={setTheme}
        closeFabMenu={closeFabMenu}
        toggleFab={toggleFab}
      />
    </>
  );
}
