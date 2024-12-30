import styles from ".//readingListTile.module.css";
import Image from "next/image";
import util from "../../../styles/util.module.css";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function ReadingListTile({ title, url, date, fav, tags }) {
  let displayUrl = url
    .replace("https://www.", "")
    .replace("http://www.", "")
    .replace("https://", "")
    .replace("http://", "");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.container}
    >
      <div className={styles.icon}>
        <Image
          unoptimized
          onError="this.src='/feature/link.svg'"
          src={
            "https://s2.googleusercontent.com/s2/favicons?domain_url=" +
            url +
            "&sz=64"
          }
          height={20}
          width={20}
          alt="url favicon"
        />
      </div>
      <div className={styles.right}>
        <div className={styles.stack}>
          <div>
            <h3 className={styles.tileTitle}>{title}</h3>
            <div className={styles.tags}>
              {Array.isArray(tags) && tags.length > 0 && tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {typeof tag === 'string' ? tag : tag.value || tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
