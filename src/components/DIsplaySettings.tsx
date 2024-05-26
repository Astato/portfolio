import { Grid, useTheme, Stack, Slider, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Toggle, List, ListItem, Popover } from "framework7-react";
import { SettingsProps } from "./Settings";
import { useContext, useEffect, useRef, useState } from "react";
import { DarkModeContext } from "./Wrapper";
import tinycolor from "tinycolor2";

function checkColorReadability(
  darkMode: boolean,
  color: string,
  maincolor: string,
  darkcolor: string
) {
  const background = darkMode ? "rgb(18, 18, 18)" : "#fff";
  let isReadableColor = tinycolor.isReadable(color, background);

  let accentColor = color;
  if (isReadableColor) {
    if (!darkMode) {
      return tinycolor(color).saturate(100).toString();
    }
    {
      return accentColor;
    }
  }
  /////fix
  if (!isReadableColor) {
    if (darkMode) {
      accentColor = tinycolor(color).brighten(15).toString();
      isReadableColor = tinycolor.isReadable(accentColor, background);
      if (!isReadableColor) {
        accentColor = tinycolor(color).lighten(50).saturate(20).toString();
      }
    } else {
      if (!isReadableColor) {
        accentColor = tinycolor(color).saturate(100).toString();
        isReadableColor = tinycolor.isReadable(accentColor, background);
        if (!isReadableColor) {
          accentColor = tinycolor
            .mostReadable(background, [maincolor, color])
            .toString();
        }
      }
    }
  }
  return accentColor;
}

