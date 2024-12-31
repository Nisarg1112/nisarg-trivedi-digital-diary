import util from "../styles/util.module.css";
import BlogTile from "../components/tiles/blogTile";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Settings from "../components/settings";
import { client } from "../sanity/lib/client";
import SEO from '../components/SEO/index.js';
import SubstackSubscribe from "../components/substackSubscribe";


export default function BlogList({ blogs }) {
  const description = "Explore blogs on various topics, neatly categorized with tags.";

  const router = useRouter();
  const [filter, setFilter] = React.useState("all");
  const [fav, setFav] = React.useState(false);
  const [currentList, setCurrentList] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");


  const filters = [
    "General",
    "Business & Finance",
    "Design",
    "Tech",
    "Compensation",
  ];

  // Handle tag filter and fav toggle
  useEffect(() => {
    let tempList = [...blogs];
    // Search filter
    if (searchTerm) {
      tempList = tempList.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filter !== "all") {
      tempList = tempList.filter((blog) =>
        blog.tags?.some((tag) => tag.label === filter)
      );
    }
    if (fav) {
      tempList = tempList.filter((blog) => blog.fav);
    }
    setCurrentList(tempList);

    // Update query params in the URL
    const queryParams = {};
    if (filter !== "all") queryParams.filter = filter;
    if (fav) queryParams.favonly = "true";
    router.push({ query: queryParams }, undefined, { shallow: true });
  }, [filter, fav, blogs, searchTerm]);

  return (
    <>
      <SEO 
        title="Nisarg's Blogs"
        description={description}
        type="website"
      />

      <main className={util.page} id="readingPage">
        <div className={util.pageColumn}>
          <h1 className={util.header}>Blogs ✍️</h1>
          <p className={util.description}>{description}</p>
          <div className={util.searchContainer}>
          <svg className={util.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={util.searchInput}
          />
        </div>
          <ul className={util.list}>
            {/* Filters and Settings */}
            <div className={util.tabBar}>
              <div className={util.tabRow}>
                <button
                  onClick={() => setFilter("all")}
                  className={util.tab}
                  role="tab"
                  aria-selected={filter === "all" ? "true" : null}
                >
                  Recently Added
                </button>
                {filters.map((filterName) => (
                  <button
                    key={filterName}
                    onClick={() => setFilter(filterName)}
                    className={util.tab}
                    role="tab"
                    aria-selected={filter === filterName ? "true" : null}
                  >
                    {filterName}
                  </button>
                ))}
              </div>
              <Settings status={fav} updateCheckbox={setFav} />
            </div>

            {/* Blog List */}
            {currentList.length === 0 ? (
              <div className={util.emptyState}>
                Nothing found. Please try adjusting the filter.
              </div>
            ) : (
              currentList.map((blog) => (
                <BlogTile
                  key={blog._id}
                  title={blog.title}
                  url={`/blogs/${blog.slug.current}`}
                  date={new Date(blog.publishedAt).toLocaleDateString()}
                  fav={blog.fav}
                  tags={blog.tags?.map((tag) => ({
                    name: tag.label,
                    id: tag.value,
                  }))}
                  description={blog.description}
                />
              ))
            )}
          </ul>
        <div className={util.divider}></div>
        <SubstackSubscribe variant="default" />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  // Fetch blog list from Sanity
  const blogs = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      description,
      fav,
      tags[] {
        label,
        value
      }
    }
  `);

  return {
    props: { blogs },
    revalidate: 300, // Regenerate the page every 100 seconds
  };
}