import util from "../styles/util.module.css";
import Link from "next/link";
import SEO from '../components/SEO/index.js';

export default function Custom404() {
  return (
    <>
      <SEO 
        title="404 - Page Not Found"
        description="The page you're looking for cannot be found"
        type="website"
      />
      <main className={util.page} id="errorPage">
        <div className={util.errorContainer}>
          <div className={util.glitchWrapper}>
            <h1 className={util.glitchText} data-text="404">404</h1>
          </div>
          <p className={util.errorMessage}>Oops! Looks like you've ventured into the void</p>
          <div className={util.errorAnimation}>
            <span className={util.particle}>⟡</span>
            <span className={util.particle}>◇</span>
            <span className={util.particle}>⟡</span>
          </div>
          <Link href="/">
            <button className={util.errorButton}>
              <span className={util.buttonText}>← Return to Safety</span>
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
