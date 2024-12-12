import { useState, useRef, useEffect, useContext } from "react";
import {
  createTheme,
  ThemeProvider,
  ButtonBase,
  Select,
  MenuItem,
} from "@mui/material";
import Arrow from "../../Readable-page//images/south_west_FILL0_wght700_GRAD200_opsz20.svg?react";
import executeAboutAnimation from "../utils/aboutAnimationScript";
import executeProjectsAnimation from "../utils/projectsAniamtionsScript";
import executeProjectsAnimationSpanish from "../utils/projectsAnimationSpanish";
import executeAboutAnimationSpanish from "../utils/aboutAnimationSpanish";
import { languageContext } from "../ReadableApp.js";
const theme = createTheme({
  palette: {
    primary: {
      main: "#bbbbbb",
    },
    secondary: {
      main: "#0d0d0e",
    },
  },
  components: {
    MuiPaper: {
      ///styles language picker Select component
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          color: "#bbbbbb",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        text: {
          fontFamily: "Do Hyeon, sans-serif",
        },
      },
    },
  },
});

interface NavbarProps {
  isSmallScreen: boolean;
  messageInProgress: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  isSmallScreen,
  messageInProgress,
}) => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const navbarItemsRef = useRef<HTMLDivElement>(null);
  const homeButtonRef = useRef<HTMLDivElement>(null);
  const contactButtonRef = useRef<HTMLDivElement>(null);
  const projectsButtonRef = useRef<HTMLDivElement>(null);
  const aboutButtonRef = useRef<HTMLDivElement>(null);
  const LanguageContext = useContext(languageContext);
  const setLanguage = LanguageContext.setLanguage;
  const selectedLanguage = LanguageContext.language;
  const navbarText: string[] | null =
    LanguageContext && LanguageContext.text
      ? LanguageContext.text.navbar
      : null;
  const [toPagination, setToPagination] = useState<string>("navbar-initial");
  const [currentInView, setCurrentInView] = useState<string>("home");

  const handleScroll = (e: WheelEvent) => {
    const delta = e.deltaY;
    const views = ["home", "about", "projects", "contact"];
    const current = views.indexOf(currentInView);
    const index = delta > 0 ? 1 : -1;
    const goTo =
      current === 3 && delta > 0
        ? views[current]
        : current === 0 && delta < 0
        ? views[current]
        : views[current + index];

    if (currentInView === "projects") {
      const projectsContainer = document.getElementById("projects-container");
      if (projectsContainer) {
        const scrollHeight = projectsContainer.scrollHeight;
        const scrollPosition = projectsContainer.scrollTop;
        if (delta < 0 && scrollPosition > 0) {
          return;
        } else if (
          delta > 0 &&
          scrollPosition < scrollHeight - projectsContainer.clientHeight
        ) {
          return;
        }
      }
    }

    if (delta < 0 && goTo === "home") {
      document.body.scrollTop = 0;
      return;
    } else if (delta > 0 && currentInView === "contact") {
      document.body.scrollTop = 9999999999;
      return;
    } else if (currentInView === "about" && goTo === "home") {
      document.body.scrollTop = 0;
    } else {
      if (delta > 0 && toPagination !== "pagination" && goTo === "about") {
        // setToPagination("pagination");
      }
      return document.getElementById(goTo)?.scrollIntoView();
    }
  };

  const handleScrollAnimationTransition = () => {
    const body = document.body;
    const tabs = document.getElementById("page-select-tabs");
    if (navbarItemsRef.current && navbarRef.current) {
      if (body.scrollTop > 200) {
        setToPagination("pagination");
      } else if (body.scrollTop === 0) {
        if (tabs) {
          tabs.style.transform = "translateY(0)";
          tabs.style.transition = "transform 1s";
        }
      } else if (body.scrollTop === 1) {
        if (tabs) {
          tabs.style.transform = "translateY(-10rem)";
          tabs.style.transition = "transform 1.5s";
        }
      } else if (toPagination === "pagination" && body.scrollTop < 150) {
        setToPagination("navbar-btn");
      }
    }
  };

  useEffect(() => {
    const body = document.body;

    if (!isSmallScreen && !messageInProgress) {
      ///handles scroll section jumping
      body.addEventListener("wheel", handleScroll);
      ///handles navbar transition
      body.addEventListener("scroll", handleScrollAnimationTransition);
    }
    if (isSmallScreen || messageInProgress) {
      setToPagination("navbar-items");
      body.removeEventListener("wheel", handleScroll);
      body.removeEventListener("scroll", handleScrollAnimationTransition);
    }
    return () => {
      body.removeEventListener("wheel", handleScroll);
      body.removeEventListener("scroll", handleScrollAnimationTransition);
    };
  }, [isSmallScreen, currentInView, messageInProgress]);

  useEffect(() => {
    let currentButton: React.RefObject<HTMLDivElement>;
    const home = document.getElementById("home");
    const about = document.getElementById("about");
    const projects = document.getElementById("projects");
    const contact = document.getElementById("contact");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentButton =
              entry.target.id === "home"
                ? homeButtonRef
                : entry.target.id === "about"
                ? aboutButtonRef
                : entry.target.id === "projects"
                ? projectsButtonRef
                : contactButtonRef;
            setCurrentInView(entry.target.id);
            if (entry.target.id === "about" && !isSmallScreen) {
              if (selectedLanguage === "EN") {
                executeAboutAnimation();
              } else {
                executeAboutAnimationSpanish();
              }
            }

            if (entry.target.id === "projects" && !isSmallScreen) {
              if (selectedLanguage === "EN") {
                executeProjectsAnimation();
              } else {
                executeProjectsAnimationSpanish();
              }
              const projectContainer =
                document.getElementById("projects-container");
              if (projectContainer) {
                projectContainer.style.height = "99%";
                projectContainer.style.transition = "height .6s 2s";
              }
            }

            if (currentButton && currentButton.current) {
              if (toPagination === "pagination") {
                currentButton.current.style.opacity = "1";
                currentButton.current.children[0].setAttribute(
                  "class",
                  "show-arrow"
                );
              } else {
                // currentButton.current.style.opacity = ".6";
                // currentButton.current.children[0].setAttribute(
                //   "class",
                //   "hide-arrow"
                // );
                if (toPagination !== "pagination") {
                  currentButton.current.style.opacity = "1";
                }
              }
            }
          } else {
            const resetButton = (
              button: React.RefObject<HTMLElement>
            ): void => {
              if (button === currentButton && toPagination === "pagination") {
                // currentButton matches currentInView, i.e: if about section is in view and
                // the navbar is set to pagination, prevent button reseting (hiding arrow)
                // if in home section (scrolling to top), we need to reset the arrows hence the "pagination" check
                return;
              }
              if (button.current) {
                if (button.current.id !== "pagination") {
                  button.current.style.opacity = "1";
                } else {
                  button.current.style.opacity = ".6";
                }
                button.current.children[0].setAttribute("class", "hide-arrow");
              }
            };
            resetButton(homeButtonRef);
            resetButton(aboutButtonRef);
            resetButton(contactButtonRef);
            resetButton(projectsButtonRef);
          }
        });
      },
      { threshold: [0.5], root: null, rootMargin: "300px" }
    );

    if (home && about && projects && contact) {
      observer.observe(home);
      observer.observe(about);
      observer.observe(projects);
      observer.observe(contact);
    }
    return () => {
      if (home && about && projects && contact) {
        observer.unobserve(home);
        observer.unobserve(about);
        observer.unobserve(contact);
        observer.unobserve(projects);
      }
    };
  }, [toPagination, currentInView]);

  return (
    <nav id="navbar" ref={navbarRef}>
      <ThemeProvider theme={theme}>
        <div
          id="nav-items-container"
          ref={navbarItemsRef}
          style={{
            justifyContent:
              toPagination !== "pagination" ? "flex-end" : "center",
          }}
        >
          <ButtonBase
            style={{
              color:
                currentInView === "contact" && !isSmallScreen
                  ? "#0d0d0e"
                  : "#bbbbbb",
            }}
            component="div"
            // "pagination id is being set to all buttons, this is to override the Mui classes by specificity,
            // otherwise they interfere in the animations and styling"
            id={toPagination}
            ref={homeButtonRef}
            className="btn"
            onClick={(): void => {
              document.body.scrollTo({ top: 0 });
            }}
          >
            {(navbarText && navbarText[0]) || "Home"}
            <Arrow className="hide-arrow" />
          </ButtonBase>

          <ButtonBase
            component="div"
            style={{
              color:
                currentInView === "contact" && !isSmallScreen
                  ? "#0d0d0e"
                  : "#bbbbbb",
            }}
            ref={aboutButtonRef}
            className="btn"
            id={toPagination}
            onClick={() => {
              window.location.href = "#about";
            }}
          >
            {(navbarText && navbarText[1]) || "About"}

            <Arrow className="hide-arrow" />
          </ButtonBase>
          <ButtonBase
            style={{
              color:
                currentInView === "contact" && !isSmallScreen
                  ? "#0d0d0e"
                  : "#bbbbbb",
            }}
            component="div"
            className="btn"
            ref={projectsButtonRef}
            id={toPagination}
            onClick={() => (window.location.href = "#projects")}
          >
            {(navbarText && navbarText[2]) || "Projects"}
            <Arrow className="hide-arrow" />
          </ButtonBase>
          <ButtonBase
            style={{
              color:
                currentInView === "contact" && !isSmallScreen
                  ? "#0d0d0e"
                  : "#bbbbbb",
            }}
            component="div"
            id={toPagination}
            ref={contactButtonRef}
            className="btn"
            onClick={() => document.body.scrollTo({ top: 999999999 })}
          >
            {(navbarText && navbarText[3]) || "Contact"}
            <Arrow
              className="hide-arrow"
              style={{
                filter: "invert(0)",
                fill: theme.palette.secondary.main,
              }}
            />
          </ButtonBase>

          <div
            style={{
              height: "100%",
              marginLeft: toPagination === "pagination" ? "100vw" : "0",
            }}
          >
            <Select
              value={selectedLanguage}
              label={selectedLanguage}
              style={{
                color: "#bbbbbb",
              }}
            >
              <MenuItem
                sx={{ backgroundColor: "transparent" }}
                value={"EN"}
                onClick={() => setLanguage("EN")}
              >
                EN
              </MenuItem>
              <MenuItem
                sx={{ backgroundColor: "transparent" }}
                value={"ES"}
                onClick={() => setLanguage("ES")}
              >
                ES
              </MenuItem>
            </Select>
          </div>
        </div>
      </ThemeProvider>
    </nav>
  );
};
export default Navbar;
