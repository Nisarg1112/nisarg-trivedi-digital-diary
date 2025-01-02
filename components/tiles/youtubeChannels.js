import styles from "./youtubeChannelsTile.module.css";
import Image from "next/image";
import util from "../../styles/util.module.css";

export default function YoutubeChannelsTile({
  imageUrl,
  title,
  content,
  url,
  tags,
  fav
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.container}
    >
      <div>
        <Image
          priority
          className={styles.image}
          src={imageUrl}
          width={288}
          height={288}
          alt={title}
        />
      </div>

      <div className={styles.stack}>
        <div>
          <h3 className={util.tileTitle + " " + styles.inline}>{title}</h3>
          <span className={styles.externalIcon}>↗</span>
        </div>
        <p className={styles.content}>{content}</p>
      </div>
    </a>
  );
}
