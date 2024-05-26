import { Page, Popup, View, List, ListItem, f7 } from "framework7-react";
import { Button as FButton } from "framework7-react";
import DisplaySettings from "./DIsplaySettings";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  SetStateAction,
} from "react";
import { Grid, useTheme } from "@mui/material";
import { AppsOutlined, Brightness4Outlined } from "@mui/icons-material";
import { DisplaySettings as DisplaySettingsIcon } from "@mui/icons-material/";
import { DarkModeContext } from "./Wrapper";
import HubSettings from "./HubSettings";
import WallpaperSettings from "./WallpaperSettings";
import tinycolor from "tinycolor2";

export interface SettingsProps {
  history: string[];
  imageSelected?: string;
  setHistory: React.Dispatch<SetStateAction<string[]>>;
  setImageSelected?: React.Dispatch<SetStateAction<string>>;
  handlePreviousDragEnd: (e: any, clickevent: string) => void;
  settingsWrapper?: React.MutableRefObject<HTMLDivElement | null>;
}

const Settings = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) {
      setOpen(true);
    }
  }, []);

  //selected color #b7cbc2

  type HistoryItem = string;

  const [isSelected, setIsSelected] = useState<string>("Wallpaper & Style");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [openWallpaperChange, setOpenWallpaperChange] = useState<string>("");
  interface ItemProps {
    text: string;
    icon: React.ReactNode;
  }
  const [screenDragStartPosition, setScreenDragStartPosition] = useState<
    [number, number]
  >([0, 0]);

  const [imageSelected, setImageSelected] = useState<string>("");

  const [dragStartPosition, setDragStartPosition] = useState<number>(0);
  const theme = useTheme();
  const mode = theme.palette.mode;
  const backgroundColor = theme.palette.background.default;
  const appContext = useContext(DarkModeContext);
  const setOpenNotificationBar = appContext?.setOpenNotificationBar;
  const setOpenAppDrawer = appContext?.setOpenAppDrawer;
  const previousDraggableBar = useRef<HTMLDivElement>(null);
  const setOpenedApp = appContext?.setOpenedApp;
  const settingsRef = useRef<HTMLDivElement | null>(null);

  const SidebarItem: React.FC<ItemProps> = ({ text, icon }) => {
    return (
      <ListItem
        onClick={() => {
          setIsSelected(text);
          setOpenWallpaperChange("");
          setHistory([]);
        }}
        className="settings-sidebar-items"
        style={{
          backgroundColor:
            isSelected === text && mode === "light"
              ? "#b7cbc2"
              : isSelected === text && mode === "dark"
              ? "#DFF7EC"
              : "",
          color:
            isSelected === text && mode === "light"
              ? "black"
              : isSelected === text && mode === "dark"
              ? "black"
              : mode === "dark"
              ? "white"
              : "black",
        }}
      >
        {icon}
        <p>{text}</p>
      </ListItem>
    );
  };

  const handlePreviousDragStart = (e: React.DragEvent) => {
    setDragStartPosition(e.pageX);
    const img = new Image();
    img.src = "";
    e.dataTransfer?.setData("text/plain", "");
    e.dataTransfer?.setDragImage(img, 10, 10);
  };
  const handlePreviousDrag = (e: React.DragEvent) => {
    if (e.pageX >= dragStartPosition + 50) {
      if (previousDraggableBar.current) {
        previousDraggableBar.current.style.width = "50px";
      }
    }
  };

  /// manages the f7 history browsing (back), when clicking the arrowback in the different sub-settings, or the dragging of the left border (in settings too)
  const handlePreviousDragEnd = (e: any, clickevent: string) => {
    if (clickevent) {
      setImageSelected("");
      return setHistory((prev) => prev.slice(0, -1));
    }

    if (previousDraggableBar.current) {
      previousDraggableBar.current.style.width = "20px";
    }
    if (e.pageX <= dragStartPosition + 50) {
      return;
    } else {
      if (history.length === 0) {
        setOpen(false);
      } else {
        setImageSelected("");
        setHistory((prev) => prev.slice(0, -1));
      }
    }
  };

  const handleScreenDragStart = (e: React.DragEvent) => {
    const img = new Image();
    img.src = "";
    e.dataTransfer?.setData("text/plain", "");
    e.dataTransfer?.setDragImage(img, 10, 10);
    setScreenDragStartPosition([e.pageX, e.pageY]);
  };
  const handleScreenDragEnd = (e: React.DragEvent) => {
    const movementY = e.pageY;
    const movementX = e.pageX;
    if (
      movementX <= screenDragStartPosition[0] + 50 &&
      movementY >= screenDragStartPosition[1] + 100
    ) {
      if (setOpenNotificationBar && setOpenAppDrawer) {
        setOpenAppDrawer("false");
        setOpenNotificationBar("true");
      }
    } else if (
      movementX <= screenDragStartPosition[0] + 50 &&
      movementY <= screenDragStartPosition[1] - 100
    ) {
      if (setOpenNotificationBar && setOpenAppDrawer) {
        setOpenAppDrawer("true");
      }
    }
  };

  return (
    <View>
      <Popup
        id="settings-popup"
        swipeToClose="to-top"
        // onPopupSwipeMove={(e) => console.log(e?.el.style.transform)} /// to add scale mayvbe?
        swipeHandler=".swipe-handler"
        opened={open}
        animate={true}
        backdrop={false}
        onPopupClosed={() => {
          setOpenedApp && setOpenedApp(false);
          (f7.views.current.router as any).url = "/";
        }}
        style={{
          backgroundColor: "transparent",
          color: mode === "dark" ? "white" : "black",
        }}
      >
        <Page
          name="settings"
          id="settings"
          style={{
            zIndex: "-100000000 ",
            userSelect: "none",
            backgroundColor: "transparent",
          }}
        >
          <Grid
            container
            ref={settingsRef}
            onDragStart={handleScreenDragStart}
            onDragEnd={handleScreenDragEnd}
            columns={12}
            draggable={true}
            id="settings-wrapper"
            sx={{
              height: "100%",
              backgroundColor: "transparent",
              width: "100%",
            }}
          >
            <Grid item container xs={4}>
              <div
                id="edge-previous-draggable"
                ref={previousDraggableBar}
                draggable={true}
                onDragStart={handlePreviousDragStart}
                onDrag={handlePreviousDrag}
                onDragEnd={(e) => handlePreviousDragEnd(e, "")}
                style={{ zIndex: "2", width: "20px" }}
              ></div>
              <List
                id="settings-sidebar"
                style={{
                  backgroundColor:
                    mode === "dark"
                      ? tinycolor(backgroundColor).darken(2).toString()
                      : "#d9dbd8",
                  width: "33.5%",
                  height: "100%",
                  margin: "0",
                  paddingTop: "3rem",
                }}
              >
                <SidebarItem text="Hub Mode" icon={<DisplaySettingsIcon />} />
                {/* <SidebarItem text="Apps" icon={<AppsOutlined />} /> */}
                <SidebarItem text="Display" icon={<Brightness4Outlined />} />
                <SidebarItem
                  text="Wallpaper & Style"
                  icon={<DisplaySettingsIcon />}
                />
                {/* <SidebarItem text="Location" icon={<LocationOnOutlined />} /> */}
              </List>
            </Grid>
            {/* BACKGROUND AND STYLE  */}
            {isSelected === "Display" && (
              <DisplaySettings
                history={history}
                setHistory={setHistory}
                imageSelected={imageSelected}
                setImageSelected={setImageSelected}
                handlePreviousDragEnd={handlePreviousDragEnd}
                settingsWrapper={settingsRef}
              />
            )}
            {isSelected === "Wallpaper & Style" && (
              <WallpaperSettings
                history={history}
                setHistory={setHistory}
                imageSelected={imageSelected}
                setImageSelected={setImageSelected}
                handlePreviousDragEnd={handlePreviousDragEnd}
              />
            )}

            {/* BACKGROUND AND STYLE   end*/}
            {isSelected === "Hub Mode" && <HubSettings />}
            {isSelected === "Apps" && (
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
                <Grid item container xs={12}>
                  <Grid container item xs={9} sx={{ margin: " 0 auto" }}>
                    <List style={{ width: "100%" }}>
                      <ListItem
                        style={{
                          border: "solid graytext 1px",
                          borderRadius: "10px",
                          padding: "1rem 0 ",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src="https://www.stuff.tv/wp-content/uploads/sites/2/2023/06/Google-Pixel-Tablet-notification-tray.jpg?strip=info&w=1500"
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "100px",
                            }}
                          />
                          <p style={{ marginLeft: "1rem" }}>YouTube</p>
                        </div>
                        <FButton roundMd fill>
                          Remove
                        </FButton>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
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
          {/* <Toolbar
            bottom
            style={{
              height: "45px",
              backgroundColor: "black",
              color: "white",
              margin: "auto",
            }}
          >
            <Grid container id="settings-toolbar" gap={2}>
              <Button roundMd>
                <AppsOutlined sx={{ fontSize: 30 }} />
              </Button>
              <Button roundMd>
                <Brightness4Outlined sx={{ fontSize: 30 }} />
              </Button>
              <Button roundMd>
                <Brightness4Outlined sx={{ fontSize: 30 }} />
              </Button>
              <Button roundMd>
                <Brightness4Outlined sx={{ fontSize: 30 }} />
              </Button>
              <Button roundMd>
                <Brightness4Outlined sx={{ fontSize: 30 }} />
              </Button>
            </Grid>
          </Toolbar> */}
        </Page>
      </Popup>
    </View>
  );
};

export default Settings;
