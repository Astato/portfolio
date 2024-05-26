import { Grid, Slider, Stack, Container, Button } from "@mui/material";
import { useEffect, useState, useRef, useContext, SetStateAction } from "react";
import React from "react";
import Framework7 from "framework7/lite-bundle";
import Framework7React, { f7 } from "framework7-react";
import { Page, Toolbar, Fab, FabButton, FabButtons } from "framework7-react";
import { Button as FButton } from "framework7-react";
import "framework7/css/bundle";
import {
  SignalWifi3BarTwoTone,
  BrightnessHigh,
  Battery90TwoTone,
  NetworkWifi3Bar,
  SignalWifiOff,
  Contrast,
  Settings,
  PowerSettingsNew,
  NightlightOutlined,
  Dock,
} from "@mui/icons-material";
import { DarkModeContext } from "./Wrapper";
import { format } from "date-fns";

Framework7.use(Framework7React);

interface NotificationBarProps {
  show: string;
  setShow: React.Dispatch<React.SetStateAction<string>>;
}

interface ClockProp {
  expandDate: string;
  Color: string;
  setShow: React.Dispatch<SetStateAction<string>>;
}

const Clock: React.FC<ClockProp> = ({ expandDate, Color, setShow }) => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const intervanl = setInterval(() => setDate(new Date()), 10000);
    return () => {
      clearInterval(intervanl);
    };
  }, []);
  const currentDate = date.toDateString();
  const formatDay = currentDate.split(" ");
  const day = formatDay[0];
  const dayNum = Math.round(Number(formatDay[2]));
  const month = formatDay[1];

  return (
    <div id="notification-bar-date" style={{ color: Color }}>
      <p style={{ marginRight: "10px" }}>
        {format(date, "HH") + ":" + format(date, "mm")}
      </p>
      {expandDate === "true" && (
        <Grid
          sx={{
            padding: "0 10px",
            ":hover": {
              cursor: "pointer",
              filter: "brightness(150%)",
              backgroundColor: "rgba(255,255,255,.1)",
              borderRadius: "20px",
            },
          }}
        >
          <p
            onClick={() => {
              f7.views.current.router.navigate("/calendar/");
              setShow("hide-bar");
            }}
          >
            {day}, {dayNum} {month}
          </p>
        </Grid>
      )}
    </div>
  );
};

