// @ts-nocheck
import { Grid } from "@mui/material";
import { useRef, useEffect, useContext } from "react";
import AboutAnimation from "../images/fixed-animation.svg?react";
import AboutAnimationSpanish from "../images/quien-soy-anim.svg?react";
import executeAnimation from "../utils/aboutAnimationScript";
import executeSpanisHAnimation from "../utils/AboutAnimationSpanish";
import { languageContext } from "../ReadableApp";
import languageData from "../language.json";
function About() {
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const LanguageContext = useContext(languageContext);
  const selectedLanguage = LanguageContext.language;
  const ref = useRef<HTMLDivElement>(null);

  const handleAnimationEnd = (): void => {
    if (titleContainerRef.current) {
      const letters = titleContainerRef.current
        .children as HTMLCollectionOf<HTMLElement>;
      titleContainerRef.current.style.position = "relative";
      titleContainerRef.current.style.height = "100%";
      titleContainerRef.current.style.width = "fit-content";
      titleContainerRef.current.style.margin = "auto";
      titleContainerRef.current.style.flexDirection = "column";

      Array.from(letters).forEach((child) => {
        child.classList.remove("animation-start");
        child.classList.add("animation-end");
        child.style.setProperty("--x", "auto");
        child.style.setProperty("--y", "-10px");
        if (child.textContent === " M") {
          child.style.setProperty("--y", "100px");
        }
      });
      // writing-mode: vertical-rl;
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = languageData[selectedLanguage]["about"];
    }
  }, [selectedLanguage]);

  return (
    <Grid
      container
      item
      container
      item
      sm={12}
      md={12}
      lg={10}
      xl={9}
      id="about"
    >
      {/* <<h1>About Me</h1>> */}
      {selectedLanguage === "EN" ? (
        <AboutAnimation className="about-animation" />
      ) : (
        <AboutAnimationSpanish className="about-animation"></AboutAnimationSpanish>
      )}
      <div ref={ref}></div>
      {/* // <p ref={ref}>
        //   i’m a self-taught web developer from Argentina, passionate about
        //   creating innovative and original web apps. My journey into web
        //   development started in 2022, fueled by free online resources.
        //   <br />
        //   As I mastered HTML, CSS, and JavaScript, I discovered different
        //   platforms, which helped me dive deeper into non-relational databases,
        //   React, Express, and Webpack.
        //   <br />
        //   <br />
        //   Since then, I’ve completed over 20 projects, each one challenging me
        //   to learn new technologies suche as TypeScript and expand my knowledge.
        //   Although I haven’t yet worked professionally in the field, I’m excited
        //   to bring my skills to meaningful projects and make a real impact.
        // </p> */}
      {/* <p>
        I'm a self-taught web developer from Argentina with a passion for
        creating innovative digital solutions. <br />
        My journey began in 2022 when I delved into the world of web development
        using free online resources like FreeCodeCamp.
        <br />
        <br />
        As I honed my skills in HTML, CSS, and JavaScript, I found myself drawn
        to platforms like The Odin Project, where I further expanded my
        knowledge in areas such as non-relational databases, React, and Webpack.
        <br />
        <br />
        Over time, I've completed over 25 projects, each one pushing the
        boundaries of my knowledge and exploring new technologies. While I
        haven't yet ventured into the professional realm, I'm eager to apply my
        skills and contribute to meaningful projects.
      </p> */}
    </Grid>
  );
}

export default About;
