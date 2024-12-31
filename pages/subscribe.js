import util from "../styles/util.module.css";
import SubstackSubscribe from "../components/substackSubscribe";
import SEO from '../components/SEO/index.js';

export default function Subscribe() {
  const description = "Join me on this journey of exploration through tech, design, and beyond.";

  return (
    <>
      <SEO 
        title="Join My Newsletter"
        description={description}
        type="website"
      />

      <main className={util.page}>
        <div className={util.pageColumn}>

        <h1 className={util.header}>Let's Connect! 🚀</h1>
            <div className={util.read}>
            <p>
                {"Hey There! Thanks for wanting to stay in touch. I write about my coding adventures, tech insights, and those random 3 AM thoughts that won't let me sleep. If you're into tech, business, or just like diving deep into how things work - you'll feel right at home here."}
            </p>
            <p>
                {"No boring newsletters, no spam - just real talk about software engineering, career stuff, and whatever cool things I'm geeking out about lately. Let's make this fun! 🎯"}
            </p>
            </div>
            <SubstackSubscribe variant="fullPage" />
        </div>
      </main>
    </>
  );
}
