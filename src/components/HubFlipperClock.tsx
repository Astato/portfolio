import { Grid, Tooltip } from "@mui/material";
import React, { useState, useContext, useEffect, useRef } from "react";
import { format } from "date-fns";
import { DarkModeContext } from "./Wrapper";
const HubFlipperClock = () => {
  const appContext = useContext(DarkModeContext);
  const darkmode = appContext?.darkMode;
  const [now, setNow] = useState<string | Date>(new Date().toLocaleString());
  const [minutes, setminutes] = useState<string>("");
  const [hours, sethours] = useState<string>("");
  const minutesRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);

  const tileColor = !darkmode ? "rgb(240,240,240)" : "#393a4e";
  const numbersColor = !darkmode ? "#39594c" : "white";
  const dividerColor = !darkmode ? "white" : "#2e2d3b";

  function playAnimation(
    ele: React.MutableRefObject<HTMLDivElement | null>,
    value: string
  ) {
    const formatMinutes = format(now as Date, "mm");
    const formatHours = format(now as Date, "HH");
    if (ele.current) {
      ele.current.style.animation = "none";
      ele.current.offsetWidth;
      ele.current.style.animation = "flip 1.5s forwards";
      ele.current.onanimationstart = () => {
        const timeout = setTimeout(() => {
          if (value === "hours") {
            sethours(formatHours);
          } else {
            setminutes(formatMinutes);
          }
        }, 200);
        return () => clearTimeout(timeout);
      };
    }
    return true;
  }

  useEffect(() => {
    const formatMinutes = format(now as Date, "mm");
    const formatHours = format(now as Date, "HH");

    if (!minutes && !hours) {
      if (minutesRef.current && hoursRef.current) {
        minutesRef.current.style.animation = "flip 0s forwards";
        hoursRef.current.style.animation = "flip 0s forwards";
      }
      setminutes(formatMinutes);
      sethours(formatHours);
    }
    const interval = setInterval(() => {
      setNow(new Date().toLocaleString());
      if (hours && formatHours !== hours) {
        //// prevents hours animation from playing twice
        const anim = playAnimation(hoursRef, "hours");
        if (anim) {
          sethours(formatHours);
        }
      }
      if (minutes && formatMinutes !== minutes) {
        playAnimation(minutesRef, "minutes");
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [now]);

  return (
    <Tooltip open={true} title="Double click to unlock">
      <Grid
        xs={8}
        item
        marginTop={"3rem"}
        columnGap={1}
        id="hub-flip-clock"
        minWidth={"100%"}
        style={{
          position: "relative",
          display: "grid",
          userSelect: "none",
          gridTemplateColumns: "repeat(2, auto)",
          columnGap: "0",
          margin: "0 auto",
          backgroundColor: dividerColor,
        }}
      >
        {/* HOUR */}

        <div
          className="flip-clock-container"
          style={{ margin: "auto 0 auto .9rem" }}
        >
          <div
            className="flipper-top"
            style={{ backgroundColor: tileColor }}
          ></div>

          <div
            className="number"
            style={{
              left: hours.toString().length === 2 ? "9%" : "30%",
              color: numbersColor,
            }}
          >
            {hours}
          </div>
          <div
            className="flipper"
            ref={hoursRef}
            style={{ backgroundColor: tileColor, animationDelay: ".5s" }}
          >
            <p
              style={{
                left: hours.toString().length === 2 ? "8%" : "29.5%",
                color: numbersColor,
              }}
            >
              {hours}
            </p>
          </div>
          <div
            className="divider"
            style={{ backgroundColor: dividerColor }}
          ></div>
          <div
            className="flipper-bottom"
            style={{ backgroundColor: tileColor }}
          ></div>
        </div>
        {/* HOUR END */}
        {/* Minute */}
        <div
          className="flip-clock-container"
          style={{ margin: "auto .8rem auto 0" }}
        >
          <div
            className="flipper-top"
            style={{ backgroundColor: tileColor }}
          ></div>

          <div
            className="number"
            style={{
              left: minutes.toString().length === 2 ? "9%" : "30%",
              color: numbersColor,
            }}
          >
            {minutes}
          </div>
          <div
            className="flipper"
            ref={minutesRef}
            style={{ backgroundColor: tileColor }}
          >
            <p
              style={{
                left: minutes.toString().length === 2 ? "8%" : "29.5%",
                color: numbersColor,
              }}
            >
              {minutes}
            </p>
          </div>

          <div
            className="divider"
            style={{ backgroundColor: dividerColor }}
          ></div>
          <div
            className="flipper-bottom"
            style={{ backgroundColor: tileColor }}
          ></div>
        </div>
        {/* Minute end */}
      </Grid>
    </Tooltip>
  );
};

export default HubFlipperClock;
