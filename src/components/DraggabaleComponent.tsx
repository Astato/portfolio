import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useEffect, memo } from "react";
import Box from "./DraggableBox";
import type { DragSourceMonitor } from "react-dnd";
import { BoxesProps } from "./Screen";

interface BoxMap {
  [key: string]: { top: number; left: number };
}

interface DraggableBoxProps {
  id: string;
  children: React.ReactNode;
  left: number;
  top: number;
  draggingItem: string;
  elementToPush: React.MutableRefObject<string>;
  setDraggingItem: React.Dispatch<React.SetStateAction<string>>;
  boxes: BoxMap;
  setChildren: React.Dispatch<React.SetStateAction<BoxesProps>>;
  setBoxes: React.Dispatch<React.SetStateAction<BoxMap>>;
}

let direction = "up";

function getStyles(
  left: number,
  top: number,
  isDragging: boolean
): React.CSSProperties {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    borderRadius: "100%",
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    // opacity: isDragging ? 0 : 1,
    display: isDragging ? "none" : "flex",
    // height: isDragging ? 1 : "",
  };
}

const DraggableComponent: React.FC<DraggableBoxProps> = memo(
  function DraggableBox(props) {
    let {
      id,
      left,
      top,
      children,
      draggingItem,
      setDraggingItem,
      elementToPush,
      boxes,
      setBoxes,
    } = props;
    const [{ isDragging }, drag, preview] = useDrag(
      () => ({
        type: "box",
        item: { id, left, top },
        collect: (monitor: DragSourceMonitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [id, left, top]
    );

    useEffect(() => {
      if (isDragging) {
        setDraggingItem(id);
      } else {
        setDraggingItem("");
        elementToPush.current = "";
      }
    }, [isDragging]);

    useEffect(() => {
      preview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    function getDirection(e: React.MouseEvent, elementToPush: string) {
      const container = document.querySelector(
        `div#${elementToPush}`
      ) as HTMLDivElement;
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const topBoundary = rect.top;
      const bottomBoundary = rect.bottom;
      const leftBoundary = rect.left;
      const rightBoundary = rect.right;

      if (mouseX + 2 >= rightBoundary) {
        direction = "right";
      }
      if (mouseX - 2 <= leftBoundary) {
        direction = "left";
      }
      if (mouseY <= topBoundary) {
        direction = "up";
      }
      if (mouseY >= bottomBoundary - 2) {
        direction = "down";
      }
      pushElement(id);
    }

    function pushElement(elementToPush: string) {
      if (draggingItem && elementToPush) {
        const dTop = boxes[elementToPush].top;
        const dLeft = boxes[elementToPush].left;

        if (elementToPush) {
          /// prevent from going off the screen MISSING LEFT AND RIUGHTR and sub screen 2
          // if (dTop + 75 > 384 && direction === "up") {
          //   direction = "down";
          // }
          // if (dTop - 75 <= -38 && direction === "down") {
          //   direction = "up";
          // }
          // if (dLeft + 75 >= 800 && direction === "left") {
          //   direction = "right";
          // }
          // if (dLeft - 75 <= -60 && direction === "right") {
          //   direction = "left";
          // }

          function checkOverlap(
            direction: string,
            moveinPx: number,
            array: string[]
          ) {
            if (array.length >= 4) {
              return checkOverlap("up", (moveinPx += 75), ["up"]);
            }
            const tryMoveDirection =
              direction === "up"
                ? dTop + moveinPx
                : direction === "down"
                ? dTop - moveinPx
                : direction === "left"
                ? dLeft + moveinPx
                : dLeft - moveinPx;

            /* Area boundaries check */
            if (tryMoveDirection >= 384 && direction === "up") {
              return checkOverlap("down", moveinPx, [...array, "down"]);
            }
            if (tryMoveDirection >= 800 && direction === "left") {
              return checkOverlap("right", moveinPx, [...array, "right"]);
            }
            if (tryMoveDirection <= -38 && direction === "down") {
              return checkOverlap("up", moveinPx, [...array, "up"]);
            }
            if (tryMoveDirection <= 3 - 60 && direction === "right") {
              return checkOverlap("left", moveinPx, [...array, "left"]);
            }

            for (const key of Object.keys(boxes)) {
              if (direction === "up" || direction === "down") {
                if (
                  tryMoveDirection - boxes[key].top <= 80 ||
                  tryMoveDirection === boxes[key].top
                ) {
                  if (!array.includes("down")) {
                    checkOverlap("down", moveinPx, [...array, "down"]);
                  } else if (!array.includes("up")) {
                    checkOverlap("up", moveinPx, [...array, "up"]);
                  }
                }
              } else if (direction === "left" || "right") {
                if (
                  tryMoveDirection - boxes[key].left <= 80 ||
                  tryMoveDirection === boxes[key].left
                ) {
                  if (!array.includes("left")) {
                    return checkOverlap("left", moveinPx, [...array, "left"]);
                  } else if (!array.includes("right")) {
                    return checkOverlap("right", moveinPx, [...array, "right"]);
                  }
                }
              }
            }
            return [direction, tryMoveDirection];
          }

          const pushValues = checkOverlap(direction, 75, [direction]);
          const moveinPx = pushValues[1];
          const confirmedDirection = pushValues[0];
          setBoxes((prev) => {
            const updateBox = {
              top:
                confirmedDirection === "down" || confirmedDirection === "up"
                  ? +moveinPx
                  : +dTop,
              left:
                confirmedDirection === "left" || confirmedDirection === "right"
                  ? +moveinPx
                  : dLeft,
            };
            return {
              ...prev,
              [elementToPush]: updateBox,
            };
          });
          return (direction = "up");
        }
      }
    }

    return (
      <div
        ref={drag}
        className="swiper-no-swiping"
        style={getStyles(left, top, isDragging)}
        role="DraggableBox"
        id={id}
        key={id}
        onMouseEnter={(e) => {
          if (draggingItem !== id && draggingItem) {
            getDirection(e, id);
          }
        }}
        onMouseOver={() => {
          {
            if (draggingItem && id !== draggingItem) {
              elementToPush.current = id;
            } else {
              elementToPush.current = "";
            }
          }
        }}
        onMouseLeave={() => (elementToPush.current = "")}
      >
        {id === "photos" && !sessionStorage.getItem("animation-played") && (
          <div
            onAnimationEnd={() =>
              sessionStorage.setItem("animation-played", "true")
            }
            id="attention-seeker"
            style={{
              background: "var(--f7-tooltip-bg-color)",
              position: "absolute",
              top: "-35px",
              left: "-7px",
              padding: "3px 6px",
              color: "white",
              borderRadius: "10px",
            }}
          >
            Projects
            <div
              style={{
                height: "20px",
                width: "20px",
                borderRadius: "100px 100px 1px 100px",
                position: "absolute",
                transform: "rotateZ(45deg)",
                left: "calc(50% - 11px)",
                background: "var(--f7-tooltip-bg-color)",
                zIndex: "-1",
                top: "10px",
              }}
            />
          </div>
        )}
        <Box children={children} preview={true} />
      </div>
    );
  }
);

export default DraggableComponent;
