import { Grid, useTheme } from "@mui/material";
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  SetStateAction,
  ReactNode,
  ReactElement,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax } from "swiper/modules";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import DragDropContainer from "./DragDropContainer";
import { DragLayer } from "./DragLayer";
import { Page, Button, f7 } from "framework7-react";
import { DarkModeContext } from "./Wrapper";
import photosIcon from "../assets/icons/Google_Photos_icon.svg";
import calculatorIcon from "../assets/icons/calc-icon.webp";
import copilotIcon from "../assets/icons/Microsoft_Copilot_Icon.svg.png";
import dynagraphIcon from "../assets/icons/icon-dynagraph-2.png";
import calendarIcon from "../assets/icons/Google_Calendar_icon.svg.png";
import { Settings } from "@mui/icons-material";
import weatherIcons from "../utils/weatherIcons";
// import * from "../assets/icons/weather/light"

export interface DraggableProps {
  name: string;
  top: number;
  left: number;
  style?: React.CSSProperties;
  id: string;
  onClick?: () => void;
  tooltip?: string;
  children?: ReactNode;
  key: string;
}

interface ContextMenuProps {
  position: number[];
}

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface SwiperWrapperProps {
  children: React.ReactNode;
  modules: SwiperModules;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<SetStateAction<number>>;
  setSwiperRef: React.Dispatch<SetStateAction<any>>;
}
type SwiperModules = (typeof Parallax)[];

const SwiperWrapper: React.FC<SwiperWrapperProps> = ({
  children,
  modules,
  currentSlide,
  setCurrentSlide,
  setSwiperRef,
}) => {
  //@ts-expect-error /// becuase of Swiper type, otherwise won't work
  const swiperRef = useRef<Swiper>(null);
  const AppContext = useContext(DarkModeContext);
  const mouseMoveY = AppContext?.openAppDrawer;
  const setMouseMoveY = AppContext?.setOpenAppDrawer;
  const openNotificationBar = AppContext?.openNotificationBar;
  const setOpenNotificationBar = AppContext?.setOpenNotificationBar;

  useEffect(() => {
    if (swiperRef) {
      setSwiperRef(swiperRef);
    }
  }, []);

  // useEffect(() => {}, [currentSlide]);

  let timeout: ReturnType<typeof setTimeout> | undefined;

  const handleMouseMove = (e: any) => {
    window.clearTimeout(timeout);
    const startY = e.touches.startY;
    const endY = e.touches.currentY;
    const startX = e.touches.startX;
    const endX = e.touches.currentX;
    const movementX =
      ///movement left or movement right,
      startX - endX < -50 ? (startX - endX) * -1 : startX - endX;
    /// startYY - 3 checks for double clicks the touchmove runs in short burst so
    // the margin between startY and endY is very small.
    ///this one checks movement bottom up or a slide up
    if (setOpenNotificationBar && setMouseMoveY) {
      if (startY - 3 > endY && movementX <= 50) {
        setOpenNotificationBar(""); /// prevent notificaiton bar of triggering  on state change
        setMouseMoveY("true");
        return;
      } else if (startY + 3 < endY && movementX <= 50) {
        setMouseMoveY(""); /// prevent setMouseY of triggering  on state change
        setOpenNotificationBar("true");
        return;
      } else {
        if (mouseMoveY === "" || openNotificationBar === "") {
          return;
        } else {
          setOpenNotificationBar("false");
          return setMouseMoveY("false");
        }
      }
    }
  };

  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      modules={modules}
      grabCursor={true}
      allowSlideNext={true}
      slidesPerView={1}
      slidesPerGroup={1}
      onSlideChangeTransitionEnd={(e) => {
        // sessionStorage.setItem("currentSlide", e.activeIndex.toString());
        setCurrentSlide(e.activeIndex);
      }}
      parallax={true}
      initialSlide={currentSlide}
      style={{
        width: "100%",
        height: "100%",
      }}
      noSwiping={true}
      onTouchEnd={handleMouseMove}
      onTouchMove={() => window.clearTimeout(timeout)}
      speed={500}
    >
      {children}
    </Swiper>
  );
};

const ContextMenu: React.FC<ContextMenuProps> = ({ position }) => {
  // const container = document.querySelector(`#${"screen"}`) as HTMLDivElement;
  const top = Math.floor(position[1]) + "px";
  const left = Math.floor(position[0]) + "px";
  // const rect = container.getBoundingClientRect();
  // if (rect) {
  //   top = Math.round(e.pageY - rect.top - 50);
  //   left = Math.round(e.pageX - rect.left - 50);
  // }

  return (
    <Page
      id="context-menu"
      style={{
        position: "absolute",
        left: left,
        top: top,
      }}
    >
      <Button href="/settings/">Change Background</Button>
    </Page>
  );
};

