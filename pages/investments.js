import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import InvestmentTile from "../components/tiles/investmentTile";
import SEO from '../components/SEO/index.js'

export default function Investments({ list = [] }) {
  useEffect(() => {
    let thisPage = document.querySelector("#investmentsPage");
    let top = sessionStorage.getItem("investments-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }

    const handleScroll = () => {
      sessionStorage.setItem("investments-scroll", thisPage.scrollTop);
    };

    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  const description =
    "Below are my current investment holdings. They range from 20% of my investable asset to as small as $1K, roughly ordered by my position size.";

  return (
    <>
      <SEO
        title="Nisarg's Investments"
        description={description}
        type="website"
      />
      <main className={util.page} id="investmentsPage">
        <div className={util.pageColumn}>
          <h1 className={util.header}>Investments</h1>
          <div className={util.description}>
            <p>{description}</p>
            <p>
              {"With public equity, I invest in 5-20 stocks at any given time. With crypto, I'm heavy in Ethereum and Solana, and tend hold positions in 1-5 smaller cap tokens."}
            </p>
            <p>
              {"In the private market, I've only invested in a select few. If you are a seed stage founder, I can be helpful giving product feedback, connecting you to design resources, and introducing you to folks at "}
              <a
                className={util.externalLink}
                href="https://www.kleinerperkins.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kleiner Perkins
              </a>
              {", "}
              <a
                className={util.externalLink}
                href="https://republic.com/venture-programs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Republic
              </a>
              {" or some other investors who write larger checks."}
            </p>
          </div>

          <ul className={util.list}>
            <p className={util.textDivider}>Private</p>
            {list
              .filter((item) => item.private)
              .map((item) => (
                <InvestmentTile
                  key={item.id}
                  {...item}
                />
              ))}
            <p className={util.textDivider}>Public</p>
            {list
              .filter((item) => !item.private)
              .map((item) => (
                <InvestmentTile
                  key={item.id}
                  {...item}
                />
              ))}
          </ul>
        </div>
      </main>
    </>
  );
}

// TODO: Migrate this to Sanity once the page is ready.
export async function getStaticProps() {
  return {
    props: {
      list: [], // Return empty array instead of Notion data
    },
    revalidate: 9999999999999999,
  };
}
