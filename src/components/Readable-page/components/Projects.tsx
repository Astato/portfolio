import JsIcon from "../images/logos/javascript-icon.png";
import ReactIcon from "../images/logos/react-icon.svg";
import TsIcon from "../images/logos/typescript-icon.png";
import NodeIcon from "../images/logos/nodeJs-icon.png";
import CssIcon from "../images/logos/css-icon.svg";
import Sassicon from "../images/logos/sass-icon.png";
import SocketIcon from "../images/logos/Socket.io-icon.svg";
import HtmlIcon from "../images/logos/html-icon.png";
import MongoIcon from "../images/logos/mongo-icon.svg";
import MuiIcon from "../images/logos/MUI-icon.png";
import F7Icon from "../images/logos/F7-icon.svg";
import GoogleIcon from "../images/logos/google-icon.png";

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  CardActions,
  Typography,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCreative } from "swiper/modules";
import ArrowIcon from "../images/south_west_FILL0_wght700_GRAD200_opsz20.svg?react";
import ProjectsAnimation from "../images/PROJECTS-anim.svg?react";
import ProjectsAnimationSpanish from "../images/PROJECTS-anim-spanish.svg?react";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import { swiperImages } from "../utils/imagesImport";

import "swiper/css";
import React, { useEffect, useState, useContext } from "react";
import { languageContext } from "../ReadableApp";

interface CardProps {
  title: string;
  summary: string;
  tech: string[];
  imageKey: string;
}

