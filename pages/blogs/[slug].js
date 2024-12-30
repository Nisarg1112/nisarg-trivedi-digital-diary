import dynamic from 'next/dynamic';
import Head from "next/head";
import Image from 'next/image';
import SEO from '../../components/SEO/index.js';
import util from "../../styles/util.module.css";
import styles from "../../styles/blog.module.css";
import { PortableText } from "@portabletext/react";
import { client } from "../../sanity/lib/client";
import { format } from "date-fns";
import imageUrlBuilder from '@sanity/image-url';

const ShareButtons = dynamic(() => import("../../components/shareButtons"));
const Analytics = dynamic(() => import("@vercel/analytics/react").then(mod => mod.Analytics), {
  ssr: false,
  loading: () => <p>Loading...</p>
});
const CodeBlock = dynamic(() => import("../../components/CodeBlock"));

const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

const components = {
  types: {
    table: ({value}) => (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {value.rows[0].cells.map((cell, index) => (
                <th key={index}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.rows.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    embedVideo: ({value}) => {
      const getEmbedUrl = (url) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
          const videoId = url.split('v=')[1] || url.split('/').pop();
          return `https://www.youtube.com/embed/${videoId}`;
        }
        if (url.includes('vimeo.com')) {
          const videoId = url.split('/').pop();
          return `https://player.vimeo.com/video/${videoId}`;
        }
        return url;
      };

      return (
        <div className={styles.videoWrapper}>
          <iframe
            src={getEmbedUrl(value.url)}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.videoIframe}
          />
        </div>
      );
    },
    giphy: ({value}) => (
      <div className={styles.giphyContainer}>
        <iframe
          src={`${value.url}/embed`}
          width="100%"
          frameBorder="0"
          className={styles.giphyIframe}
          allowFullScreen
        />
        {value.caption && (
          <p className={styles.giphyCaption}>{value.caption}</p>
        )}
      </div>
    ),
    code: ({value}) => <CodeBlock value={value} />,
    inlineCode: ({value}) => (
      <code className={styles.inlineCode}>{value.code}</code>
    ),
    image: ({value}) => {
      const imageUrl = client.config().projectId 
        ? `https://cdn.sanity.io/images/${client.config().projectId}/${client.config().dataset}/${value.asset._ref
            .replace('image-', '')
            .replace('-jpg', '.jpg')
            .replace('-png', '.png')}`
        : '';
      
      return (
        <div className={styles.imageContainer}>
          <img
            src={imageUrl}
            alt={value.alt || ''}
            className={styles.blogImage}
          />
          {value.caption && (
            <figcaption className={styles.imageCaption}>{value.caption}</figcaption>
          )}
        </div>
      );
    },
    layout: ({value}) => {
      const columns = value.columns || [];
      return (
        <div className={styles.layoutGrid}>
          {columns.map((column, index) => (
            <div key={column._key || index} className={styles.layoutColumn}>
              <PortableText value={column} components={components} />
            </div>
          ))}
        </div>
      );
    }
  },
  block: {
    h1: ({children}) => <h1 className={styles.heading1}>{children}</h1>,
    h2: ({children}) => <h2 className={styles.heading2}>{children}</h2>,
    h3: ({children}) => <h3 className={styles.heading3}>{children}</h3>,
    normal: ({children}) => <p className={styles.paragraph}>{children}</p>,
    blockquote: ({children}) => (
      <blockquote className={styles.blockquote}>{children}</blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className={styles.bulletList}>{children}</ul>,
    number: ({children}) => <ol className={styles.numberedList}>{children}</ol>,
  },
  marks: {
    link: ({value, children}) => (
      <a href={value.href} className={styles.link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    code: ({children}) => <code className={styles.code}>{children}</code>,
  },
};

export default function BlogDetail({ blog }) {
  if (!blog) return <p>Loading...</p>;
  const blogUrl = `${process.env.DOMAIN}/blogs/${blog.slug.current}`;

  // Ensure consistent date formatting
  const formattedDate = format(new Date(blog.publishedAt), "MMMM dd, yyyy");

  return (
    <>
      <SEO 
        title={blog.title || "Blog"}
        description={blog.excerpt || blog.description}
        image={urlFor(blog.image).url()}
        url={blogUrl}
        type="article"
        keywords={blog.seoKeywords?.map(tag => tag.value).join(', ')}
        excerpt={blog.excerpt}
        isArticle={true}
      />
      <main className={`${util.page}`}>
        {blog.image && (
          <div className={styles.featuredImage}>
            <img
              src={urlFor(blog.image).url()}
              alt={blog.title}
              className={styles.headerImage}
            />
          </div>
        )}
        <div className={`${util.pageColumn} ${styles.blogContent}`}>
          {/* Blog Title */}
          <h1 className={util.header}>{blog.title}</h1>

          {/* Metadata */}
          <div className={styles.metadataContainer}>
            <p className={styles.blogMeta}>{formattedDate}</p>
            <div className={styles.blogTags}>
              {blog.tags?.map((tag) => (
                <span key={tag.name} className="tag">
                  {tag.value}
                </span>
              ))}
            </div>
          </div>

          {/* Blog Content */}
          <article className={styles.blogBody}>
<PortableText value={blog.body} components={components} />
          </article>
          <ShareButtons 
            url={blogUrl}
            title={blog.title}
          />
        </div>
        <Analytics />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = await client.fetch(`
    *[_type == "post"] {
      "slug": slug.current
    }
  `);

  const paths = slugs.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const blog = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      publishedAt,
      fav,
      image,
      tags[] {
        label,
        value
      },
      body
    }
  `,
    { slug: params.slug }
  );

  if (!blog) {
    return { notFound: true };
  }

  return {
    props: { blog },
    revalidate: 60, // Regenerate the page every 10 seconds
  };
}
