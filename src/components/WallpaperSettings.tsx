/// <reference types="vite-plugin-svgr/client" />
import { Dialog, Grid, useTheme, TextField } from "@mui/material";
import { Button as MUIButton } from "@mui/material";
import { ListItem, List, Button, Toggle, f7 } from "framework7-react";
import { Check, ArrowBack, WallpaperOutlined } from "@mui/icons-material";
import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  SetStateAction,
} from "react";
import wallpaper1 from "../assets/pexels-brady-knoll-5409751.jpg";
import wallpaper2 from "../assets/pexels-eberhard-grossgasteiger-572897.jpg";
import wallpaper3 from "../assets/pexels-frans-van-heerden-624015.jpg";
import wallpaper4 from "../assets/pexels-jacub-gomez-1142950.jpg";
import wallpaper5 from "../assets/pexels-jeremy-bishop-2922672.jpg";
import wallpaper6 from "../assets/pexels-walid-ahmad-1509582.jpg";
import { DarkModeContext } from "./Wrapper";
import { SettingsProps } from "./Settings";
import HubDigitalClock from "./HubDigitalClock";
import ImageCompression, { Options } from "browser-image-compression";

const WallpaperSettings: React.FC<SettingsProps> = ({
  history,
  setHistory,
  imageSelected,
  setImageSelected,
  handlePreviousDragEnd,
}) => {
  const theme = useTheme();
  const appContext = useContext(DarkModeContext);
  const darkMode = appContext?.darkMode;
  const setDarkMode = appContext?.setDarkMode;
  const setHomeWallpaper = appContext?.setHomeWallpaper;
  const homeWallpaper = appContext?.homeWallpaper;
  const setLockWallpaper = appContext?.setLockWallpaper;
  const setColorPalette = appContext?.setColorPalette;
  const colorPalette = appContext?.colorPalette;
  const backgroundColor = theme.palette.background.default;
  const mainColor = colorPalette?.active[0];
  const darkColor = colorPalette?.active[1];
  const wallpaperChangeRef = useRef<HTMLDivElement>(null);
  const wallpaperPreviewRef = useRef<HTMLDivElement>(null);
  const [previewType, setPreviewType] = useState<string>("home");
  const [themeType, setThemeType] = useState<string>(
    colorPalette && colorPalette.colors.indexOf(colorPalette.active[0]) >= 0
      ? "dynamic"
      : "basic"
  );
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [defaultWallpapers, setDefaultWallpapers] = useState<string[]>([
    wallpaper1,
    wallpaper2,
    wallpaper3,
    wallpaper4,
    wallpaper5,
    wallpaper6,
  ]);
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);
  const [inputFrom, setInputFrom] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const uploadedImages = sessionStorage.getItem("uploadedImages");
    if (uploadedImages) {
      const array = JSON.parse(uploadedImages);
      setDefaultWallpapers((prev) => {
        const newImages = array.filter(
          (image: string) => !prev.includes(image)
        );
        return prev.concat(newImages);
      });
    }
  }, []);

  useEffect(() => {
    if (imageSelected) {
      setHistory((prev) => [...prev, "wallpaper-preview"]);
    }
  }, [imageSelected]);

  interface PieCharProps {
    combination?: string;
    color1?: string;
    color2?: string;
    color3?: string;
    defaultSelected?: boolean;
  }

  const PieChart: React.FC<PieCharProps> = ({
    combination,
    color1,
    color2,
    color3,
    defaultSelected,
  }) => {
    let colorCombination: string[] = [color1 || "", color2 || "", color3 || ""];
    const generateVariants = (color: string) => {
      const extractValues = color.match(/\d+/gi);
      const generateColor: string[] = [color];
      if (extractValues) {
        let newColor = [];
        for (let i = 0; i <= 1; i++) {
          for (const color of extractValues) {
            if (i === 1) {
              newColor.push(Number(color) - 160);
            } else {
              newColor.push(Number(color) - 100);
            }
          }
          generateColor.push(
            `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`
          );
          newColor = [];
        }
        if (setColorPalette)
          return setColorPalette((prev) => ({
            ...prev,
            active: generateColor,
          }));
      }
    };

    if (colorPalette) {
      switch (combination) {
        case "basic1":
          colorCombination = ["rgba(201,228,222,.89)", " #C9E4DE", "#C9E4DE"];
          break;
        case "basic2":
          colorCombination = ["rgba(198,222,241,.95)", " #C6DEF1", "#C6DEF1"];
          break;
        case "basic3":
          colorCombination = ["rgba(216,205,240,.94)", " #D8CDF0", "#D8CDF0"];
          break;
        case "basic4":
          colorCombination = ["rgba(242,198,222,.95)", " #F2C6DE", "#F2C6DE"];
          break;
        case "basic5":
          colorCombination = ["rgba(247,217,196,.97)", " #F7D9C4", "#F7D9C4"];
          break;
        case "basic6":
          colorCombination = ["rgba(250,237,203,.98)", " #FAEDCB", "#FAEDCB"];
          break;
      }
    }

    return (
      <div
        style={{
          backgroundColor: darkMode ? "rgba(200,200,200,0.05)" : "white",
          minHeight: "66px",
          minWidth: "66px",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {mainColor === colorCombination[0] || defaultSelected ? (
          <div
            style={{
              position: "absolute",
              left: "calc(50% - 15px)",
              top: "calc(50% - 15px)",
              background: darkColor,
              borderRadius: "100%",
              width: "30px",
              height: "30px",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Check
              sx={{
                fontSize: 15,
                fill: mainColor,
                stroke: mainColor,
              }}
            />
          </div>
        ) : null}
        <svg
          width="56mm"
          height="56mm"
          viewBox="0 0 56 56"
          version="1.1"
          id="svg1"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            if (setColorPalette) {
              if (themeType === "dynamic") {
                setColorPalette((prev) => ({
                  ...prev,
                  active: colorCombination,
                }));
              } else {
                generateVariants(colorCombination[0]);
              }
            }
          }}
        >
          <g id="layer1">
            <g id="g3" transform="rotate(-89.979818,21.169162,94.718116)">
              <path
                id="accent"
                fill={
                  themeType === "basic"
                    ? colorCombination[0]
                    : colorCombination[2]
                }
                d="M 87.709375,101.33542 H 60.379777 a 27.3675,27.3675 0 0 0 -0.0067,0.1018 27.3675,27.3675 0 0 0 27.336316,27.36525 z"
              />
              <path
                id="secondary"
                fill={
                  themeType === "basic"
                    ? colorCombination[0]
                    : colorCombination[1]
                }
                d="M 87.709375,74.071965 A 27.3675,27.3675 0 0 0 60.379777,101.33542 h 27.329598 z"
              />
              <path
                id="main"
                fill={
                  themeType === "basic"
                    ? colorCombination[0]
                    : colorCombination[0]
                }
                d="m 87.709375,74.071965 v 54.730505 a 27.3675,27.3675 0 0 0 0.03152,0.002 27.3675,27.3675 0 0 0 27.367325,-27.36732 27.3675,27.3675 0 0 0 -27.367325,-27.367323 27.3675,27.3675 0 0 0 -0.03152,0.0021 z"
              />
            </g>
          </g>
        </svg>
      </div>
    );
  };

  const openVerticalButtons = () => {
    f7.dialog
      .create({
        title: "Set wallpaper on",
        buttons: [
          {
            text: "Home screen",
            cssClass: "prompt-button",
            onClick: () => {
              if (setHomeWallpaper && imageSelected) {
                setHomeWallpaper(imageSelected);
                f7.dialog.close();
              }
            },
          },
          {
            text: "Lock Screen",
            cssClass: "prompt-button",
            onClick: () => {
              if (setLockWallpaper && imageSelected) {
                setLockWallpaper(imageSelected);
                f7.dialog.close();
              }
            },
          },
          {
            text: "Home and lock screens",
            cssClass: "prompt-button",
            onClick: () => {
              if (setHomeWallpaper && imageSelected && setLockWallpaper) {
                setHomeWallpaper(imageSelected);
                setLockWallpaper(imageSelected);
                f7.dialog.close();
              }
            },
          },
          {
            text: "Cancel",
            cssClass: "prompt-button",
            onClick: () => {
              f7.dialog.close();
            },
          },
        ],
        verticalButtons: true,
        animate: true,
        backdrop: true,
      })
      .open();
  };

  interface ImageSrc {
    src: string;
    openDialog?: boolean;
    setOpenDialog?: React.Dispatch<SetStateAction<boolean>>;
  }
  const ImageListItem: React.FC<ImageSrc> = ({ src, setOpenDialog }) => {
    const handleInputClick = () => {
      if (setOpenDialog) {
        setOpenDialog(true);
      }
      // const clickEvent = new MouseEvent("click");
      // if (fileInputRef.current) {
      //   return fileInputRef.current.dispatchEvent(clickEvent);
      // }
    };

    const handleMediaUpload = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const file = target.files[0];
        const compressionOptions: Options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        if (file) {
          try {
            const compressedFile = await ImageCompression(
              file,
              compressionOptions
            );
            const toDataURL = await ImageCompression.getDataUrlFromFile(
              compressedFile
            );
            if (compressedFile) {
              setDefaultWallpapers((prev) => [...prev, toDataURL]);
              setImageUploaded(!imageUploaded);
              const getUploadedImages =
                sessionStorage.getItem("uploadedImages");
              if (!getUploadedImages) {
                const toArray = JSON.stringify([toDataURL]);
                sessionStorage.setItem("uploadedImages", toArray);
              } else {
                const parsed = JSON.parse(getUploadedImages);
                parsed.push(toDataURL);
                const stringified = JSON.stringify(parsed);
                sessionStorage.setItem("uploadedImages", stringified);
              }
              return;
            }
          } catch (error) {
            console.log(error);
            return;
          }
        }
      }
    };

    if (src === "upload") {
      return (
        <Grid
          onClick={handleInputClick}
          item
          container
          xs={10}
          margin={"auto"}
          sx={{
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <input
            ref={fileInputRef}
            onInput={handleMediaUpload}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "400px",
              margin: "auto",
              height: "200px",
              backgroundSize: "cover",
              borderRadius: "100px",
              backgroundColor: !darkMode
                ? "white"
                : "rgba(200, 200, 200, 0.05)",
            }}
          >
            <svg
              width="46mm"
              height="46mm"
              viewBox="0 0 46 46"
              version="1.1"
              id="svg1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs id="defs1">
                <linearGradient id="linearGradient23">
                  <stop
                    offset="0.56999999"
                    id="stop23"
                    style={{ stopColor: "#00a7ff", stopOpacity: 1 }}
                  />
                  <stop
                    offset="0.57377559"
                    id="stop24"
                    style={{ stopColor: "#ff0000", stopOpacity: 1 }}
                  />
                </linearGradient>

                <linearGradient
                  id="linearGradient24"
                  x1=".89"
                  y1="4.9"
                  x2="1.0"
                  y2="1.8"
                  gradientTransform="matrix(20.88654,1e-2,8e-1,1.121,53,-2.5)"
                >
                  <stop
                    offset="0.57"
                    id="stop25"
                    style={{ stopColor: darkColor, stopOpacity: 1 }}
                  />
                  <stop
                    offset="0.57"
                    id="stop26"
                    style={{ stopColor: mainColor, stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <g id="layer1">
                <g
                  id="g26"
                  transform="matrix(0.99022541,0,0,0.98327273,-51.78209,-12.752268)"
                  style={{ strokeWidth: 1.01343 }}
                >
                  <g id="g25" style={{ strokeWidth: 1.01343 }}>
                    <g id="g32">
                      <g id="g6" style={{ strokeWidth: 1.01343 }}>
                        <g
                          id="g5"
                          transform="rotate(-8.1,69.86552,32.11329)"
                          style={{ strokeWidth: 1.01343 }}
                        >
                          <path
                            style={{
                              fill: "#f9f9f9",
                              stroke: "#000000",
                              strokeWidth: 0.275178,
                              strokeOpacity: 1,
                            }}
                            id="rect1"
                            width="30.838953"
                            height="33.51506"
                            x="54.286751"
                            y="16.693813"
                            transform="matrix(0.95247685,0,0,1,3.4719517,-1.3380537)"
                            d="m 55.874251,16.693813 h 27.663953 a 1.5875,1.5875 45 0 1 1.5875,1.5875 v 30.340061 a 1.5875,1.5875 135 0 1 -1.5875,1.5875 H 55.874251 a 1.5875,1.5875 45 0 1 -1.5875,-1.5875 l 0,-30.340061 a 1.5875,1.5875 135 0 1 1.5875,-1.5875 z"
                          />
                          <path
                            style={{
                              fill: darkColor,
                              fillOpacity: 1,
                              stroke: darkColor,
                              strokeWidth: 0.261041,
                              strokeOpacity: 1,
                            }}
                            id="rect2"
                            width="24.084967"
                            height="24.339832"
                            x="57.918613"
                            y="18.987617"
                            transform="matrix(1.0158766,0,0,1.0418848,-1.1107418,-2.1333466)"
                            d="m 58.44778,18.987617 h 23.026633 a 0.52916667,0.52916667 45 0 1 0.529167,0.529167 V 42.798283 A 0.52916667,0.52916667 135 0 1 81.474413,43.32745 H 58.44778 A 0.52916667,0.52916667 45 0 1 57.918613,42.798283 V 19.516784 a 0.52916667,0.52916667 135 0 1 0.529167,-0.529167 z"
                          />
                        </g>
                        <path
                          style={{
                            fill: "#f9f9f9",
                            stroke: "#000000",
                            strokeWidth: 0.275178,
                            strokeOpacity: 1,
                          }}
                          id="rect1-6"
                          width="30.838953"
                          height="33.51506"
                          x="54.286751"
                          y="16.693813"
                          transform="matrix(0.94616456,0.10947498,-0.11493715,0.99337277,19.900874,0.10906748)"
                          d="m 55.874251,16.693813 h 27.663953 a 1.5875,1.5875 45 0 1 1.5875,1.5875 v 30.340061 a 1.5875,1.5875 135 0 1 -1.5875,1.5875 H 55.874251 a 1.5875,1.5875 45 0 1 -1.5875,-1.5875 l 0,-30.340061 a 1.5875,1.5875 135 0 1 1.5875,-1.5875 z"
                        />
                        <path
                          style={{
                            fill: "url(#linearGradient24)",
                            fillOpacity: 1,
                            fillRule: "evenodd",
                            stroke: "#ffffff",
                            strokeWidth: 0.261042,
                            strokeDasharray: "none",
                            strokeOpacity: 0,
                          }}
                          id="rect2-2"
                          width="24.084967"
                          height="24.339832"
                          x="57.918613"
                          y="18.987617"
                          transform="matrix(1.0091441,0.11676196,-0.11975127,1.03498,15.43996,-1.2076766)"
                          d="M 58.712363,18.987617 H 81.20983 a 0.79375,0.79375 45 0 1 0.79375,0.79375 V 42.5337 a 0.79375,0.79375 135 0 1 -0.79375,0.79375 l -22.497467,0 a 0.79375,0.79375 45 0 1 -0.79375,-0.79375 l 0,-22.752333 a 0.79375,0.79375 135 0 1 0.79375,-0.79375 z"
                        />
                      </g>
                    </g>
                    <g id="g33">
                      <g id="g31">
                        <g id="g30">
                          <g id="g29">
                            <g id="g28">
                              <g id="g27">
                                <circle
                                  style={{
                                    fill: "#ffffff",
                                    fillOpacity: 1,
                                    stroke: "#000000",
                                    strokeWidth: 0.26856,
                                    strokeOpacity: 1,
                                  }}
                                  id="path6"
                                  cx="91.062431"
                                  cy="32.108475"
                                  r="2.3675005"
                                />
                                <path
                                  style={{
                                    fill: darkColor,
                                    fillOpacity: 1,
                                    stroke: "#ffffff",
                                    strokeWidth: 0.26856,
                                    strokeOpacity: 0,
                                  }}
                                  d="m 69.188315,46.154644 10.187737,-8.026347 a 0.4998183,0.4998183 8.4011335 0 1 0.718917,0.106175 l 3.898955,5.575502 a 0.49066389,0.49066389 7.8727389 0 0 0.712807,0.09857 l 2.6501,-2.168263 a 0.49634457,0.49634457 7.5437753 0 1 0.717766,0.09505 l 5.377967,7.505479 -0.103194,0.837939 -0.190289,0.438374 -0.03263,0.29981 -0.117375,0.998069 -0.05789,0.482593 -0.01196,0.08838 -0.04305,0.08746 c -0.0677,0.171202 -0.23749,0.275842 -0.220136,0.291717 l -0.183526,0.08407 -0.149068,0.0325 -0.106295,-0.0056 -0.249753,-0.02187 -0.02836,-0.0061 -0.153367,-0.02171 -0.395494,-0.05586 -0.354043,-0.04366 -0.598537,-0.06143 -2.621372,-0.302143 -1.837762,-0.212588 -1.890934,-0.222936 -1.895487,-0.216056 -1.550809,-0.176099 -1.014402,-0.117487 -1.001755,-0.118439 -1.02085,-0.128672 -1.52547,-0.177952 -1.439019,-0.15365 -0.654256,-0.07714 -0.602174,-0.06994 -0.520285,-0.06578 -0.903914,-0.09862 -2.541287,-0.330881 -0.305581,-0.209196 c -0.0068,-0.02543 -0.223511,-0.272285 -0.148619,-0.636349 l 0.182712,-1.725057 -0.0036,-1.301837 z"
                                  id="path7"
                                />
                                <path
                                  style={{
                                    opacity: 1,
                                    fill: darkColor,
                                    fillOpacity: 1,
                                    stroke: "#555555",
                                    strokeWidth: 0.26856,
                                    strokeOpacity: 0,
                                  }}
                                  d="m 69.357006,45.862832 -0.292489,0.232545"
                                  id="path8"
                                />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <p
            style={{
              textAlign: "center",
              width: "100%",
              marginBottom: "-15px",
            }}
          >
            My photos
          </p>
        </Grid>
      );
    }

    return (
      <Grid
        item
        container
        xs={5}
        margin={"auto -.9rem"}
        onClick={() => setImageSelected && setImageSelected(src)}
      >
        {homeWallpaper === src ? (
          <div
            style={{
              width: "200px",
              height: "200px",
              background: `url(${src})`,
              backgroundSize: "cover",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "21px",
              margin: "auto",
            }}
          >
            <Grid
              style={{
                width: "200px",
                height: "200px",
                display: "flex",
                border: "solid 3px" + mainColor,
                backgroundColor: `${mainColor}${Math.round(0.3 * 255).toString(
                  16
                )}`,
                borderRadius: "21px",
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
          </div>
        ) : (
          <div
            style={{
              width: "200px",
              height: "200px",
              margin: "auto",
              background: `url(${src})`,
              backgroundSize: "cover",
              borderRadius: "21px",
            }}
          />
        )}
      </Grid>
    );
  };

  return (
    <Grid
      item
      container
      id="wallpaper-settings"
      xs={8}
      columns={12}
      style={{
        zIndex: "1",
        backgroundColor: backgroundColor,
        overflow: "hidden",
        paddingBottom: "2rem",
      }}
    >
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setInputFrom("");
        }}
      >
        <Button onClick={() => setInputFrom("URL")}>From a URL</Button>
        {inputFrom === "URL" && (
          <Grid container item margin={"auto"} justifyContent={"center"}>
            <TextField
              placeholder="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
              type="url"
              sx={{
                fontSize: "40px",
                minHeight: "40px",
                border: "12px",
                margin: "auto",
                width: "90%",
              }}
            />
            <Button>Confirm</Button>
            <Button onClick={() => setInputFrom("")}>Cancel</Button>
          </Grid>
        )}
        {inputFrom !== "URL" && <Button>From Device</Button>}
      </Dialog>
      {/* Wallpaper change photo gallery */}
      {history[0] === "change-wallpaper" && (
        <Grid
          id="wallpaper-change"
          ref={wallpaperChangeRef}
          style={{
            backgroundColor: backgroundColor,
          }}
          className={
            history[0] === "change-wallpaper"
              ? "page-open"
              : history.length === 1 &&
                wallpaperChangeRef.current?.className === "page-open"
              ? "page-close"
              : ""
          }
          item
          container
          justifyContent={"center"}
          xs={8}
          rowGap={4}
        >
          <ArrowBack
            onClick={(e) => handlePreviousDragEnd(e, "backarrowclick")}
            sx={{
              fontSize: 30,
              fill: darkMode ? "white" : "graytext",
              marginRight: "1rem",
              ":hover": {
                cursor: "pointer",
              },
              position: "absolute",
              top: "1.5%",
              left: 0,
            }}
          />
          <ImageListItem
            src={"upload"}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
          {defaultWallpapers.map((image, index: number) => {
            return <ImageListItem src={image} key={index} />;
          })}
        </Grid>
      )}

      {/* END // Wallpaper change photo galler */}

      {history[1] === "wallpaper-preview" && (
        <Grid
          id="wallpaper-preview"
          ref={wallpaperPreviewRef}
          style={{
            backgroundColor: backgroundColor,
          }}
          className={
            history[1] === "wallpaper-preview"
              ? "page-open"
              : history.length === 2 &&
                wallpaperPreviewRef.current?.className === "page-open"
              ? "page-close"
              : ""
          }
          item
          container
          xs={8}
        >
          <Grid
            xs={12}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            height={"3rem"}
          >
            <ArrowBack
              onClick={(e) => handlePreviousDragEnd(e, "backarrowclick")}
              sx={{
                fontSize: 30,
                fill: darkMode ? "white" : "graytext",
                marginRight: "1rem",
                ":hover": {
                  cursor: "pointer",
                },
              }}
            />
            <p>Preview</p>
          </Grid>
          <Grid
            item
            container
            xs={10}
            margin={"-1rem auto 0 auto  "}
            justifyContent={"center"}
            height={"fit-content"}
          >
            {previewType === "home" ? (
              <img
                src={imageSelected}
                style={{
                  width: "90%",
                  borderRadius: "6px",
                  height: "300px",
                  margin: "0 auto .5rem auto",
                }}
              />
            ) : (
              <HubDigitalClock template={true} preview={imageSelected} />
            )}
          </Grid>
          <Grid
            item
            container
            xs={10}
            margin={"0 auto auto auto"}
            justifyContent={"space-around"}
          >
            <Button
              style={{ width: "40%" }}
              fillMd={previewType === "home" ? true : false}
              onClick={() => setPreviewType("home")}
            >
              Home screen
            </Button>
            <Button
              style={{ width: "40%" }}
              fillMd={previewType === "lock" ? true : false}
              onClick={() => setPreviewType("lock")}
            >
              Lock screen
            </Button>
          </Grid>
          <Grid
            item
            container
            xs={10}
            margin={"0 auto auto auto"}
            justifyContent={"flex-end"}
          >
            <Button onClick={openVerticalButtons}>
              <Check />
            </Button>
          </Grid>
        </Grid>
      )}

      <Grid xs={10} item sx={{ margin: " 6rem auto 3rem auto" }}>
        <p style={{ fontSize: "30px", margin: "auto" }}>Wallpaper & style</p>
      </Grid>
      <Grid item container xs={12}>
        <Grid
          item
          container
          xs={9}
          justifyContent={"center"}
          alignItems={"center"}
          margin={"auto"}
          paddingTop={"15px"}
          sx={{
            bgcolor: !darkMode ? "white" : "rgba(200,200,200,0.05)",
            borderRadius: "18px",
          }}
        >
          <img
            src={homeWallpaper as string}
            style={{
              width: "2.04in",
              height: "1.34in",
              margin: "auto 7px auto auto",
              borderRadius: "15px",
            }}
          />
          <Grid
            style={{
              width: "2.04in",
              height: "1.34in",
              margin: "auto auto auto 7px",
              borderRadius: "15px",
            }}
          >
            <HubDigitalClock template={true} />
          </Grid>
          <Grid
            item
            container
            xs={9}
            alignItems={"center"}
            height={"fit-content"}
          >
            <Button
              largeMd
              type="button"
              onClick={() => {
                setHistory((prev) => [...prev, "change-wallpaper"]);
              }}
              style={{
                margin: ".5rem 0 0 0",
                width: "100%",
              }}
            >
              <WallpaperOutlined
                sx={{ fontSize: 20, margin: "auto .5rem" }}
              ></WallpaperOutlined>
              Change Wallpaper
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={9}
          style={{
            width: "100%",
            margin: "1rem auto 2rem auto ",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={5.5}>
            <MUIButton
              disableElevation
              onClick={() => setThemeType("dynamic")}
              variant={themeType === "dynamic" ? "contained" : "outlined"}
              sx={{ height: "3rem", borderRadius: "12px" }}
            >
              Wallpaper colors
            </MUIButton>
          </Grid>
          <Grid item xs={5.5}>
            <MUIButton
              onClick={() => setThemeType("basic")}
              variant={themeType === "basic" ? "contained" : "outlined"}
              disableElevation
              sx={{ height: "3rem", borderRadius: "12px" }}
            >
              Basic
            </MUIButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={11}
        id="piechart-container"
        wrap="nowrap"
        style={{
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingBottom: "1rem",
          margin: "auto",
          overflowY: "auto",
        }}
      >
        {themeType === "dynamic" ? (
          <Grid
            xs={10}
            item
            container
            justifyContent={"space-between"}
            wrap="nowrap"
            sx={{
              overflowY: "auto",
              gap: "20px",
              width: "fit-content",
              padding: "0 6px 6px 6px",
            }}
          >
            {colorPalette?.colors.map((color, index) => {
              if (index > 0 && index % 2 === 0) {
                return (
                  <PieChart
                    key={index + color}
                    defaultSelected={
                      index <= 2 && colorPalette.colors[index - 2] === mainColor
                        ? true
                        : false
                    }
                    color2={color}
                    color1={colorPalette.colors[index - 1]}
                    color3={colorPalette.colors[index - 2]}
                  />
                );
              }
            })}
          </Grid>
        ) : (
          <Grid xs={10} item container justifyContent={"space-between"}>
            <PieChart key="basic1" combination="basic1" />
            <PieChart key="basic2" combination="basic2" />
            <PieChart key="basic3" combination="basic3" />
            <PieChart key="basic4" combination="basic4" />
            <PieChart key="basic5" combination="basic5" />
            <PieChart key="basic6" combination="basic6" />
          </Grid>
        )}
      </Grid>
      <Grid container item xs={10} sx={{ margin: "auto" }}>
        <List style={{ width: "100%", margin: "1rem auto -1rem auto" }}>
          <ListItem>
            <span>Dark theme</span>
            <Toggle
              defaultChecked={darkMode}
              bgColor={mainColor}
              color={mainColor}
              colorTheme={mainColor}
              onToggleChange={(e) => {
                if (setDarkMode) {
                  setDarkMode(e);
                  sessionStorage.setItem("darkTheme", e ? "true" : "false");
                }
              }}
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default WallpaperSettings;
