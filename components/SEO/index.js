import Head from 'next/head'

export default function SEO({
  title = "Nisarg Trivedi - Portfolio",
  description = "Personal portfolio and blog by Nisarg Trivedi",
  image = "/og-image.jpeg",
  url = process.env.DOMAIN,
  type = "website",
  keywords = "developer, portfolio, blog",
  author = "Nisarg Trivedi",
  excerpt,
  domain = process.env.DOMAIN,
  isArticle = false
}) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />
      
      {/* Technical Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={isArticle ? 'article' : type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Nisarg Trivedi" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={domain} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* AI/Schema Optimization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": isArticle ? "Article" : "WebSite",
          "headline": title,
          "description": description,
          "image": image,
          "author": {
            "@type": "Person",
            "name": author
          },
          "url": url,
          ...(isArticle && {
            "datePublished": new Date().toISOString(),
            "articleBody": excerpt
          })
        })}
      </script>
    </Head>
  )
}
