import util from "../styles/util.module.css";
import React, { useEffect } from "react";
import YoutubeChannelsTile from "../components/tiles/youtubeChannels.js";
import { client } from "../sanity/lib/client.js";
import SEO from '../components/SEO/index.js'
import Settings from "../components/settings";
import { useRouter } from "next/router";

export default function YoutubeChannels({ list }) {
  const router = useRouter();
  const [filter, setFilter] = React.useState(null);
  const [fav, setFav] = React.useState(null);
  const [currentList, setCurrentList] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filters = [
    "Tech",
    "Entertainment",
    "Science",
    "General",
    "Politics",
    "Lifestyle",
    "Business & Finance",
    "DSA",
  ];

  useEffect(() => {
    let thisPage = document.querySelector("#youtubeChannelsPage");
    let top = sessionStorage.getItem("channel-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("channel-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

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
      let filterSelected = sessionStorage.getItem("channel-filter");
      if (filterSelected && filterSelected !== filter) {
        setFilter(filterSelected);
      } else {
        setFilter("all");
      }
    }
    if (router && router.query.favonly == null) {
      let favSelected = sessionStorage.getItem("channel-fav");
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
      console.log(tempList)

      if (searchTerm) {
        tempList = tempList.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filter !== "all" && !fav) {
        router.push({ query: { filter: filter } });
        sessionStorage.setItem("channel-filter", filter);
        sessionStorage.setItem("channel-fav", false);
        tempList = tempList.filter(item => item.tags?.includes(filter));
      } 
      else if (filter !== "all" && fav) {
        router.push({ query: { filter: filter, favonly: fav } });
        sessionStorage.setItem("channel-filter", filter);
        sessionStorage.setItem("channel-fav", true);
        tempList = tempList.filter(item => 
          item.tags?.includes(filter) && item.fav
        );
      }
      else if (filter === "all" && fav) {
        router.push({ query: { favonly: fav } });
        sessionStorage.setItem("channel-filter", "all");
        sessionStorage.setItem("channel-fav", true);
        tempList = tempList.filter(item => item.fav);
      }
      else {
        router.push({ query: {} });
        sessionStorage.setItem("channel-filter", "all");
        sessionStorage.setItem("channel-fav", false);
      }

      setCurrentList(tempList);
    }
  }, [filter, fav, searchTerm]);

  const description = "Youtube channels that I follow and enjoy watching. I have a wide range of interests, so the channels are quite diverse.";

  return (
    <>
      <SEO 
        title="Nisarg's Youtube Channels"
        description={description}
        type="website"
      />
      <main className={util.page} id="youtubeChannelsPage">
        <div className={util.pageColumn}>
          <h1 className={util.header}>My favourite Youtube Channels</h1>
          <p className={util.description}>{description}</p>

          <div className={util.searchContainer}>
            <svg className={util.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={util.searchInput}
            />
          </div>

          <div className={util.tabBar}>
            <div className={util.tabRow}>
              <button
                onClick={removeFilter}
                className={util.tab}
                role="tab"
                aria-selected={filter == "all" ? "true" : null}
              >
                All Channels
              </button>
              {filters.map((filterName) => (
                <button
                  key={filterName}
                  onClick={handleTagChange}
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

          <ul className={util.grid}>
            {currentList ? (
              currentList.length === 0 ? (
                <div className={util.emptyState}>
                  Nothing found. Please try adjusting the filter.
                </div>
              ) : (
                currentList.map((item) => (
                  <YoutubeChannelsTile
                    key={item._id}
                    imageUrl={item.logo}
                    title={item.name}
                    content={item.body}
                    url={item.url}
                    tags={item.tags}
                    fav={item.fav}
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
  const list = await client.fetch(`
    *[_type == "podcast"] | order(order asc) {
      _id,
      name,
      "logo": logo.asset->url,
      body,
      url,
      tags,
      fav
    }
  `);

  return {
    props: {
      list
    },
    revalidate: 600
  };
}