const CardComponent: React.FC<CardProps> = ({
  title,
  summary,
  tech,
  imageKey,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    if (title !== "API HUB") setExpanded(!expanded);
  };
  interface ExpandMoreProps {
    expanded: boolean;
  }

  const handleEscapePress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      return setExpanded(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (expanded) {
      window.addEventListener("keydown", handleEscapePress);

      return () => {
        window.removeEventListener("keydown", handleEscapePress);
      };
    }
  }, [expanded]);

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expanded, ...other } = props;
    return <ArrowIcon {...other} />;
  })(({ theme, expanded }) => ({
    transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  return (
    <Grid item className="card" borderRadius={"25px"} marginTop={0}>
      <Card
        id={expanded ? "expanded-card" : ""}
        sx={{
          maxWidth: 500,
          height: "fit-content",
          backgroundColor: "#bbbbbb",
          borderRadius: "21px",
        }}
        elevation={24}
      >
        <Swiper
          effect={"creative"}
          grabCursor={true}
          allowTouchMove
          loop
          style={{
            width: "100%",
            position: "relative",
            background: "transparent",
            userSelect: "none",
          }}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["100%", 0, 0],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          pagination={true}
          modules={[EffectCreative, Pagination]}
          className="mySwiper"
        >
          {swiperImages &&
            swiperImages[imageKey].map((img: string, index) => {
              return (
                <SwiperSlide style={{ height: "100%", width: "100%" }}>
                  <div
                    className="swiper-images"
                    style={{
                      display: "grid",
                      backgroundImage: `url(${img})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                    // style={{ width: "100%", overflow: "hidden" }}
                    // src={img}
                  ></div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <CardHeader
          subheader={
            <div className="card-icons">
              {tech.map((img, index) => {
                const match = img.match(/logos\/(.*?)-icon/);
                let tooltip = "";
                if (match && match[1]) {
                  tooltip = match[1];
                }
                return (
                  <Tooltip
                    title={
                      tooltip[0].toLocaleUpperCase() + tooltip.substring(1)
                    }
                  >
                    <CardMedia
                      sx={{ hover: { cursor: "grab" } }}
                      key={index}
                      component="img"
                      image={img}
                      style={{
                        padding: img.match("react") ? "" : "",
                      }}
                    />
                  </Tooltip>
                );
              })}
            </div>
          }
          title={title}
          titleTypographyProps={{ fontWeight: "bolder", textAlign: "center" }}
        />
        <CardContent sx={{ minHeight: "fit-content" }}>
          <Typography variant="body2" fontSize={"18px"}>
            {!expanded && title !== "API HUB"
              ? summary.slice(0, 100) + "..."
              : summary}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ display: title === "API HUB" ? "none" : "flex" }}
        >
          <ExpandMore
            expanded={expanded}
            //@ts-ignore
            onClick={handleExpandClick}
            aria-label="show more"
            className="expand-icon"
          ></ExpandMore>
        </CardActions>
      </Card>
    </Grid>
  );
};

function Projects() {
  const LanguageContext = useContext(languageContext);
  const selectedLanguage = LanguageContext.language;
  const projectsText: { title: string; description: string }[] | null =
    LanguageContext && LanguageContext.text
      ? LanguageContext.text.projects
      : null;

  useEffect(() => {}, [selectedLanguage]);

  return (
    <Grid container item sm={12} md={12} lg={12} xl={9} id="projects">
      {selectedLanguage === "EN" ? (
        <ProjectsAnimation className="about-animation" style={{ zIndex: 0 }} />
      ) : (
        <ProjectsAnimationSpanish
          className="about-animation"
          style={{ zIndex: 0 }}
        />
      )}
      <Grid
        container
        item
        id="projects-container"
        minWidth={"100%"}
        columnGap={6}
        rowGap={6}
        style={{
          overflow: "auto",
        }}
      >
        <CardComponent
          title={(projectsText && projectsText[0].title) || "Socially"}
          summary={
            (projectsText && projectsText[0].description) ||
            `A Social Media X-like appication created with React, Express, Sass and Socket.io.
            Among it's functionality these include: Notifications and Post alerts, Client-side Caching, 
            Media file Upload through Google Drive API, Google Login, Password recovery through recovery Code verification and expiricy,
            Trending hashtags based on popularity changes, Hashtag and user search and filter on custom created textarea, Infinte scroll and lazyloading, creedentials and information changes,   
            Profile setup, Messages, Hashtags and Mentions, among other functionallity `
          }
          tech={[
            JsIcon,
            ReactIcon,
            SocketIcon,
            Sassicon,
            GoogleIcon,
            MongoIcon,
          ]}
          imageKey="socially"
        ></CardComponent>
        <CardComponent
          title={(projectsText && projectsText[1].title) || "API HUB"}
          summary={
            (projectsText && projectsText[1].description) ||
            `A Restful API built with Express, that serves multiple applications.
          Among the functionallity these cover, authentication, Socket.io connection, Google Cloud media storage and authentication, sanitization, emailing and Database connection.   
          The technologies used include, JTW, PassportJS, Socket.io, Google Cloud Service, MongoDB, Mongoose, NodeMailer, ExpressJS and Socket.io`
          }
          tech={[JsIcon, NodeIcon, SocketIcon, MongoIcon, GoogleIcon]}
          imageKey="hub"
        ></CardComponent>
        <CardComponent
          title={
            (projectsText && projectsText[2].title) || "Interactrve Portfolio"
          }
          summary={
            (projectsText && projectsText[2].description) ||
            "A Client-side rendered web application, build for desktop browsers that resembles Android tablets UX/UI. Some of the functionallity include, dynamic wallpaper, customizable weather,dark mode, navigation bar, draggable icons, apps drawer with droppable icons, customization, dock-mode, android-like applications (calculator, photos and schedule), integration and connectionwith my other web applications, brightness and night light. Some of the technologies used include: Framework7, MUI, TypeScript, React, ReactDnD, SwiperJS and SASS"
          }
          tech={[TsIcon, Sassicon, ReactIcon, MuiIcon, F7Icon]}
          imageKey="portfolio"
        ></CardComponent>
        <CardComponent
          title={(projectsText && projectsText[3].title) || "Dynagraph"}
          summary={
            (projectsText && projectsText[3].description) ||
            "A application built-in the interactive porfolio.It's a budget and sales data input and visualization application.Some of it's functionallity include: Data filtering, data search, table and graphic views such as line, area, bar or piechart. For budget contains an advanced and simple data comparison filters, dynamically validated by input data, these include from month to month, year to year or up to 5 validated dates ranges. For sales, the application allows user to filter and visualize most sales by periods, age-grouṕ, gender, categories, etc."
          }
          tech={[TsIcon, MuiIcon, ReactIcon]}
          imageKey="dyna"
        ></CardComponent>
        <CardComponent
          title={(projectsText && projectsText[4].title) || "Chat"}
          summary={
            (projectsText && projectsText[4].description) ||
            `A Server-side rendered (SSR) live Chat application, built using Express, Socket.io, CSS, PUG and HTML.
            Among it's functionality these include:Caching, Private Chats , tGlobal chat, Online / Offline indicator, notifications, Friends, Password recovery and customization`
          }
          tech={[JsIcon, CssIcon, HtmlIcon, NodeIcon, SocketIcon]}
          imageKey="chat"
        ></CardComponent>
        <CardComponent
          title={(projectsText && projectsText[5].title) || "DISC"}
          summary={
            (projectsText && projectsText[5].description) ||
            `"A Client-side rendered content creation web application, built using JS, CSS and React.
            Among it's functionality these include: profile and profile edition, content edition, media upload, content deletion, filtering, similar content sugestion, comments and profile customization`
          }
          tech={[JsIcon, ReactIcon, CssIcon, MongoIcon]}
          imageKey="disc"
        ></CardComponent>
        <CardComponent
          title={(projectsText && projectsText[6].title) || "Store"}
          summary={
            (projectsText && projectsText[6].description) ||
            `A simplified Store web application.
            Among it's functionality these include: product and price filtering, shopping cart, responsive design, product page and a custom built carrousel`
          }
          tech={[JsIcon, ReactIcon, CssIcon]}
          imageKey="store"
        ></CardComponent>
        <CardComponent
          title={(projectsText && projectsText[7].title) || "Weather app"}
          summary={
            (projectsText && projectsText[7].description) ||
            `A CSR Web application built javascript, React and CSS. 
          Among it's functionality these include: Location search, dynamic background, responsive design, extended forecast and unit selection`
          }
          tech={[JsIcon, ReactIcon, CssIcon]}
          imageKey="weather"
        ></CardComponent>
        <CardComponent
          title={(projectsText && projectsText[8].title) || "And more..."}
          summary={
            (projectsText && projectsText[8].description) ||
            `An assorment of other web applications. From a photo-tagging application, IMdb home page mockup, todo-list webapp, resume creator, Apple calculator, pomodoro clock, html-markup to a tic-tae-toe  `
          }
          tech={[JsIcon, ReactIcon, CssIcon, HtmlIcon]}
          imageKey="others"
        ></CardComponent>
      </Grid>
    </Grid>
  );
}

export default Projects;
// liked #625A34
/// lked rgba(129,83,58,.17)
// liked 3 #2B2522
// les liked #8C7234
// les less liked #2F2F4D

///pinkish liked #AB5B57
/// green liked #57807D

///purple #2F2F4D
/// purpole 2 #343462
/// purple lighter #34348C
///pinkish liked #AB5B57
/// green liked #57807D
/// blue #34628C
