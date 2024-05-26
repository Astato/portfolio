import { Swiper } from "swiper/react";
import { Parallax } from "swiper/modules";
import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  SetStateAction,
  isValidElement,
} from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import { DarkModeContext } from "./Wrapper";

interface SwiperWrapperProps {
  children: React.ReactNode;
  modules: (typeof Parallax)[];
  openAppDrawer: string;
  setOpenAppDrawer: React.Dispatch<SetStateAction<string>>;
}

const SwiperWrapper: React.FC<SwiperWrapperProps> = ({
  children,
  modules,
  openAppDrawer,
  setOpenAppDrawer,
}) => {
  const [showContextMenu, setShowContextMenu] = useState<[number, number]>([]);
  const appContext = useContext(DarkModeContext);
  const currentSlide = appContext?.currentSlide;
  const setCurrentSlide = appContext?.setCurrentSlide;
  const openNotificationBar = appContext?.openNotificationBar;
  const setOpenNotificationBar = appContext?.setOpenNotificationBar;
  const setSwiperRef = appContext?.setSwiperRef;
  const swiperRef = useRef<Swiper>(null);

  let timeout: ReturnType<typeof setTimeout> | undefined;

  const handleMouseDown = (e: any) => {
    if (!showContextMenu[0]) {
      timeout = window.setTimeout(() => {
        console.log("TRUE");
        setShowContextMenu([e.touches.currentX, e.touches.currentY]);
      }, 800);
      return () => window.clearTimeout(timeout);
    } else {
      setShowContextMenu([]);
    }
  };

  const handleMouseMove = (e: any) => {
    window.clearTimeout(timeout);
    const startY = e.touches.startY;
    const endY = e.touches.currentY;
    const startX = e.touches.startX;
    const endX = e.touches.currentX;
    const movementX =
      ///movement left or movement right,
      startX - endX < -50 ? (startX - endX) * -1 : startX - endX;
    /// startYY - 3 checks for double clicks the touchmove runs in short burst so
    // the margin between startY and endY is very small.
    ///this one checks movement bottom up or a slide up
    if (startY - 3 > endY && movementX <= 50) {
      setOpenNotificationBar(""); /// prevent notificaiton bar of triggering  on state change
      setOpenAppDrawer("true");
      return;
    } else if (startY + 3 < endY && movementX <= 50) {
      setOpenAppDrawer(""); /// prevent setMouseY of triggering  on state change
      setOpenNotificationBar("true");
      return;
    } else {
      if (openAppDrawer === "" || openNotificationBar === "") {
        return;
      } else {
        setOpenNotificationBar("false");
        return setOpenAppDrawer("false");
      }
    }
  };

  useEffect(() => {
    console.log(setSwiperRef, "SET SWIPER");
    if (setSwiperRef) {
      setSwiperRef(swiperRef);
    }
  }, [setSwiperRef]);

  useEffect(() => {
    ///// NEEDS FIX AFTER ADDING FRAMEWORK7
    /// on change of slides, setMouseMOve to "" so AppDrawer component doesn't trigger class change also
    // allows user to open the app draweer from any slide.
    // so on slide change, AppDrawer is classless, the currentSlide is being tracked in Swiper component on slideChangeTransitionEnd
    if (openAppDrawer !== "" || openNotificationBar !== "") {
      setOpenAppDrawer("");
      setOpenNotificationBar("");
    }
  }, [currentSlide]);

  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      modules={modules}
      grabCursor={true}
      allowSlideNext={true}
      slidesPerView={1}
      slidesPerGroup={1}
      onSlideChangeTransitionEnd={(e) => {
        // sessionStorage.setItem("currentSlide", e.activeIndex.toString());
        setCurrentSlide(e.activeIndex);
      }}
      parallax={true}
      initialSlide={currentSlide}
      style={{
        width: "100%",
        height: "100%",
      }}
      noSwiping={true}
      onTouchEnd={handleMouseMove}
      onTouchStart={(e) => handleMouseDown(e)}
      onTouchMove={() => window.clearTimeout(timeout)}
      speed={500}
    >
      {children}
    </Swiper>
  );
};

export default SwiperWrapper;
