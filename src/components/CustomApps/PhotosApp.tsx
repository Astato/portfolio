/// <reference types="vite-plugin-svgr/client" />
import { useTheme } from "@emotion/react";
import { Grid } from "@mui/material";
import { Toolbar, Tab, Link, Tabs, Page } from "framework7-react";
import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import wallpaper1 from "/assets/pexels-brady-knoll-5409751.jpg";
import wallpaper2 from "/assets/pexels-eberhard-grossgasteiger-572897.jpg";
import wallpaper3 from "/assets/pexels-frans-van-heerden-624015.jpg";
import wallpaper4 from "/assets/pexels-jacub-gomez-1142950.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import "react-clock/dist/Clock.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import { Close } from "@mui/icons-material";

interface Prop {
  src: string;
  setOpenImage?: React.Dispatch<SetStateAction<number>>;
  index?: number;
  openImage?: number;
}
const ImageItem: React.FC<Prop> = ({ src, setOpenImage, index, openImage }) => {
  const [state, setState] = useState<any>("");
  let resizing = false;
  const resizeFile = (
    blob: Blob,
    sizew: number,
    sizeh: number,
    compress: number
  ) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        blob,
        sizew,
        sizeh,
        "JPEG",
        compress,
        0,
        (uri) => {
          resolve(uri);
          setState(uri);
          resizing = false;
          console.log("CALL");
        },
        "base64"
      );
    });

  const onLoad = async () => {
    if (!state && !resizing) {
      resizing = true;
      const file = await fetch(src).then((res) => res.blob());
      if (!openImage) {
        await resizeFile(file, 144, 144, 50);
      } else {
        await resizeFile(file, 1600, 800, 100);
      }
      return;
    }
  };

  useEffect(() => {
    if (src && !state && !resizing) {
      onLoad();
    }
  }, []);

  if (!openImage) {
    return (
      <Grid
        item
        width={"calc(100% / 6.33)"}
        onClick={() => {
          setOpenImage && index && setOpenImage(index);
        }}
      >
        <div
          style={{
            backgroundImage: `url(${state})`,
            width: "144px",
            height: "144px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Grid>
    );
  } else {
    return (
      <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
        <img src={state} height={"100%"} />
      </SwiperSlide>
    );
  }
};

interface SwiperWrapperProps {
  children: ReactNode;
  openedImage?: number;
  albumItem?: boolean;
  collapsed?: boolean;
  setCollapsed?: React.Dispatch<SetStateAction<boolean>>;
}

// const [state, setState] = useState<string>("collapsed")
const SwiperWrapper: React.FC<SwiperWrapperProps> = ({
  children,
  openedImage,
  albumItem,
  collapsed,
  setCollapsed,
}) => (
  <Swiper
    grabCursor={true}
    slidesPerView={1}
    id={
      albumItem && collapsed
        ? "collapsed-album"
        : albumItem && !collapsed
        ? "expand-album"
        : ""
    }
    onClick={(e: any) => {
      if (albumItem && collapsed) {
        e.el.id = "expand-album";
        setCollapsed && setCollapsed(false);
      }
    }}
    allowTouchMove
    slidesPerGroup={1}
    direction={"horizontal"}
    allowSlideNext={collapsed && albumItem ? false : true}
    allowSlidePrev={collapsed && albumItem ? false : true}
    initialSlide={openedImage ? openedImage - 1 : 0}
    style={{
      width: !albumItem ? "calc(100% - 2px)" : "",
      height: !albumItem ? "100%" : "",
      userSelect: "none",
    }}
    speed={500}
  >
    {children}
  </Swiper>
);

const AlbumItem = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <SwiperWrapper
      albumItem={true}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
    >
      {!collapsed && (
        <Close
          onClick={() => {
            setCollapsed(true);
          }}
          id="close-icon"
          sx={{
            fill: "white",
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: 30,
            zIndex: "99999",
            ":hover": {
              cursor: "pointer",
            },
          }}
        />
      )}
      <SwiperSlide
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <div
          style={{
            backgroundImage: `url(${wallpaper1})`,
            height: "100%",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </SwiperSlide>
      <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            backgroundImage: `url(${wallpaper2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
          }}
        />
      </SwiperSlide>
      <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            backgroundImage: `url(${wallpaper3})`,
            height: "100%",
            width: "100%",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </SwiperSlide>
    </SwiperWrapper>
  );
};

const PhotosApp = () => {
  const theme = useTheme() as import("@mui/material").Theme;
  const backgroundColor = theme.palette.background.default;
  const [openImage, setOpenImage] = useState<number>(0);
  const [tabClass, setTabClass] = useState<string>("");

  const photos = [
    <ImageItem
      src={wallpaper1}
      setOpenImage={setOpenImage}
      index={1}
      openImage={openImage}
      key={1}
    />,
    <ImageItem
      src={wallpaper2}
      setOpenImage={setOpenImage}
      index={2}
      openImage={openImage}
      key={2}
    />,
    <ImageItem
      src={wallpaper3}
      setOpenImage={setOpenImage}
      index={3}
      key={3}
      openImage={openImage}
    />,
    <ImageItem
      src={wallpaper4}
      setOpenImage={setOpenImage}
      index={4}
      key={4}
      openImage={openImage}
    />,
  ];

  return (
    <Grid container item columns={12} sx={{ height: "100%" }}>
      <Page
        pageContent={false}
        style={{ backgroundColor: backgroundColor }}
        onPageMounted={() => setTabClass("tab tab-link-active")}
      >
        <Grid
          sx={{
            height: "calc(100% - 85px)",
          }}
          xs={12}
        >
          <Tabs animated style={{ marginTop: "25px" }}>
            <Tab id="albums-tab">
              <AlbumItem />
            </Tab>
            <Tab id="photos-tab" onTabHide={() => setOpenImage(0)}>
              <Grid
                container
                item
                alignItems={"center"}
                height={"100%"}
                rowGap={0.5}
                maxWidth={"100%"}
                marginLeft={"1px"}
                alignContent={"flex-start"}
                sx={{
                  overflowY: "scroll",
                  paddingBottom: "20px",
                }}
                gap={1}
                id="photo-app-items-container"
              >
                {!openImage ? (
                  photos
                ) : (
                  <SwiperWrapper openedImage={openImage}>
                    <Close
                      onClick={() => setOpenImage(0)}
                      id="close-icon"
                      sx={{
                        fill: "white",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        fontSize: 30,
                        zIndex: "99999",
                        ":hover": {
                          cursor: "pointer",
                        },
                      }}
                    />
                    {photos.map((photo) => {
                      return <SwiperSlide>{photo}</SwiperSlide>;
                    })}
                  </SwiperWrapper>
                )}
              </Grid>
            </Tab>
          </Tabs>
        </Grid>
        <Toolbar
          position="bottom"
          tabbar
          style={{ height: "60px", backgroundColor: backgroundColor }}
        >
          <Link tabLink="#albums-tab" className={tabClass}>
            Albums
          </Link>
          <Link tabLink="#photos-tab" className="link tab-link">
            Photos
          </Link>
        </Toolbar>
      </Page>
    </Grid>
  );
};

export default PhotosApp;
