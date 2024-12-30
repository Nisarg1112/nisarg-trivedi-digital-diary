import Head from "next/head";
import util from "../styles/util.module.css";
import React, { useEffect } from "react";
import NewsletterTile from "../components/tiles/newsletterTile";
import { client } from "../sanity/lib/client";
import SEO from '../components/SEO/index.js'

export default function Newsletters({ list }) {
  // Keep the scroll position logic unchanged
  useEffect(() => {
    let thisPage = document.querySelector("#newslettersPage");
    let top = sessionStorage.getItem("newsletters-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("newsletters-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  const description = "I skim through a lot of newsletters everyday. But below are the ones I pay closer attention to and frequently share with friends.";

  return (
    <>
      <SEO 
        title="Nisarg's Newsletters"
        description={description}
        type="website"
      />
      <main className={util.page} id="newslettersPage">
        <div className={util.pageColumn}>
          <h1 className={util.header}>Newsletters</h1>
          <p className={util.description}>{description}</p>
          <ul className={util.list}>
            {list.map((item) => (
              <NewsletterTile
                key={item._id}
                internalUrl={item.path}
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
    *[_type == "newsletter" && display == true] | order(order asc) {
      _id,
      name,
      path,
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
    revalidate: 5
  };
}
