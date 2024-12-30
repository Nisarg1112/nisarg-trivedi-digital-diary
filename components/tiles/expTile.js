import styles from ".//expTile.module.css";
import util from "../../styles/util.module.css";

export default function ExpTile({ title, content, url, date }) {
  // Split by newlines if they exist, otherwise wrap single content in array
  const contentItems = content.includes('\n') 
    ? content.split('\n').filter(item => item.length > 0)
    : [content];
  
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.date}>{date}</p>
      </div>
      <div className={styles.stack}>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.titleLink}
          >
            <h3 className={util.tileTitle + " " + styles.inline}>{title}</h3>
            <span className={styles.externalIcon}>↗</span>
          </a>
        ) : (
          <h3 className={util.tileTitle + " " + styles.inline}>{title}</h3>
        )}
        <div className={styles.content}>
          <ul className={styles.bulletList}>
            {contentItems.map((item, index) => (
              <li key={index} className={styles.bulletItem}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
