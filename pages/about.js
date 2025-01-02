import Link from "next/link";
import React, { useEffect } from "react";
import util from "../styles/util.module.css";
import ContactContent from "../components/contactContent";
import ExpTile from "../components/tiles/expTile";
import { client } from '../sanity/lib/client'
import { groq } from 'next-sanity'
import SEO from '../components/SEO/index.js';


export default function About({ list, expList }) {
  useEffect(() => {
    let thisPage = document.querySelector("#aboutPage");
    let top = sessionStorage.getItem("about-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("about-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  const description = `I’m a software engineer by heart, deeply curious about how things truly work. My interests span across Music, Astronomy, Cricket, Finance, Geopolitics/Politics, History, Spirituality, Religious Scriptures, Technology, and Computer Science. If you enjoy diving deep into meaningful topics and no-fluff engineering, welcome to my corner of the internet, where I share my thoughts, discoveries, and tech adventures.`;

  return (
    <>
      <SEO 
        title="Nisarg · About"
        description={description}
        type="website"
      />
      <main className={util.page} id="aboutPage">
        <div className={util.pageColumn}>
          <h1 className={util.header}>About 📝</h1>
          <div className={util.inset}>
            <p className={util.description}>{description}</p>
            {/* <div className={util.read}>
              <h2 style={{ padding: "1rem 0rem 0rem 0rem" }} id="about-update">
                Updates
              </h2>
            </div>
            <ul className={util.list} style={{ margin: "0rem 0rem 0rem 0rem" }}>
              {list.map((item) => (
                <Tile
                  key={item.id}
                  internalUrl={item.properties.Path.url || null}
                  logoUrl={item.properties.Logo?.files[0]?.file?.url || null}
                  title={item.properties.Name.title[0].plain_text}
                  content={item.properties.Body.rich_text}
                  url={item.properties.URL.url}
                  date={item.properties.Time.date.start}
                  tags={item.properties.Tags.multi_select}
                />
              ))}
            </ul> */}
            {/* <div className={util.divider}></div> */}
            <div className={util.read}>
              <h2>Me 👾</h2>
              <p>
                {
                "I was born and raised in the vibrant city of Rajkot, Gujarat. Growing up, I was that kid who was always curious about computers—though, ironically, I didn’t have one of my own. It wasn’t until 2021, during a time when the world was scrambling through lockdowns (thanks to someone who decided to eat a bat in China 🤦🏽‍♂️), that I finally got my hands on my very first computer. And trust me, it was a game-changer. (Want to know how I got my first machine? Stay tuned for a blog post on that soon!)"
                }
              </p>
              <p>
                {"Since then, I’ve been on a mission to decode the world of computers, diving deep into coding, software, and everything tech-related. The journey has been exciting, filled with learning curves and moments of pure fascination."}
              </p>
              <p>
                {
                  "But here's the thing: I don’t just stop at tech. I have an insatiable curiosity about how the world works—complex systems, human behavior, the science behind the chaos. And if you’re like me and want to dig into some of the things I’m currently reading or exploring, you can always check out my "
                }
                <Link href="/reading-list">
                  <a className={util.internalLink}>Reading List</a>
                </Link>
                {". 📚"}
              </p>
              <p>
                {
                  "When I’m coding, you’ll probably catch me vibing to music on Spotify. If the tunes stop, it usually means my code has a bug that’s haunting me. Want to see what’s currently on repeat? You can check out "
                }
                <a
                  href="https://volt.fm/user/rkarhonjazighp6j/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={util.externalLink}
                >
                  {"My Spotify Stats"}
                </a>
                {". 🎶🎧"}
              </p>
              <p>
                {"Staying active is a big part of my routine. And I 'try to' hit the gym 5 times a week. When I need a break, you'll mostly find me at a peaceful beach, watching the sunset and letting my thoughts wander. (Not much of a mountain guy, though—don’t ask me to go hiking! 😅)"}
              </p>
              <p>
                {"I like to watch TV shows / Web Series, Movies, Standup Comedy shows, YT videos around random things ranging from 'Tarak Mehta ka Ooltah Chashmah' to. '3Blue1Brown's facinating videos around Maths. But that’s not all—my YouTube feed is a wild mix of everything from geopolitical discussions to deep dives into physics and everything in between. If it’s thought-provoking or just plain entertaining, you’ll find me watching it. 🎥🍿"}
              </p>

              <p>
                {"Oh, and before I forget—I’m working on building a personal dashboard that’ll let you peek into my day-to-day life. Think of it as a mix between data visualization and personal storytelling. Stay tuned for that. 🚀"}
              </p>

              <h2>Career 💼 🚀</h2>
              <p className={util.read}>
                {"I’m currently working at Series B FinTech company "}
                <a
                  href="https://www.refyne.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={util.externalLink}
                >
                  Refyne
                </a>
                {". "}
                {
                  "Where we're working on Building Asia's largest financial wellness platform. Previously I was working at, "
                }
                <a
                  href="https://juspay.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={util.externalLink}
                >
                  JUSPAY
                </a>
                {" which is Series C FinTech startup, where I got a chance to work on UPI technology and building solutions for GooglePay. If you are interested to know more, you can find me on "
                }
                <a
                  href="https://www.linkedin.com/in/s-j-zhang/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={util.externalLink}
                >
                  Linkedin
                </a>
                {". I’ve also added a summary below."}
              </p>
            </div>

            <div>
              {expList?.map((item) => (
                <ExpTile
                  key={item._id}
                  date={item.date}
                  title={item.name}
                  url={item.url}
                  content={item.body}
                />
              ))}
            </div>
            <div className={util.read}>
              <h2>This Site 🌐 🖥️</h2>
              <p>
                {"Friends, I’m a Backend Engineer, and I’ll admit—design and frontend aren’t my strongest suits. But I’ve always wanted to create a digital presence for myself. After browsing through almost 100 different portfolios, I came across one by "}
                <a
                  href="https://x.com/sjzhang_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={util.externalLink}
                >
                  SJ Zhang
                </a>
                {". It was an open-source project with a minimalistic design that I really liked, but it didn’t quite check all the boxes for what I wanted."}
              </p>
              <p>
              {"So, I forked the project, made some changes to fit my style, and now I’m continuously updating it as I learn more. This site is inspired by that open-source project, and I built it for two main reasons:"}
              </p>
              <ol
                type="1"
                start="1"
                style={{ padding: "0rem 0rem 0rem 1.25rem" }}
              >
                <li style={{ marginBottom: "0.5rem" }}>
                  <b>To keep myself accountable with my learning.</b> Sharing my progress publicly pushes me to keep going, especially when I see the growth in real-time.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <b>To give back to the community.</b> I’ve learned a lot from the internet, and this is my way of contributing to the ecosystem. It’s my small effort to pay it forward.
                </li>
              </ol>
              <p>
                This site is built with{" "}
                <a
                  href="https://nextjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={util.externalLink}
                >
                  Next.js
                </a>
                {" "} and deployed on{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={util.externalLink}
                >
                  Vercel
                </a>
                . Content is managed in{" "}
                <a
                  href="http://sanity.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={util.externalLink}
                >
                  Sanity
                </a>{" "}
                and statically pre-rendered through{" "}
                <a
                  href="https://www.sanity.io/docs/http-api/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={util.externalLink}
                >
                  Sanity API
                </a>
                . When new discoveries are added on the go, content is
                automatically{" "}
                <a
                  href="https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={util.externalLink}
                >
                  regenerated
                </a>{" "}
                server-side.{" "}
                <a
                  href="https://www.radix-ui.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={util.externalLink}
                >
                  Radix UI
                </a>{" "}
                is used for front-end components like modals and tooltips.{" "}
                <a
                  href="https://github.com/pacocoursey/next-themes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={util.externalLink}
                >
                  Next Themes
                </a>{" "}
                made light/dark-mode management easy.
              </p>

              <h2 style={{ margin: "4rem 0rem -0.5rem 0rem" }}>Contact 📬 📱</h2>
            </div>
            <div className={util.inset} style={{ marginBottom: "4rem" }}>
              <ContactContent />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const recentsList = await client.fetch(groq`
    *[_type == "recents" && display == true] | order(time desc) {
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

  const experienceList = await client.fetch(groq`
    *[_type == "experience" && display == true] | order(order asc) {
      _id,
      name,
      date,
      url,
      body
    }
  `)

  return {
    props: {
      list: recentsList,
      expList: experienceList
    },
    revalidate: 3600
  }
}