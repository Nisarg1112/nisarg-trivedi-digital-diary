import styles from './substackSubscribe.module.css';
import util from '../styles/util.module.css';

export default function SubstackSubscribe({ variant = 'default' }) {
  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      <h3 className={util.tileTitle}>{"Stay Updated ✍️"}</h3>
      <p className={util.tileContent}>{"Get notified when I publish new content. No spam, unsubscribe anytime."}</p>
      <div className={styles.iframeWrapper}>
        <iframe 
          src="https://nisargt.substack.com/embed" 
          className={styles.iframe}
          frameBorder="0" 
          scrolling="no"
        />
      </div>
    </div>
  );
}