const DisplaySettings: React.FC<SettingsProps> = ({
  history,
  setHistory,
  handlePreviousDragEnd,
  settingsWrapper,
}) => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const backgroundColor = theme.palette.background.default;
  const mainColor = theme.palette.primary.main;
  const darkColor = theme.palette.primary.dark;
  const accentColorDefault = theme.palette.primary.light;
  const appContext = useContext(DarkModeContext);
  const setDarkMode = appContext?.setDarkMode;
  const darkMode = appContext?.darkMode;
  const setNightLight = appContext?.setNightLight;
  const nightLight = appContext?.nightLight;
  const [openSlider, setOpenSlider] = useState<boolean>(false);
  const [accentColor, setAccentColor] = useState<string>(accentColorDefault);
  const timeoutPageRef = useRef<HTMLDivElement>(null);
  const textColor = mode === "dark" ? "white" : "black";
  const brightnessLevel = appContext?.brightness;
  const setBrightnessLevel = appContext?.setBrightness;

  // const accentColor = checkColorReadability(darkMode, accentColorDefault);

  useEffect(() => {
    const newAccentColor = checkColorReadability(
      darkMode || false,
      accentColorDefault,
      mainColor,
      darkColor
    );
    setAccentColor(newAccentColor);
  }, [accentColorDefault]);

  const [timeoutSelectedOption, setTimeoutSelectedOption] =
    useState<string>("Never");

  interface ButtonProps {
    value: number;
    timeUnit: string;
  }
  const TimeoutRadio: React.FC<ButtonProps> = ({ value, timeUnit }) => {
    useEffect(() => {
      document.documentElement.style.setProperty(
        "--f7-list-item-title-text-color",
        textColor
      );
    }, [mode]);

    return (
      <ListItem
        style={{ listStyle: "none", color: textColor }}
        onClick={() => setTimeoutSelectedOption(value + timeUnit)}
        radio
        defaultChecked={
          value === 0 && timeoutSelectedOption === "Never"
            ? true
            : timeoutSelectedOption === value + timeUnit
            ? true
            : false
        }
        title={value !== 0 ? value + " " + timeUnit : "Never"}
        value={value + timeUnit}
        name={"timeout" + value + timeUnit}
      />
    );
  };

  ///// PROBLEM HERE
  const handleChangeBrightness = (e: any) => {
    setBrightnessLevel && setBrightnessLevel(e.target.value);
    const backdrop = document.querySelector(
      "#framework7-root > div.popover-backdrop.backdrop-in"
    ) as HTMLElement;
    const settings = document.getElementById("settings-wrapper");

    if (backdrop && settings) {
      // backdrop.style.visibility = "hidden";
      backdrop.style.opacity = "0";
      if (settingsWrapper && settingsWrapper.current) {
        settingsWrapper.current.style.opacity = "0";
      }
    }
    document.body.style.filter = `brightness(${brightnessLevel})`;
  };
  const commitBrightnessChange = () => {
    const backdrop = document.querySelector(
      "#framework7-root > div.popover-backdrop.backdrop-in"
    ) as HTMLElement;
    const settings = document.getElementById("settings-wrapper");

    if (backdrop && settings) {
      backdrop.style.opacity = "1";
      if (settingsWrapper && settingsWrapper.current) {
        settingsWrapper.current.style.opacity = "1";
      }
    }
  };

  return (
    <Grid
      container
      item
      id="display-settings"
      columns={12}
      xs={8}
      style={{
        backgroundColor: backgroundColor,
        paddingBottom: "6rem",
      }}
    >
      {history[0] === "timeout" && (
        <Grid
          id="timeout-page"
          ref={timeoutPageRef}
          style={{
            backgroundColor: backgroundColor,
          }}
          className={
            history[0] === "timeout"
              ? "page-open"
              : history.length === 2 &&
                timeoutPageRef.current?.className === "page-open"
              ? "page-close"
              : ""
          }
          item
          container
          xs={8}
        >
          <Grid style={{ width: "90%", margin: "0 auto" }}>
            <ArrowBack
              sx={{
                fontSize: 23,
                marginLeft: "-1rem",
                ":hover": {
                  cursor: "pointer",
                },
              }}
              onClick={(e) => handlePreviousDragEnd(e, "backarrowclick")}
            />
            <p
              style={{
                position: "relative",
                fontSize: "30px",
                margin: "2rem auto -2rem auto ",
                width: "100%",
                display: "flex",
                alignItems: "center",
                color: textColor,
              }}
            >
              Screen timeout
            </p>
            <Grid margin={"3rem 0"} item xs={12}>
              <List outlineMd strongMd style={{ marginTop: "0" }}>
                <TimeoutRadio value={0} timeUnit="Never" />
                <TimeoutRadio value={15} timeUnit="seconds" />
                <TimeoutRadio value={30} timeUnit="seconds" />
                <TimeoutRadio value={1} timeUnit="minutes" />
                <TimeoutRadio value={2} timeUnit="minutes" />
                <TimeoutRadio value={5} timeUnit="minutes" />
                <TimeoutRadio value={10} timeUnit="minutes" />
                <TimeoutRadio value={30} timeUnit="minutes" />
              </List>
            </Grid>
          </Grid>
        </Grid>
      )}
      <List style={{ width: "80%", margin: "auto" }}>
        <p
          style={{
            fontSize: "30px",
            margin: "6rem auto 1rem  auto",
            width: "100%",
          }}
        >
          Display
        </p>
        <ListItem>
          <Grid item xs={12}>
            <p
              style={{
                color: accentColor,
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              Brightness
            </p>
            <Popover
              className="brightness-popover"
              opened={openSlider}
              style={{
                width: "50%",
                height: "30%",
                margin: "calc(20% - 30px) calc(25% + 30px)",
                backgroundColor: backgroundColor,
                overflow: "hidden",
              }}
              closeByOutsideClick
              closeByBackdropClick
              arrow={false}
              onPopoverClosed={() => setOpenSlider(false)}
            >
              <Stack
                spacing={3}
                flexDirection={"column"}
                width={"80%"}
                overflow={"hidden"}
                margin={"auto"}
                textAlign={"center"}
                justifyContent={"center"}
                paddingLeft={"1.5rem"}
              >
                <span
                  style={{
                    marginBottom: "0",
                    marginTop: "1rem",
                    color: accentColor,
                  }}
                >
                  Brightness
                </span>
                <Slider
                  max={1}
                  style={{ width: "90%" }}
                  value={brightnessLevel}
                  min={0.1}
                  step={0.01}
                  onChange={(e) => handleChangeBrightness(e)}
                  onChangeCommitted={commitBrightnessChange}
                />
                <p style={{ color: "graytext" }}>
                  {(brightnessLevel && brightnessLevel * 100)?.toFixed()}%
                </p>
                {/* <Button>Accept</Button> */}
              </Stack>
            </Popover>
            <Button
              id="button-list"
              variant="text"
              onClick={() => setOpenSlider(true)}
            >
              <p
                style={{
                  color: textColor,
                }}
              >
                Brightness level
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "GrayText",
                }}
              >
                {(brightnessLevel && brightnessLevel * 100)?.toFixed()}%
              </p>
            </Button>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid xs={12} item>
            <p
              style={{
                color: accentColor,
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              Lock screen
            </p>
            <Button
              variant="text"
              id="button-list"
              onClick={() => setHistory((prev) => [...prev, "timeout"])}
            >
              <p style={{ color: textColor }}>Screen timeout</p>
              <p style={{ fontSize: "12px", color: "GrayText" }}>
                After {"2 minutes"} of inactivity
              </p>
            </Button>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid item xs={12}>
            <p style={{ color: accentColor, fontSize: "15px" }}>Appearence</p>
            <Grid style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Night Light</span>
              <Toggle
                bgColor={mainColor}
                defaultChecked={nightLight}
                onToggleChange={(e) => {
                  setNightLight && setNightLight(e);
                  sessionStorage.setItem("nightLight", e.toString());
                }}
                color={mainColor}
                colorTheme={mainColor}
              />
            </Grid>
            <Grid
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1.5rem",
              }}
            >
              <span>Dark Theme</span>
              <Toggle
                // defaultChecked={darkMode}
                bgColor={mainColor}
                color={mainColor}
                colorTheme={mainColor}
                defaultChecked={darkMode}
                onToggleChange={(e) => {
                  if (setDarkMode) {
                    setDarkMode(e);
                    sessionStorage.setItem("darkTheme", e ? "true" : "false");
                  }
                }}
              />
            </Grid>
            {/* <Grid
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 2, m: "auto", mt: "0rem" }}
                // alignItems="center"
                flexDirection={"column"}
                width={"100%"}
              >
                <span style={{ marginBottom: ".5rem", color: accentColor }}>
                  Font Size
                </span>
                <Slider
                  max={20}
                  step={1}
                  min={10}
                  defaultValue={brightnessLevel}
                />
              </Stack>
            </Grid> */}
          </Grid>
        </ListItem>
      </List>
    </Grid>
  );
};

export default DisplaySettings;