const ClockComponent: React.FC<DraggableProps> = () => {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date());
  useEffect(() => {
    const intervanl = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => {
      clearInterval(intervanl);
    };
  }, []);

  const now = new Date().toDateString().split(" ");
  const day = now[0];
  const dayNum = now[2];
  return (
    <div className="clock-container" style={{ position: "relative" }}>
      <p
        style={{
          position: "absolute",
          left: "32%",
          zIndex: "1",
          fontSize: "24px",
          fontWeight: "bolder",
          width: "90px",
          margin: "1rem 0",
          color: "graytext",
          transform: "translateZ(-100px)",
        }}
      >
        {day} {dayNum}
      </p>
      <Clock
        size={"250px"}
        locale="true"
        value={currentDate}
        renderMinuteMarks={false}
        renderHourMarks={false}
        hourHandLength={50}
        hourHandOppositeLength={10}
        hourHandWidth={30}
        minuteHandLength={65}
        minuteHandOppositeLength={10}
        minuteHandWidth={30}
        secondHandLength={85}
        secondHandWidth={25}
        secondHandOppositeLength={-65}
      />
    </div>
  );
};

const SearchComponent: React.FC<DraggableProps> = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div
      style={{
        display: "flex",
        background: "white",
        width: "300px",
        height: "3rem",
        borderRadius: "30px",
      }}
    >
      <input
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && search) {
            f7.views.current.router.navigate("/search/", {
              props: {
                searchTerm: search,
              },
            });
          }
        }}
        placeholder="Bing search"
        style={{
          borderRadius: "30px",
          fontSize: "18px",
          textIndent: "15px",
          outline: "none",
          width: "100%",
          border: "none",
        }}
      />
      <img
        onClick={() => {
          if (search) {
            f7.views.current.router.navigate("/search/", {
              props: {
                searchTerm: search,
              },
            });
          }
        }}
        src={copilotIcon}
        style={{ width: "30px", height: "30px", margin: "auto 10px auto auto" }}
      ></img>
    </div>
  );
};

interface ScreenProps {
  weatherData: WeatherData;
}

const WeatherComponent: React.FC<DraggableProps> = () => {
  const AppContext = useContext(DarkModeContext);
  const weatherData: WeatherData = AppContext?.weatherData;
  const theme = useTheme();
  const darkMode = AppContext?.darkMode;
  const mainColor = theme.palette.primary.main;
  const darkColor = theme.palette.primary.dark;
  let temperature = "";

  const icon = weatherData.dt && weatherData.weather[0].icon;
  if (weatherData.dt) {
    weatherData.sys.country === "US"
      ? (temperature = (
          ((weatherData.main.feels_like - 273.15) * 9) / 5 +
          32
        ).toFixed())
      : (temperature = (weatherData.main.feels_like - 273.15).toFixed());
  }
  return (
    <div
      style={{
        background: darkMode ? darkColor : mainColor,
        display: "flex",
        width: "150px",
        height: "200px",
        transform: "rotateZ(40deg)",
        borderRadius: "100px",
      }}
    >
      <div
        style={{
          transform: "rotateZ(-40deg)",
          borderRadius: "100px",
          margin: "auto",
        }}
      >
        {weatherData.dt && (
          <>
            <p
              style={{
                margin: 0,
                fontSize: "60px",
                position: "relative",
                left: "1.5rem",
                top: "1rem",
                color: darkMode ? mainColor : darkColor,
              }}
            >
              {temperature}°
            </p>
            <img
              style={{
                height: "80px",
                width: "80px",
                position: "relative",
                top: "-1rem",
                left: "-1rem",
              }}
              src={
                weatherData.wind.speed > 9
                  ? weatherIcons.dark.wind
                  : weatherIcons.dark[icon]
              }
            />
          </>
        )}
        {!weatherData.dt && <p style={{ color: mainColor }}>No data</p>}
      </div>
    </div>
  );
};

const IconComponent: React.FC<DraggableProps> = ({
  style,
  children,
  id,
  onClick,
}) => {
  return (
    <Button className="home-icons" style={style} id={id} onClick={onClick}>
      {children || null}
    </Button>
  );
};

export interface BoxesProps {
  [key: string]: ReactElement<DraggableProps>[];
}

