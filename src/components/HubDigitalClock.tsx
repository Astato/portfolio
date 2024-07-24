import { Grid, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./Wrapper";
import { format } from "date-fns";
import weatherIcons from "../utils/weatherIcons";
interface Props {
  template?: boolean;
  preview?: string;
}
const HubDigitalClock: React.FC<Props> = ({ template, preview }) => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    if (!template) {
      const interval = setInterval(() => {
        setNow(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);
  const appContext = useContext(DarkModeContext);
  const wallpaper = appContext?.lockWallpaper;
  const weatherData = appContext?.weatherData;

  const Weather = () => {
    if (weatherData) {
      let temperature;
      const icon = weatherData.weather[0].icon;
      weatherData.sys.country === "US"
        ? (temperature = (
            ((weatherData.main.feels_like - 273.15) * 9) / 5 +
            32
          ).toFixed())
        : (temperature = (weatherData.main.feels_like - 273.15).toFixed());
      return (
        <div
          id="weather-widget-lockscreen"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: template ? "" : "40px",
              color: "GrayText",
            }}
          >
            {temperature}°
          </p>
          <img
            style={{
              height: template ? "" : "40px",
              width: template ? "" : "40px",
              margin: template ? "" : "auto 6px auto 20px",
            }}
            src={
              weatherData.wind.speed > 9
                ? weatherIcons.dark.wind
                : weatherIcons.dark[icon]
            }
          />
          <p style={{ fontSize: template ? "" : "40px" }}>
            {weatherData.weather[0].main}
          </p>
        </div>
      );
    }
  };

  return (
    <Tooltip title={template ? "" : "Double click to unlock"}>
      <Grid
        columns={12}
        container
        id={
          template && !preview
            ? "digital-clock-template"
            : preview
            ? "digital-clock-template-preview"
            : ""
        }
        sx={{
          background: `url(${preview ? preview : wallpaper})`,
          backgroundSize: "cover",
          userSelect: "none",
        }}
      >
        <Grid
          xs={12}
          item
          container
          height={"100%"}
          display={"flex"}
          id="digital-clock-container"
          justifyContent={"center"}
          sx={{ backgroundColor: "rgba(0,0,0,.3)" }}
        >
          <Grid margin={"7rem auto 0 auto"}>
            <p id="digital-clock-hour">{format(now as Date, "HH")}</p>
            <p id="digital-clock-minutes">{format(now as Date, "mm")}</p>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              fontSize: template ? "10px" : "32px",
              width: "40px",
              height: "fit-content",
              marginLeft: template ? "3px" : "1rem",
            }}
          >
            <Weather />
          </Grid>
        </Grid>
      </Grid>
    </Tooltip>
  );
};

export default HubDigitalClock;
