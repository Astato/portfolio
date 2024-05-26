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
}

const AppsWrapper: React.FC<Props> = ({
  calculator,
  copilot,
  photos,
  calendar,
  search,
  searchTerm,
  dynagraph,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const mode = theme.palette.mode;
  const appContext = useContext(DarkModeContext);
  const setOpenedApp = appContext?.setOpenedApp;
  const backgroundColor = theme.palette.background.default;

  useEffect(() => {
    if (!open) setOpen(true);
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
            <iframe
              width={"100%"}
              height={"100%"}
              style={{ userSelect: "none" }}
              src="https://copilot.microsoft.com/"
            />
          )}
          {photos && <PhotosApp />}
          {calendar && <CalendarApp></CalendarApp>}
          {dynagraph && <DynaGraph></DynaGraph>}
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
                width={"100%"}
                height={"100%"}
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
              height: "9px",
              zIndex: "2",
              margin: "auto auto 1px auto",
              borderRadius: "100px",
              backgroundColor: "gray",
            }}
          ></div>
        </Page>
      </Popup>
    </View>
  );
};

export default AppsWrapper;