const Screen: React.FC<ScreenProps> = () => {
  const screenRef = useRef<HTMLDivElement>(null);
  const [swiperRef, setSwiperRef] = useState("");
  const AppContext = useContext(DarkModeContext);
  const newItem = AppContext?.newItem;
  const setNewItem = AppContext?.setNewItem;
  const homeWallpaper = AppContext?.homeWallpaper;
  const setOpenedApp = AppContext?.setOpenedApp;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showContextMenu, setShowContextMenu] = useState<[number, number]>([
    0, 0,
  ]);

  const handleIconClick = (targetApp: string) => {
    f7.views.current.router.navigate(targetApp);
    setOpenedApp && setOpenedApp(true);
  };

  const Apps = [
    <ClockComponent
      top={20}
      left={75}
      name={"clock"}
      id="clock"
      key="clock-widget"
    />,
    <SearchComponent
      top={384}
      left={50}
      name={"search-bar"}
      id="search-bar"
      key="search-bar-widget"
    />,
    <WeatherComponent
      top={20}
      left={500}
      name={"weather"}
      id="weather"
      key="weather-widget"
    />,

    <IconComponent
      name={"Calendar"}
      id={"Calendar"}
      top={384}
      onClick={() => handleIconClick("/calendar/")}
      tooltip="Calendar"
      key="calendar-app"
      left={550}
      style={{
        backgroundImage: `url(${calendarIcon})`,
        backgroundSize: "68%",
      }}
    ></IconComponent>,
    <IconComponent
      onClick={() => handleIconClick("/photos/")}
      name={"photos"}
      id={"photos"}
      key="photos-app"
      top={384}
      left={475}
      style={{
        backgroundImage: `url(${photosIcon})`,
      }}
    ></IconComponent>,
    <IconComponent
      onClick={() => handleIconClick("/calculator/")}
      name={"calculator"}
      id={"calculator"}
      tooltip="Calculator"
      key="calculator-app"
      top={384}
      left={625}
      style={{
        backgroundImage: `url(${calculatorIcon})`,
        backgroundSize: "cover",
      }}
    ></IconComponent>,
    <IconComponent
      onClick={() => handleIconClick("/dynagraph/")}
      name={"dynagraph"}
      id={"dynagraph"}
      tooltip="Dynagraph"
      top={384}
      key="dyna-app"
      left={700}
      style={{
        backgroundImage: `url(${dynagraphIcon})`,
        backgroundSize: "cover",
      }}
    ></IconComponent>,

    <IconComponent
      onClick={() => handleIconClick("/settings/")}
      name={"settings-shortcut"}
      id="settings-shortcut"
      tooltip="Settings"
      top={384}
      key="sttings-app"
      left={400}
      style={{ background: "#4289f7" }}
    >
      <Settings style={{ fill: "white", fontSize: 35 }} />
    </IconComponent>,
  ];

  const [boxes, setBoxes] = useState<BoxesProps>({
    "sub-screen-1": Apps,
    "sub-screen-2": [],
  });

  const modules: SwiperModules = [Parallax];

  let top: number;
  let left: number;

  const handleDropIconFromDrawer = (
    e: React.DragEvent,
    container: keyof typeof boxes
  ) => {
    e.preventDefault();
    if (newItem) {
      const addTopLeftProps = React.cloneElement(newItem, {
        top: top,
        left: left,
        className: "home-icons button",
        name: newItem.props.id + "-" + container,
        id: newItem.props.id + "-" + container,
      });

      const itemAlreadyAdded = boxes[container].findIndex((component) => {
        return component.props.name === newItem.props.name + "-" + container;
      });
      if (itemAlreadyAdded < 0) {
        setBoxes((prev) => ({
          ...prev,
          [container]: [...prev[container], addTopLeftProps],
        }));
      }
      setNewItem && setNewItem(null); // once the item is dropped, remove it from newItem state
      const wrapper = document.querySelector(
        ".swiper-wrapper"
      ) as HTMLDivElement;
      if (currentSlide === 0) {
        wrapper.style.transform = "translateX(0)";
      }
      const slides = document.querySelectorAll<HTMLDivElement>(".swiper-slide");
      slides.forEach((slide) => {
        slide.style.border = "none";
        slide.style.borderRadius = "0";
        slide.style.backgroundColor = "transparent";
      });
    } else return;
  };

  const onDragOver = (e: any, container: string) => {
    e.preventDefault();
    if (newItem) {
      const wrapper = document.querySelector(
        ".swiper-wrapper"
      ) as HTMLDivElement;
      const slides = document.querySelectorAll<HTMLDivElement>(".swiper-slide");
      wrapper.id = "scale-down"; /// for the first scale, aftewards the trasnform gets overriden by a translate caused by the sliding,
      /// so the code below manages it
      if (!wrapper.style.transform.match("scale")) {
        const regex = /[-]?[0-9]+/g;
        const values = wrapper.style.transform.match(regex);
        const x = values ? +values[1] : 0;
        const y = values ? +values[2] : 0;
        const z = values ? +values[3] : 0;
        if (currentSlide !== 0) {
          wrapper.style.transform = `translate3d(${
            x + 50
          }px,${y}px, ${z}px) scale(.95)`;
        } else {
          wrapper.style.transform += `translate3d(${
            0 - 1
          }px,${0}px, ${0}px)  scale(.95)`;
        }
      }
      ///slide blue-ish styling
      slides.forEach((slide) => {
        slide.style.border = "solid 3px rgba(50,50,150, .6)";
        slide.style.borderRadius = "24px";
        slide.style.backgroundColor = "rgba(50,50,150, .6)";
      });
      //// drope item position
      const getContainer = document.querySelector(
        `#${container}`
      ) as HTMLDivElement;
      const rect = getContainer.getBoundingClientRect();
      if (rect) {
        top = Math.round(e.pageY - rect.top - 50);
        left = Math.round(e.pageX - rect.left - 50);
      }
    } else {
      return;
    }
  };

  return (
    <Page
      name="screen"
      id="screen"
      style={{ border: "none", userSelect: "none" }}
    >
      {(showContextMenu[0] || showContextMenu[1]) && (
        <ContextMenu position={showContextMenu}></ContextMenu>
      )}
      <Grid item xs={12} id="screen" style={{ border: "none" }} ref={screenRef}>
        <SwiperWrapper
          modules={modules}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          setSwiperRef={setSwiperRef}
        >
          <div
            slot="container-start"
            className="parallax-bg"
            style={{
              backgroundImage: `url(${homeWallpaper})`,
              height: "100%",
              position: "absolute",
              width: "130%",
              left: "-10%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            data-swiper-parallax="-10%"
          ></div>
          <Grid
            item
            container
            id="sub-screens-container"
            columns={12}
            margin={"0 -3px"}
          >
            <SwiperSlide
              id="sub-screen-1-container"
              onDragOver={(e) => {
                /* @ts-ignore */
                if (swiperRef.current.activeIndex !== 0) {
                  /* @ts-ignore */
                  swiperRef.current.slideTo(0);
                  /* @ts-ignore */
                  if (swiperRef.current.activeIndex === 0) {
                    /* @ts-ignore */
                    swiperRef.current.wrapperEl.style.transform =
                      "translateX(calc(0% )";
                  }
                } else {
                  onDragOver(e, "sub-screen-1");
                }
              }}
              onDrop={(e) => handleDropIconFromDrawer(e, "sub-screen-1")}
            >
              <DragDropContainer
                children={boxes["sub-screen-1"]}
                currentContainer={"sub-screen1"}
                isSnapToGrid={true}
                id="sub-screen-1"
                setChildren={setBoxes}
                newItemDrag={newItem ? newItem.props.id : ""} /// testing if i can push when draggin item from app dreawere
              ></DragDropContainer>
              <DragLayer
                children={boxes["sub-screen-1"]}
                id="layer1"
                snapToGrid={false}
              />
            </SwiperSlide>
            <SwiperSlide
              id="sub-screen-2-container"
              onDragOver={(e) => {
                /* @ts-ignore */
                if (swiperRef.current.activeIndex !== 1) {
                  /* @ts-ignore */
                  swiperRef.current.slideTo(1);
                  /* @ts-ignore */
                  if (swiperRef.current.activeIndex === 1) {
                    /* @ts-ignore */
                    swiperRef.current.wrapperEl.style.transform =
                      "translateX(calc(-100% + 30px)";
                  }
                } else {
                  onDragOver(e, "sub-screen-2");
                }
              }}
              onDrop={(e) => {
                handleDropIconFromDrawer(e, "sub-screen-2");
              }}
            >
              <DragDropContainer
                children={boxes["sub-screen-2"]}
                isSnapToGrid={true}
                currentContainer={"sub-screen2"}
                id="sub-screen-2"
                newItemDrag={newItem ? newItem.props.id : ""}
                setChildren={setBoxes}
              ></DragDropContainer>
              <DragLayer
                children={boxes["sub-screen-2"]}
                id="layer2"
                snapToGrid={false}
              />
            </SwiperSlide>
          </Grid>
        </SwiperWrapper>
      </Grid>
    </Page>
  );
};

export default Screen;
