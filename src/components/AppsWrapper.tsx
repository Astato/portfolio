import { useTheme } from "@mui/material";
import { Page, Popup, View, f7 } from "framework7-react";
import { useContext, useEffect, useState } from "react";
import Calculator from "./CustomApps/CalculatorApp";
import { DarkModeContext } from "./Wrapper";
import PhotosApp from "./CustomApps/PhotosApp";
import CalendarApp from "./CustomApps/CalendarApp";
import DynaGraph from "./CustomApps/DynaGraph";
import { Close } from "@mui/icons-material";

interface Props {
  calculator: boolean;
  copilot: boolean;
  photos: boolean;
  calendar: boolean;
  search: boolean;
  searchTerm: string;
  dynagraph: boolean;
  store: boolean;
  blog: boolean;
  weatherapp: boolean;
  socially: boolean;
  messages: boolean;
}

const iframeStyle: React.CSSProperties = {
  marginTop: "-2px",
  marginLeft: "-2px",
  userSelect: "none",
  width: "100%",
  height: "100%",
};

const AppsWrapper: React.FC<Props> = ({
  calculator,
  copilot,
  photos,
  calendar,
  search,
  searchTerm,
  dynagraph,
  store,
  blog,
  weatherapp,
  socially,
  messages,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const mode = theme.palette.mode;
  const appContext = useContext(DarkModeContext);
  const setOpenedApp = appContext?.setOpenedApp;
  const backgroundColor = theme.palette.background.default;
  const mainColor = theme.palette.primary.main;
  const setWeatherData = appContext?.setWeatherData;
  const setTempUnit = appContext?.setTempUnit;
  const [buttonClass, setButtonClass] = useState<string>("show");

  const savedLatitude = sessionStorage.getItem("latitude");
  const savedLongitude = sessionStorage.getItem("longitude");

  useEffect(() => {
    if (!open) setOpen(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setButtonClass("hide");
    }, 2000);
  }, []);

  useEffect(() => {
    const getPostMessage = (e: MessageEvent) => {
      if (e.data.tempUnit && !e.data.latitude) {
        sessionStorage.setItem("tempUnit", e.data.tempUnit);
        if (setTempUnit) {
          setTempUnit(e.data.tempUnit);
          return;
        }
      } else if (e.data.latitude && e.data.longitude) {
        const { latitude, longitude, weather } = e.data;

        if (latitude === savedLatitude && longitude === savedLongitude) {
          return;
        }
        sessionStorage.setItem("latitude", latitude);
        sessionStorage.setItem("longitude", longitude);
        if (setWeatherData && setTempUnit) {
          setWeatherData(weather);
          return;
        }
        return;
      } else {
        return;
      }
    };
    window.addEventListener("message", getPostMessage);

    return () => {
      window.removeEventListener("message", getPostMessage);
    };
  }, []);

  return (
    <View>
      <Popup
        id="apps-wrapper-popup"
        swipeHandler=".swipe-handler"
        swipeToClose="to-top"
        opened={open}
        backdrop={false}
        animate={true}
        onPopupClosed={() => {
          if (setOpenedApp) {
            setOpenedApp(false);
          }
          (f7.views.current.router as any).url = "/";
          const hours = document.querySelectorAll(".schedule-hours");
          if (hours) {
            hours.forEach((element) => {
              element.remove();
            });
          }
          return;
        }}
        style={{
          backgroundColor: backgroundColor,
          color: mode === "dark" ? "white" : "black",
          userSelect: "none",
        }}
      >
        <Page style={{ backgroundColor: backgroundColor }}>
          {calculator && <Calculator />}
          {copilot && (
            <iframe style={iframeStyle} src="https://copilot.microsoft.com/" />
          )}
          {photos && <PhotosApp />}
          {calendar && <CalendarApp></CalendarApp>}
          {dynagraph && <DynaGraph></DynaGraph>}
          {socially && (
            <iframe
              style={iframeStyle}
              src="https://harmonious-souffle-b8b1b3.netlify.app/?iframe"
            />
          )}
          {blog && (
            <iframe
              style={iframeStyle}
              src="https://blog-wapp.netlify.app/?iframe"
            />
          )}
          {store && (
            <iframe style={iframeStyle} src="https://prt-store.netlify.app" />
          )}
          {messages && (
            <iframe style={iframeStyle} src="https://mesgboard.fly.dev" />
          )}
          {weatherapp && savedLongitude && savedLatitude && (
            <iframe
              style={iframeStyle}
              // src={`http://localhost:3000/search?latitude=${savedLatitude}&longitude=${savedLongitude}`}
              src={`https://jade-narwhal-43b15e.netlify.app/search?latitude=${savedLatitude}&longitude=${savedLongitude}`}
            />
          )}
          {weatherapp && !savedLongitude && !savedLatitude && (
            <iframe
              width={"110%"}
              height={"110%"}
              style={iframeStyle}
              src={`https://jade-narwhal-43b15e.netlify.app`}
              // src="http://localhost:3000"
            />
          )}

          {search && (
            <div id="search-container">
              <Close
                onClick={() => {
                  setOpen(false);
                }}
                sx={{
                  fill: "black",
                  position: "absolute",
                  left: "93%",
                  fontSize: 30,
                  top: "1rem",
                  border: "solid black",
                  borderRadius: "100%",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              ></Close>
              <iframe
                id="search-iframe"
                src={`https://www.bing.com/search?q=${searchTerm}`}
                style={iframeStyle}
              ></iframe>
            </div>
          )}
          <div
            className="swipe-handler"
            style={{
              position: "absolute",
              bottom: "3px",
              left: "calc(50% - 4.5rem)",
              width: "9rem",
              height: "10px",
              zIndex: "9999",
              margin: "auto auto 1px auto",
              borderRadius: "100px",
              backgroundColor: "gray",
            }}
          ></div>
          {(socially || store || blog || weatherapp || messages) && (
            <button
              onClick={() => {
                const href = socially
                  ? "https://harmonious-souffle-b8b1b3.netlify.app"
                  : blog
                  ? "https://blog-wapp.netlify.app"
                  : store
                  ? "https://prt-store.netlify.app"
                  : messages
                  ? "https://mesgboard.fly.dev"
                  : "https://jade-narwhal-43b15e.netlify.app";

                window.open(href);
              }}
              className={`${buttonClass}-open-external-btn`}
              style={{
                backgroundColor: mainColor,
                borderColor: mainColor,
                color: backgroundColor,
              }}
            >
              <p style={{ color: backgroundColor }}>Open in new Window</p>
            </button>
          )}
        </Page>
      </Popup>
    </View>
  );
};

export default AppsWrapper;
