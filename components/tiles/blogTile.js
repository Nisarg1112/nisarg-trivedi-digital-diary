import styles from "./blogTile.module.css";

export default function BlogTile({ title, url, date, fav, tags, description }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.meta}>
          <div className={styles.dateWrapper}>
            <svg 
              className={styles.calendarIcon} 
              width="14" 
              height="14" 
              viewBox="0 0 16 16" 
              fill="currentColor"
            >
              <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
              <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            <span className={styles.date}>{date}</span>
          </div>
          {tags?.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag.name} className="tag">
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.titleLink}>
          <h3 className={styles.title}>
            {title}
            <span className={styles.externalIcon}>↗</span>
          </h3>
        </a>

        {description && <p className={styles.description}>{description}</p>}
      </div>

      {fav && (
        <div className={styles.favorite}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.33L10.06 5.5L14.67 6.18L11.33 9.43L12.12 14.02L8 11.84L3.88 14.02L4.67 9.43L1.33 6.18L5.94 5.5L8 1.33Z" fill="currentColor" />
          </svg>
        </div>
      )}
    </div>
  );
}