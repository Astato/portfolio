import { Grid } from "@mui/material";
import React, {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DarkModeContext } from "./Wrapper";
import photosIcon from "../assets/icons/Google_Photos_icon.svg";
import calculatorIcon from "../assets/icons/calc-icon.webp";
import calendarIcon from "../assets/icons/Google_Calendar_icon.svg.png";
import dynagraphIcon from "../assets/icons/icon-dynagraph-2.png";
import { f7 } from "framework7-react";
import { Settings } from "@mui/icons-material";
////falta touch end and touch start or touchmove for device compatibility ////////////

interface IconProps {
  name: string;
  style: React.CSSProperties;
  onClick: () => void;
  draggable: boolean;
  id: string;
  children?: ReactNode;
}

const IconComponent: React.FC<IconProps> = ({
  style,
  onClick,
  draggable,
  id,
  children,
}) => {
  return (
    <div
      onClick={onClick}
      style={style}
      id={id}
      draggable={draggable}
      className="drawer-icons"
    >
      {children || null}
    </div>
  );
};

const AppDrawer: React.FC = () => {
  const [initialYPos, setInitialYPos] = useState<number>(0);
  const [finalYPos, setFinalYPos] = useState<number>(0);
  const [dragTime, setDragTime] = useState<number>(0);
  const drawerRef = useRef<HTMLDivElement>(null);
  const appContext = useContext(DarkModeContext);
  const show = appContext?.openAppDrawer;
  const setShow = appContext?.setOpenAppDrawer;
  const setNewItem = appContext?.setNewItem;
  const darkMode = appContext?.darkMode;
  const newItem = appContext?.newItem;
  const [drawerIcons, setDrawercons] = useState<ReactElement[]>([]);

  const handleDrawerDragStart = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    if (target.id !== "app-drawer") {
      return;
    }
    const img = new Image();
    img.src = "";
    e.dataTransfer?.setData("text/plain", "This text will be transferred.");
    e.dataTransfer?.setDragImage(img, 10, 10);
    setInitialYPos(e.pageY);
  };

  const handleDrawerDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    target.style.opacity = "1";

    if (target.id !== "app-drawer") {
      return;
    }
    setFinalYPos(e.pageY);
    if (initialYPos < finalYPos && setShow) {
      setShow("false");
    }
  };

  const handleIconDrag = (e: React.DragEvent, index: number) => {
    const target = e.target as HTMLDivElement;
    target.style.opacity = "0";
    if (e.timeStamp >= dragTime + 600 && setNewItem && setShow) {
      const item = drawerIcons[index] || null;
      setNewItem(item);
      return setShow("false");
    } else {
      return;
    }
  };

  const handleIconDragStart = async (e: React.DragEvent) => {
    setDragTime(e.timeStamp);
  };

  const handleIconClick = (targetApp: string) => {
    f7.views.current.router.navigate(targetApp);
    setShow && setShow("false");
  };

  const icons = [
    <IconComponent
      onClick={() => handleIconClick("/calendar/")}
      name={"calendar-drawer"}
      id={"calendar-drawer"}
      style={{ backgroundImage: `url(${calendarIcon})`, backgroundSize: "68%" }}
      draggable={true}
    />,
    <IconComponent
      onClick={() => handleIconClick("/calculator/")}
      name={"calculator-drawer"}
      id={"calculator-drawer"}
      style={{
        backgroundImage: `url(${calculatorIcon})`,
        backgroundSize: "cover",
      }}
      draggable={true}
    ></IconComponent>,
    <IconComponent
      onClick={() => handleIconClick("/dynagraph/")}
      name={"dynagraph-drawer"}
      id={"dynagraph-drawer"}
      style={{
        backgroundImage: `url(${dynagraphIcon})`,
      }}
      draggable={true}
    ></IconComponent>,
    <IconComponent
      onClick={() => handleIconClick("/photos/")}
      name={"photos-drawer"}
      style={{ backgroundImage: `url(${photosIcon})` }}
      id={"photos-drawer"}
      draggable={true}
    />,

    <IconComponent
      onClick={() => handleIconClick("/settings/")}
      name={"settings-shortcut-drawer"}
      id="settings-shortcut-drawer"
      style={{ background: "#4289f7", display: "flex" }}
      draggable={true}
    >
      <Settings style={{ fill: "white", fontSize: 45, margin: "auto" }} />
    </IconComponent>,
  ];

  useEffect(() => {
    if (drawerIcons.length === 0) {
      setDrawercons(icons);
    }
  }, [newItem]);

  return (
    <Grid
      id="app-drawer"
      ref={drawerRef}
      xs={9.5}
      item
      container
      className={
        show === "true" ? "drawer-up" : show === "false" ? "drawer-down" : ""
      }
      onDragStart={handleDrawerDragStart}
      onDragEnd={handleDrawerDragEnd}
      draggable={"true"}
      style={{
        userSelect: "none",
        background: darkMode ? "rgb(25,25,25)" : "white",
      }}
    >
      {drawerIcons.map((icon: ReactElement, index) => {
        const addIndex = React.cloneElement(icon, {
          index: index,
        });
        return (
          <div
            key={index}
            style={{ height: "70px", margin: "auto" }}
            onDrag={(e) => handleIconDrag(e, index)}
            onDragStart={handleIconDragStart}
            // onMouseDown={handleIconDragStart}
          >
            {addIndex}
          </div>
        );
      })}
    </Grid>
  );
};

export default AppDrawer;
