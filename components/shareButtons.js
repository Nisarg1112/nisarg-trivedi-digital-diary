import styles from '../styles/blog.module.css'

export default function ShareButtons({ url, title }) {
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  }

  return (
    <div className={styles.shareContainer}>
      <span className={styles.shareText}>Share this article:</span>
      <div className={styles.shareButtons}>
        {Object.entries(shareLinks).map(([platform, link]) => (
          <a
            key={platform}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.shareButton} ${styles[platform]}`}
            aria-label={`Share on ${platform}`}
          >
            <span className={styles.shareIcon}>{platform}</span>
          </a>
        ))}
      </div>
    </div>
  )
}