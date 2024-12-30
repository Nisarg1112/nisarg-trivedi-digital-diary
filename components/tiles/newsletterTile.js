import styles from "./newsletterTile.module.css";
import Image from "next/image";
import util from "../../styles/util.module.css";

export default function NewsletterTile({
  internalUrl,
  imageUrl,
  title,
  content,
  url,
  tags,
  fav,
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.container}
    >
      <div className={styles.image}>
        <Image
          priority
          src={imageUrl}
          width={64}
          height={64}
          layout="fixed"
          alt={title}
        />
      </div>

      <div className={styles.stack}>
        <div>
          <h3 className={util.tileTitle + " " + styles.inline}>{title}</h3>
          <span className={styles.externalIcon}>↗</span>
        </div>
        <p className={util.tileContent}>{content}</p>
        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
