import Head from "next/head";
import util from "../styles/util.module.css";
import ReadingListTile from "../components/tiles/readingListTile";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Settings from "../components/settings";
import { client } from '../sanity/lib/client'
import SEO from '../components/SEO/index.js'


export default function ReadingList({ list }) {
  const description =
    "From various blogs, articles, webpages to videos and tweets, this page is a collection of learning materials that I enjoy. I add to the list frequently, and will improve sorting and filtering soon.";

  const router = useRouter();
  const [filter, setFilter] = React.useState(null);
  const [fav, setFav] = React.useState(null);
  const [currentList, setCurrentList] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    let thisPage = document.querySelector("#readingPage");
    let top = sessionStorage.getItem("reading-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("reading-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  const filters = [
    "General",
    "Business & Finance",
    "Design",
    "Tech",
    "Career Development",
  ];

  function removeFilter() {
    setFilter("all");
  }
  function handleTagChange(e) {
    setFilter(e.target.innerHTML);
  }

  useEffect(() => {
    if (router.query.filter && router.query.filter !== filter) {
      setFilter(router.query.filter);
    }
  }, [router.query.filter]);

  useEffect(() => {
    if (router.query.favonly) {
      if (fav == false) {
        setFav(true);
      }
    } else {
      setFav(false);
    }
  }, [router.query.favonly]);

  useEffect(() => {
    if (router && router.query.filter == null) {
      let filterSelected = sessionStorage.getItem("reading-filter");
      if (filterSelected && filterSelected !== filter) {
        setFilter(filterSelected);
      } else {
        setFilter("all");
      }
    }
    if (router && router.query.favonly == null) {
      let favSelected = sessionStorage.getItem("reading-fav");
      if (favSelected == "true") {
        setFav(true);
      } else {
        setFav(false);
      }
    }
  }, []);

  useEffect(() => {
    if (filter && fav !== null) {
      let tempList = [...list];

      // Apply search filter first
      if (searchTerm) {
        tempList = tempList.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Then apply existing filters
      if (filter !== "all" && !fav) {
        router.push({ query: { filter: filter } });
        sessionStorage.setItem("reading-filter", filter);
        sessionStorage.setItem("reading-fav", false);
        tempList = tempList.filter(item => item.tags?.includes(filter.replace("&amp;", "&")));
      } 
      else if (filter !== "all" && fav) {
        router.push({ query: { filter: filter, favonly: fav } });
        sessionStorage.setItem("reading-filter", filter);
        sessionStorage.setItem("reading-fav", true);
        tempList = tempList.filter(item => 
          item.tags?.includes(filter.replace("&amp;", "&")) && item.fav
        );
      }
      else if (filter === "all" && fav) {
        router.push({ query: { favonly: fav } });
        sessionStorage.setItem("reading-filter", "all");
        sessionStorage.setItem("reading-fav", true);
        tempList = tempList.filter(item => item.fav);
      }
      else {
        router.push({ query: {} });
        sessionStorage.setItem("reading-filter", "all");
        sessionStorage.setItem("reading-fav", false);
      }

      setCurrentList(tempList);
    }
  }, [filter, fav, searchTerm]);

  return (
    <>
      <SEO 
        title="Nisarg's Reading List"
        description={description}
        type="website"
      />
      <main className={util.page} id="readingPage">
        <div className={util.pageColumn}>
          <h1 className={util.header}>Reading List 📚</h1>
          <p className={util.description}>{description}</p>

          <div className={util.searchContainer}>
            <svg className={util.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search reading list..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={util.searchInput}
            />
          </div>

          <ul className={util.list}>
            <div className={util.tabBar}>
              <div className={util.tabRow}>
                <button
                  onClick={removeFilter}
                  className={util.tab}
                  role="tab"
                  aria-selected={filter == "all" ? "true" : null}
                >
                  Recently Added
                </button>
                {filters.map((filterName) => (
                  <button
                    key={filterName}
                    onClick={handleTagChange}
                    className={util.tab}
                    role="tab"
                    aria-selected={
                      filter
                        ? filterName == filter.replace("&amp;", "&")
                          ? "true"
                          : null
                        : null
                    }
                  >
                    {filterName}
                  </button>
                ))}
              </div>
              <Settings status={fav} updateCheckbox={setFav} />
            </div>

            {currentList ? (
              currentList.length == 0 ? (
                <div className={util.emptyState}>
                  Nothing found. Please try adjusting the filter.
                </div>
              ) : (
                currentList.map((link) => (
                  <ReadingListTile
                    key={link._id}
                    title={link.name}
                    url={link.url}
                    date={link._createdAt}
                    fav={link.fav}
                    tags={link.tags}
                  />
                ))
              )
            ) : (
              <p>loading...</p>
            )}
          </ul>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const readingList = await client.fetch(`
      *[_type == "readingList" && display == true] | order(_createdAt desc) [0...8] {
        _id,
        name,
        url,
        _createdAt,
        fav,
        tags
      }
    `)

  return {
    props: {
      list: readingList,
    },
    revalidate: 300,
  };
}
