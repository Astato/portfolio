import { Grid, ThemeProvider, createTheme } from "@mui/material";
import Screen from "./Screen";
import { useEffect, useState, createContext, ReactElement } from "react";
import Framework7 from "framework7/lite-bundle";
import Framework7React from "framework7-react";
import { App, View } from "framework7-react";
import "framework7/css/bundle";
import Settings from "./Settings";
import NotificationBar from "./NotificationBar";
import AppDrawer from "./AppDrawer";
import defaultWallpaper from "/assets/pexels-brady-knoll-5409751.jpg";
import HubMode from "./HubMode";
import AppsWrapper from "./AppsWrapper";
import { extractColors } from "extract-colors";
import tinycolor from "tinycolor2";
Framework7.use(Framework7React);

interface ColorPalette {
  disabled: string;
  nightmode: string;
  colors: string[];
  active: string[];
}

interface DarkModeContextType {
  darkMode: boolean;
  openNotificationBar: string;
  openAppDrawer: string;
  newItem: ReactElement | null;
  homeWallpaper: string | ImageData;
  lockWallpaper: string;
  hubModeType: string;
  hubModeActive: boolean;
  nightLight: boolean;
  brightness: number;
  weatherData: any;
  openedApp: boolean;
  colorPalette: ColorPalette;
  tempUnit: string;
  setTempUnit: React.Dispatch<React.SetStateAction<string>>;
  setOpenedApp: React.Dispatch<React.SetStateAction<boolean>>;
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
  setNewItem: React.Dispatch<React.SetStateAction<ReactElement | null>>;
  setOpenNotificationBar: React.Dispatch<React.SetStateAction<string>>;
  setOpenAppDrawer: React.Dispatch<React.SetStateAction<string>>;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setHomeWallpaper: React.Dispatch<React.SetStateAction<string | ImageData>>;
  setLockWallpaper: React.Dispatch<React.SetStateAction<string>>;
  setHubModeType: React.Dispatch<React.SetStateAction<string>>;
  setHubModeActive: React.Dispatch<React.SetStateAction<boolean>>;
  setNightLight: React.Dispatch<React.SetStateAction<boolean>>;
  setColorPalette: React.Dispatch<React.SetStateAction<ColorPalette>>;
  setWeatherData: React.Dispatch<React.SetStateAction<any>>;
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

interface WrapperProps {
  weatherData: any;
  setWeatherData: React.Dispatch<React.SetStateAction<any>>;
}

const options = {
  pixels: 128000, // Increase this to analyze more pixels
  distance: 0.03, // Decrease this to get colors closer to each other
};
async function extractWallpaperColors(src: ImageData) {
  try {
    const colors = await extractColors(src, options);
    if (colors) {
      return colors;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}

const Wrapper: React.FC<WrapperProps> = ({ weatherData, setWeatherData }) => {
  const [colorPalette, setColorPalette] = useState<ColorPalette>({
    disabled: "#1e1d1f",
    nightmode: "false",
    colors: [],
    active: [],
  });
  const [darkMode, setDarkMode] = useState(true);
  const [openNotificationBar, setOpenNotificationBar] = useState<string>("");
  const [openAppDrawer, setOpenAppDrawer] = useState<string>("");
  const [newItem, setNewItem] = useState<ReactElement | null>(null);
  const [homeWallpaper, setHomeWallpaper] = useState<string | ImageData>(
    defaultWallpaper
  );
  const [tempUnit, setTempUnit] = useState(
    sessionStorage.getItem("tempUnit") || ""
  );
  const [lockWallpaper, setLockWallpaper] = useState<string>(defaultWallpaper);
  const [nightLight, setNightLight] = useState<boolean>(false);
  const [hubModeType, setHubModeType] = useState<string>("default");
  const [hubModeActive, setHubModeActive] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(1);
  const [openedApp, setOpenedApp] = useState<boolean>(false);
  const main = colorPalette.active[0] || "#ffff";
  const dark = colorPalette.active[1] || "#ffff";
  const accent = colorPalette.active[2] ? colorPalette.active[2] : "#fff";
  const disabled = colorPalette.disabled
    ? tinycolor(dark).darken().desaturate().toString()
    : "gray";
  const DarkTheme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          outlined: {
            backgroundColor: "rgba(200,200,200,0.05)",
            border: disabled,
            color: "white",
            textTransform: "none",
            ":hover": {
              backgroundColor: main,
            },
          },
          contained: {
            textTransform: "none",
          },
        },
      },
    },
    palette: {
      mode: "dark",

      primary: {
        main: main,
        dark: dark, /// hover
        light: accent,
      },
    },
  });
  const LightTheme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          outlined: {
            textTransform: "none",
            backgroundColor: "rgba(200,200,200,0.1)",
            border: disabled,
            color: "white",
            ":hover": {
              backgroundColor: dark,
            },
          },
          contained: {
            textTransform: "none",
          },
        },
      },
    },
    palette: {
      mode: "light",
      background: {
        default: "rgb(230,230,230)",
      },
      primary: {
        main: main,
        dark: dark, /// hover
        light: accent,
      },
    },
  });

  useEffect(() => {
    if (homeWallpaper) {
      extractWallpaperColors(homeWallpaper as ImageData).then(
        (colors): void => {
          const extractedColors = colors?.map((color) => {
            return color.hex;
          });

          if (extractedColors) {
            {
              setColorPalette({
                colors: [...extractedColors],
                disabled: "#1e1d1f",
                nightmode: "false",
                active: [
                  extractedColors[1],
                  extractedColors[2],
                  extractedColors[0],
                ],
              });
            }
          }
        }
      );
    }
  }, [homeWallpaper]);

  useEffect(() => {
    document.documentElement.style.setProperty("--f7-theme-color", main);
    document.documentElement.style.setProperty("--f7-theme-shade", dark);
    document.documentElement.style.setProperty("--f7-theme-tint", dark);
    document.documentElement.style.setProperty("--ripple-color", dark);
    document.documentElement.style.setProperty("--f7-fab-bg-color", main);
    document.documentElement.style.setProperty("--dark-color", dark);
    document.documentElement.style.setProperty("--main-color", main);
    document.documentElement.style.setProperty("--light-color", accent);
    document.documentElement.style.setProperty(
      "--f7-toggle-inactive-bg-color",
      disabled
    );
    document.documentElement.style.setProperty(
      "--f7-toggle-inactive-knob-bg-color",
      "rgba(200,200,200,.6)"
    );
    const wrapper = document.getElementById("wrapper");
    if (wrapper && screen) {
      if (sessionStorage.getItem("nightLight") === "true") {
        setNightLight(true);

        wrapper.style.filter = "sepia(25%) brightness(90%)";
      } else if (sessionStorage.getItem("nightLight") === "false") {
        wrapper.style.filter = "sepia(0%) brightness(100%)";
        setNightLight(false);
      }
    }
    if (sessionStorage.getItem("darkTheme") === "false") {
      setDarkMode(false);
      document.body.style.backgroundColor = "white";
    } else if (sessionStorage.getItem("darkTheme") === "true") {
      setDarkMode(true);
      document.body.style.backgroundColor = "black";
    }
  }, [colorPalette, darkMode, nightLight]);

  useEffect(() => {
    const imgDock = document.getElementById("dock-image");
    if (imgDock) {
      if (hubModeActive) {
        imgDock.classList.remove("undock-image");
        imgDock.classList.add("dock-image");
      } else if (!hubModeActive && imgDock.className === "dock-image") {
        imgDock.classList.remove("dock-image");
        imgDock.classList.add("undock-image");
      }
    }
  }, [hubModeActive]);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        openNotificationBar,
        setOpenNotificationBar,
        openAppDrawer,
        setOpenAppDrawer,
        newItem,
        setNewItem,
        homeWallpaper,
        setHomeWallpaper,
        hubModeType,
        setHubModeType,
        hubModeActive,
        setHubModeActive,
        lockWallpaper,
        setLockWallpaper,
        setNightLight,
        nightLight,
        brightness,
        setBrightness,
        weatherData,
        openedApp,
        setOpenedApp,
        setColorPalette,
        colorPalette,
        setWeatherData,
        tempUnit,
        setTempUnit,
      }}
    >
      <ThemeProvider theme={darkMode ? DarkTheme : LightTheme}>
        <Grid
          container
          id="wrapper"
          justifyContent={"center"}
          className={hubModeActive ? "dock" : "undock"}
          alignItems={"center"}
        >
          {hubModeActive ? (
            <HubMode></HubMode>
          ) : (
            <App
              name="app"
              routes={[
                {
                  path: "/",
                  component: Screen,
                  options: { animate: false },
                },
                {
                  path: "/settings/",
                  component: Settings,

                  options: { animate: false },
                },
                {
                  path: "/calculator/",
                  component: AppsWrapper,
                  options: {
                    animate: false,
                    props: {
                      calculator: true,
                    },
                  },
                },
                {
                  path: "/copilot/",
                  component: AppsWrapper,
                  options: {
                    props: {
                      copilot: true,
                    },
                  },
                },
                {
                  path: "/photos/",
                  component: AppsWrapper,
                  options: {
                    props: {
                      photos: true,
                    },
                  },
                },
                {
                  path: "/calendar/",
                  component: AppsWrapper,
                  options: {
                    props: {
                      calendar: true,
                    },
                  },
                },
                {
                  path: "/search/",
                  component: AppsWrapper,
                  options: {
                    props: {
                      search: true,
                    },
                  },
                },
                {
                  path: "/dynagraph/",
                  component: AppsWrapper,
                  options: {
                    props: {
                      dynagraph: true,
                    },
                  },
                },
                {
                  path: "/socially/",
                  component: AppsWrapper,
                  options: {
                    props: {
                      socially: true,
                    },
                  },
                },
                {
                  path: "/weatherapp/",
                  component: AppsWrapper,
                  options: {
                    props: {
                      weatherapp: true,
                    },
                  },
                },
                {
                  path: "/store/",
                  component: AppsWrapper,
                  options: {
                    props: {
                      store: true,
                    },
                  },
                },
                {
                  path: "/messages/",
                  component: AppsWrapper,
                  options: {
                    props: {
                      messages: true,
                    },
                  },
                },
                {
                  path: "/blog/",
                  component: AppsWrapper,
                  options: {
                    props: {
                      blog: true,
                    },
                  },
                },
              ]}
            >
              <View
                main
                url="/"
                style={{
                  backgroundColor: "white",
                  margin: "0",
                }}
              ></View>
              <NotificationBar
                show={openNotificationBar}
                setShow={setOpenNotificationBar}
              />
              <AppDrawer />
            </App>
          )}
        </Grid>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export default Wrapper;
