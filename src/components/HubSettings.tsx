import { Grid, useTheme } from "@mui/material";
import { Check } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./Wrapper";
import darkFlipper from "../assets/flipper-dark.png";
import lightFlipper from "../assets/flipper-light.png";
import HubDigitalClock from "./HubDigitalClock";

interface HubModeItemProps {
  type: string;
}

const HubModeItem: React.FC<HubModeItemProps> = ({ type }) => {
  const theme = useTheme();
  const appContext = useContext(DarkModeContext);
  const darkMode = appContext?.darkMode;
  const mainColor = theme.palette.primary.main;
  const darkColor = theme.palette.primary.dark;
  const hubMode = appContext?.hubModeType;
  const setHubMode = appContext?.setHubModeType;
  const [backgroundsize, setBackgroundSize] = useState<string>("cover");

  useEffect(() => {
    setBackgroundSize(darkMode ? "contain" : "cover");
  }, [darkMode]); // Re-run effect when dark mode changes

  return (
    <div>
      {type === "default" && (
        <div
          onClick={() => {
            if (setHubMode) setHubMode(type);
          }}
          style={{
            width: "2.04in",
            height: "1.34in",
            background: `url(${darkMode ? darkFlipper : lightFlipper})`,
            backgroundSize: backgroundsize,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
            margin: "auto",
          }}
        >
          {hubMode === type && (
            <Grid
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                border: "solid 3px" + mainColor,
                backgroundColor: `${mainColor}${Math.round(0.3 * 255).toString(
                  16
                )}`,
                borderRadius: "10px",
              }}
            >
              <Check
                style={{
                  fontSize: "30",
                  margin: "auto",
                  fill: darkColor,
                }}
              />
            </Grid>
          )}
        </div>
      )}

      {type === "digital" && (
        <div
          onClick={() => {
            if (setHubMode) setHubMode(type);
          }}
          style={{ width: "2.04in", height: "1.34in", position: "relative" }}
        >
          <HubDigitalClock template={true}></HubDigitalClock>
          {hubMode === type && (
            <Grid
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                top: 0,
                border: "solid 3px" + mainColor,
                backgroundColor: `${mainColor}${Math.round(0.3 * 255).toString(
                  16
                )}`,
                borderRadius: "10px",
              }}
            >
              <Check
                style={{
                  fontSize: "30",
                  margin: "auto",
                  fill: darkColor,
                }}
              />
            </Grid>
          )}
        </div>
      )}
    </div>
  );
};

const HubSettings = () => {
  const theme = useTheme() as import("@mui/material").Theme;
  const backgroundColor = theme.palette.background.default;
  const appContext = useContext(DarkModeContext);
  const darkMode = appContext?.darkMode;

  useEffect(() => {}, [darkMode]);

  return (
    <Grid
      item
      container
      xs={8}
      style={{
        zIndex: "1",
        backgroundColor: backgroundColor,
      }}
    >
      <Grid xs={10} item sx={{ margin: " 6rem auto -10rem auto" }}>
        <p style={{ fontSize: "30px", margin: "auto" }}>Hub Mode</p>
      </Grid>
      <Grid item container xs={12} marginTop={"-15rem"}>
        <Grid
          item
          container
          xs={10}
          margin={"auto"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <HubModeItem type="default" />
          <HubModeItem type="digital" />
        </Grid>

        {/* <Grid container item xs={10} sx={{ margin: "auto" }}>
          <List style={{ width: "100%", margin: "auto" }}>
            <ListItem>
              <span>Weather</span>
              <Toggle color="primary" />
            </ListItem>
          </List>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default HubSettings;