interface ButtonsProps {
  active: boolean;
  text: string;
  icon: React.ReactNode;
  setShow?: React.Dispatch<SetStateAction<string>>;
}
const BarButton: React.FC<ButtonsProps> = ({ active, text, icon, setShow }) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const [IconMod, setIconMod] = useState<React.ReactNode | undefined>(
    undefined
  );
  const appContext = useContext(DarkModeContext);
  const setDarkMode = appContext?.setDarkMode;
  const screen = document.getElementById("screen");
  const wrapper = document.getElementById("wrapper");

  //// written for a improper rendering on Dark Theme Button on the notification bar, "active" state not updating properly
  useEffect(() => {
    if (text === "Dark Theme") {
      setIsActive(active);
    }
  }, [active]);
  const handleClick = () => {
    if (icon) {
      const IconModify = React.cloneElement(icon as React.ReactElement, {
        sx: { color: !isActive ? "black" : "" },
      });
      setIconMod(IconModify);
    }

    ///// needs cleaning /////////////////////// CLEAANING
    switch (text) {
      case "Night Light":
        if (isActive) {
          if (screen && wrapper) {
            screen.style.transition = "all 1s";
            wrapper.style.transition = "all 1s";
            screen.style.filter = "sepia(0%) brightness(100%)";
            wrapper.style.filter = "sepia(0) brightness(100%) ";
            sessionStorage.setItem("nightLight", "false");
          }
        }
        if (!isActive) {
          /// adds a little effect as it would be a night light
          if (screen && wrapper) {
            screen.style.transition = "all 1s";
            wrapper.style.transition = "all 1s";
            // screen.style.filter = "sepia(20%) brightness(90%) ";
            wrapper.style.filter = "sepia(25%) brightness(90%)";
            sessionStorage.setItem("nightLight", "true");
          }
        }
        break;
      case "Internet":
        isActive
          ? setIconMod(<SignalWifiOff sx={{ fontSize: 20 }} />)
          : setIconMod(icon);
        break;

      case "Dark Theme":
        !isActive
          ? /// fixed-bar is to style the navbar and leave it static, so when changing themes, i won't re render and trigger any
            /// undesired animations (it will close and open again when updating darkmode state )
            (sessionStorage.setItem("darkTheme", "true"),
            setShow && setShow("fixed-bar"),
            setDarkMode && setDarkMode(true))
          : (sessionStorage.setItem("darkTheme", "false"),
            setShow && setShow("fixed-bar"),
            setDarkMode && setDarkMode(false));
        break;

      default:
        return;
    }
    return;
  };

  return (
    <Button
      variant={isActive ? "contained" : "outlined"}
      onClick={() => {
        setIsActive(!isActive);
        handleClick();
      }}
    >
      <Container className="button-content-wrapper">
        {IconMod || icon}
        <Container className="button-legend">
          <p>{text}</p>
          <p>{isActive ? "on" : "off"}</p>
        </Container>
      </Container>
    </Button>
  );
};
const NotificationBar: React.FC<NotificationBarProps> = ({ show, setShow }) => {
  const [initialYPos, setInitialYPos] = useState<number>(0);
  const barRef = useRef<HTMLDivElement>(null);
  const appContext = useContext(DarkModeContext);
  const darkMode = appContext?.darkMode ?? false;
  const setHubModeActive = appContext?.setHubModeActive;
  const BrightnessLevel = appContext?.brightness;
  const setBrightnessLevel = appContext?.setBrightness;
  const openedApp = appContext?.openedApp;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [iconsColor, setIconsColor] = useState<string>("black");
  const containerRef = useRef<HTMLDivElement>(null);
  const pageContainerRef = useRef<{ el: HTMLElement | null }>({ el: null });

  const handleDragStart = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    if (target.id !== "notification-bar") {
      return;
    }
    const img = new Image();
    img.src = "";
    e.dataTransfer?.setData("text/plain", "This text will be transferred.");
    e.dataTransfer?.setDragImage(img, 10, 10);
    setInitialYPos(e.pageY);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;

    if (target.id !== "notification-bar") {
      return;
    }
    if (containerRef.current && pageContainerRef.current.el) {
      if (initialYPos + 200 > e.pageY) {
        setShow("false");
        pageContainerRef.current.el.style.height = "20px";
        containerRef.current.style.height = "20px";
        document.documentElement.style.setProperty(
          "--navbar-background-color",
          "transparent"
        );
      } else {
        setShow("fixed-bar");
        pageContainerRef.current.el.style.height = "100%";
        containerRef.current.style.height = "100%";
      }
    } else {
      return;
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.pageY > initialYPos) {
      if (containerRef.current && pageContainerRef.current.el) {
        pageContainerRef.current.el.style.height =
          30 + (e.pageY - initialYPos) + "px";
        containerRef.current.style.height = 30 + (e.pageY - initialYPos) + "px";
        document.documentElement.style.setProperty(
          "--navbar-background-color",
          "#121212"
        );
      }
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      if (document.getElementById("brightness-icon")) {
        const icon = document.getElementById("brightness-icon");
        const copy = icon?.cloneNode(true);
        if (icon && copy) {
          sliderRef.current.children[2].appendChild(copy);
        }
        icon?.remove();
      }
    }
  }, []);

  function handleBarIconsColor() {
    if (openedApp && show !== "show-bar" && !darkMode) {
      setIconsColor("black");
    } else {
      setIconsColor("white");
    }
  }

  useEffect(() => {
    handleBarIconsColor();
  }, [openedApp, darkMode]);

  return (
    <Page
      name="notification-bar"
      id="notification-bar"
      ref={pageContainerRef}
      className={
        show === "fixed-bar"
          ? "fixed-bar"
          : show === "true"
          ? "show-bar"
          : show === "false"
          ? "hide-bar"
          : ""
      }
    >
      <Grid
        item
        id="notification-bar"
        ref={containerRef}
        container
        className={
          show === "fixed-bar"
            ? "fixed-bar"
            : show === "true"
            ? "show-bar"
            : show === "false"
            ? "hide-bar"
            : ""
        }
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        draggable={"true"}
        xs={12}
        columnGap={1}
      >
        <Grid
          id="notification-bar-icons"
          ref={barRef}
          sx={{
            height: "20px",
            ":hover": {
              cursor: "grab",
              backgroundColor: "rgba(0,0,0,.3)",
            },
          }}
          item
          container
          xs={12}
        >
          <Grid
            item
            container
            xs={12}
            justifyContent={"space-between"}
            margin={"0 1rem 0 10px"}
          >
            <Clock expandDate={show} Color={iconsColor} setShow={setShow} />
            <div>
              <SignalWifi3BarTwoTone sx={{ fontSize: 20, color: iconsColor }} />
              <Battery90TwoTone sx={{ fontSize: 20, color: iconsColor }} />
            </div>
          </Grid>
        </Grid>
        <Grid xs={5.5} item margin={" 0 auto"}>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1 }}
            alignItems="center"
            style={{ marginTop: "2.5rem" }}
          >
            <BrightnessHigh
              id="brightness-icon"
              sx={{ fontSize: 20, color: "black", strokeWidth: "1px" }}
            />
            <Slider
              ref={sliderRef}
              value={BrightnessLevel}
              max={1}
              step={0.001}
              min={0.1}
              sx={{ paddingLeft: "1rem" }}
              onChange={(e: any) => {
                setBrightnessLevel && setBrightnessLevel(e.target.value);
                document.body.style.filter = `brightness(${BrightnessLevel})`;
              }}
            />
          </Stack>
          <Grid sx={{ marginTop: "1rem" }}>
            <BarButton
              text="Internet"
              active={true}
              icon={<NetworkWifi3Bar sx={{ fontSize: 20, color: "black" }} />}
            ></BarButton>
            <BarButton
              text="Night Light"
              active={
                sessionStorage.getItem("nightLight") === "true" ? true : false
              }
              icon={<NightlightOutlined sx={{ fontSize: 20, color: "" }} />}
            ></BarButton>
            <BarButton
              text="Dark Theme"
              active={darkMode}
              setShow={setShow}
              icon={<Contrast sx={{ fontSize: 20, color: "black" }} />}
            ></BarButton>
          </Grid>
        </Grid>
        <Grid
          item
          xs={5.68}
          id="notification-panel"
          style={{ display: "flex" }}
        >
          <p style={{ margin: "auto", color: "rgb(30,30,30)" }}>
            No notifications
          </p>
        </Grid>
      </Grid>
      {(show === "true" || show === "fixed-bar") && (
        <Toolbar
          bottom
          style={{
            width: "9rem",
            backgroundColor: "transparent",
            display: "flex",
            marginLeft: "35%",
            height: "11rem",
            bottom: "1rem",
          }}
        >
          <FButton
            fill
            onClick={() => {
              f7.views.current.router.navigate("/settings/"), setShow("false");
            }}
            roundMd
            style={{
              height: "40px",
              width: "40px",
              margin: "0 2rem",
              position: "relative",
              top: "30%",
            }}
          >
            <Settings />
          </FButton>
          <Fab id="fab-buttons-container" position="center-center">
            <PowerSettingsNew style={{ fill: "white" }} />

            <FabButtons position="top">
              <FabButton>
                <Dock
                  onClick={() => {
                    setHubModeActive && setHubModeActive(true);
                    setShow("hide-bar");
                  }}
                  style={{ fill: "white" }}
                ></Dock>{" "}
              </FabButton>
              {/* <FabButton>
                <Lock style={{ fill: "white" }}></Lock>
              </FabButton> */}
            </FabButtons>
          </Fab>
          {/* <FButton
            fill
            round
            style={{ height: "40px", width: "40px" }}
            onClick={() => setHubModeActive && setHubModeActive(true)}
          >
            <PowerSettingsNew />
          </FButton> */}
        </Toolbar>
      )}
    </Page>
  );
};

export default NotificationBar;
