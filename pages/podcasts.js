import util from "../styles/util.module.css";
import React, { useEffect } from "react";
import PodcastTile from "../components/tiles/podcastTile";
import { client } from "../sanity/lib/client";
import SEO from '../components/SEO/index.js'

export default function Podcasts({ list }) {
  useEffect(() => {
    let thisPage = document.querySelector("#podcastPage");
    let top = sessionStorage.getItem("podcast-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("podcast-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  const description = "Mainly business and finance because there are infinite material to talk about. I used to listen to a few UX podcasts but most of them died except Design Details.";

  return (
    <>
      <SEO 
        title="Nisarg's Podcasts"
        description={description}
        type="website"
      />
      <main className={util.page} id="podcastPage">
        <div className={util.pageColumn}>
          <h1 className={util.header}>Podcasts</h1>
          <p className={util.description}>{description}</p>
          <ul className={util.grid}>
            {list.map((item) => (
              <PodcastTile
                key={item._id}
                imageUrl={item.logo}
                title={item.name}
                content={item.body}
                url={item.url}
                tags={item.tags}
                fav={item.fav}
              />
            ))}
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
