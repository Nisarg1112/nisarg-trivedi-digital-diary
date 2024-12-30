import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import Link from "next/link";
import Tile from "../components/tiles/homeVersions/tile";
import ReadingListTile from "../components/tiles/homeVersions/readingListTile";
import GoodsTile from "../components/tiles/homeVersions/goodsTile";
import StoreTile from "../components/tiles/homeVersions/storeTile";
import styles from "../pages/index.module.css";
import OnboardingCard from "../components/onboardingCard";
import { motion, AnimatePresence } from "framer-motion";
import { client } from '../sanity/lib/client'
import SEO from '../components/SEO/index.js';


export default function Home({ updatesList, goodsList, readingListList }) {
  //create masterlist objects with uuid and text and cta
  const tips = [
    {
      id: "useShortCut",
      text: "Use keyboard shortcut 1 → 9 to navigate between pages. Try press 2, 3, 4, then 1 to come back here.",
      ctaText: null,
      ctaLink: null,
    },
    {
      id: "firstTime",
      text: "Hi! I’m Nisarg Trivedi, and I believe that helping others and giving back to the community is the key to a happy life for me.",
      ctaText: "More about me →",
      ctaLink: "/about",
    },
    // {
    //   id: "seeTalent",
    //   text: "Many come here for my list of talented builders. If you are looking for a job, drop me a note.",
    //   ctaText: "Go to Talent →",
    //   ctaLink: "/talent",
    // },
    {
      id: "seeHowItWasBuilt",
      text: "If you are curious how the site was built, Stay tuned! I will write a Blog on it.",
      ctaText: null,
      ctaLink: null,
      // ctaText: "Check it out →",
      // ctaLink: "https://twitter.com/sjzhang_/status/1526189236084408324",
    },
    {
      id: "openCal",
      text: "I enjoy meeting random people and help where I can. ",
      ctaText: "My open calendar is here ↗",
      ctaLink: process.env.NEXT_PUBLIC_CALENDER_LINK,
    },
  ];
  //create currentlist of what user need to see
  const [currentTips, setCurrentTips] = React.useState([0]);

  //on load, check masterlist with location storage,
  const [isVisible, setIsVisible] = React.useState(false);
  useEffect(() => {
    let newTips = tips;
    tips.forEach((tip) => {
      if (localStorage.getItem(tip.id)) {
        newTips = newTips.filter((e) => e.id != tip.id);
      }
    });
    //render currentlist
    setCurrentTips(newTips);
    //hide the tip section - framer motion depends on this
    newTips.length < 1 ? setIsVisible(false) : setIsVisible(true);
  }, []);

  const [userTime, setUserTime] = React.useState(null);

  //if all dismissed destroy the box with motion
  useEffect(() => {
    currentTips.length < 1 ? setIsVisible(false) : null;
  }, [currentTips]);

  //when user click on the x on onboarding cards
  //remove the card and write in local storage to not show again
  function handleOnboardingDismiss(e) {
    e.preventDefault();
    let element = e.target.parentElement;
    localStorage.setItem(element.id, true);
    let newTips = currentTips;
    newTips = newTips.filter((e) => e.id != element.id);
    //remove from current array to trigger a change
    setCurrentTips(newTips);
  }

  function resetOnboarding() {
    setCurrentTips(tips);
    tips.forEach((tip) => {
      localStorage.removeItem(tip.id);
    });
    setIsVisible(true);
  }

  useEffect(() => {
    let thisPage = document.querySelector("#recentsPage");
    let top = sessionStorage.getItem("recents-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("recents-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    var greeting =
      hour > 17
        ? "Good evening!"
        : hour > 11
        ? "Good afternoon!"
        : hour > 4
        ? "Good morning!"
        : hour > 2
        ? "It's late, Just go to bed!!! 🌙😴"
        : "Hello World! 🌍👋";
    setUserTime(greeting);
  }, []);

  const description =
    "I’m a software engineer by heart, deeply curious about how things truly work. My interests span across Music, Finance, Geopolitics/Politics, History, Spirituality, Religious Scriptures, Technology, and Computer Science. If you enjoy diving deep into meaningful topics and no-fluff engineering, welcome to my corner of the internet, where I share my thoughts, discoveries, and tech adventures.";

  return (
    <>
      <SEO 
        title="Nisarg's · Home"
        description={description}
        type="website"
      />
      {" "}
      <main className={util.page} id="recentsPage">
        <div className={styles.homeColumn}>
          <h1 className={styles.homeGreetingTitle}>
            {userTime ? userTime : "Hello World!"}
          </h1>
          <span className={styles.tinyText}>
            I’m Nisarg Trivedi — Welcome to my digital space! 💻🌐{" "}
          </span>
          <p className={styles.homeDescription}>{description}</p>
          <h2 className={styles.tipsHeader}>Tips to get started 🚀💡</h2>
          <span className={styles.tipsTinyText}>
            {isVisible
              ? `Below are some tips to get you started on this website.`
              : null}
            {!isVisible ? (
              <span onClick={resetOnboarding} className={styles.reset}>
                Need a refresher? Reset onboarding.
              </span>
            ) : null}
          </span>
          <AnimatePresence mode={"sync"}>
            {isVisible && (
              <motion.div
                className={styles.introContainer}
                layout
                // transition={{ type: "spring" }}
                initial={{
                  opacity: 0,
                  height: 0,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                animate={{
                  opacity: 1,
                  height: 130,
                  transition: { delay: 0.25, duration: 0.4, ease: "easeInOut" },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
              >
                <AnimatePresence mode={"popLayout"}>
                  {currentTips.map((tip) => (
                    <OnboardingCard
                      key={tip.id}
                      handleDismiss={handleOnboardingDismiss}
                      id={tip.id}
                      text={tip.text}
                      ctaText={tip.ctaText}
                      ctaLink={tip.ctaLink}
                      ref={React.createRef()}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
          {/* <div className={styles.homeSectionContainer}>
            <h2 className={styles.homeSectionTitle}>About Me</h2>
            <Link href="/about#about-update">
              <a className={styles.homeLinkButton}>View All</a>
            </Link>
          </div> */}
          {/* <ul className={styles.homeUpdatesGrid}>
            {updatesList.map((item) => (
              <Tile
                key={item.id}
                internalUrl={item.properties.Path?.url || null}
                logoUrl={item.properties.Logo?.files[0]?.file?.url || null}
                title={item.properties.Name.title[0].plain_text}
                content={item.properties.Body.rich_text}
                url={item.properties.URL.url}
                date={item.properties.Time.date.start}
                tags={item.properties.Tags.multi_select}
              />
            ))}
          </ul> */}
          {/* <div className={styles.homeSectionContainer}>
            <h2 className={styles.homeSectionTitle}>Aesthetic Goods</h2>
            <Link href="/goods">
              <a className={styles.homeLinkButton}>View All</a>
            </Link>
          </div> */}
          {/* <ul className={styles.homeGoodsGrid}>
            {goodsList.map((link) => (
              <GoodsTile
                key={link.id}
                title={link.properties.Name.title[0].plain_text}
                url={link.properties.URL.url}
                date={link.created_time}
                note={link.properties.Note.rich_text}
                fav={link.properties.Fav.checkbox}
                tags={link.properties.Tags.multi_select}
                thumbnailUrl={link.properties.Thumbnail.files[0].file.url}
                price={link.properties.Price.number}
                brand={link.properties.Brand.rich_text[0].plain_text}
              />
            ))}
          </ul> */}
          <div className={styles.homeSectionContainer}>
            <h2 className={styles.homeSectionTitle}>Good Reads 📚✨</h2>
            <Link href="/reading-list">
              <a className={styles.homeLinkButton}>View All</a>
            </Link>
          </div>{" "}
          <ul className={styles.homeReadingGrid}>
            {readingListList.map((link) => (
              <ReadingListTile
                key={link._id}
                title={link.name}
                url={link.url}
                date={link._createdAt}
                fav={link.fav}
                tags={link.tags}
              />
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const updates = await client.fetch(`
    *[_type == "update" && display == true] | order(time desc) [0...4] {
      _id,
      name,
      path,
      "logo": logo.asset->url,
      body,
      url,
      time,
      tags
    }
  `)

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
      updatesList: updates,
      readingListList: readingList
    },
    revalidate: 300
  }
}