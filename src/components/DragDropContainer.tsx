import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactElement,
} from "react";
import update from "immutability-helper";
import { useDrop } from "react-dnd";

import DraggableComponent from "./DraggabaleComponent";
import { BoxesProps } from "./Screen";
const stylesBox: React.CSSProperties = {
  // width: "100%",
  // height: "100%",
  // border: "1px solid black",
  // position: "relative",
  // backgroundColor: "transparent",
  // display: "grid",
  // gridTemplateColumns: "repeat(12, auto)",
};

interface ContainerProps {
  isSnapToGrid: boolean;
  children: React.ReactNode;
  setChildren: React.Dispatch<React.SetStateAction<BoxesProps>>;
  currentContainer: string;
  id: string;
  newItemDrag: string;
}

interface BoxMap {
  [key: string]: { top: number; left: number };
}

interface DragItem {
  id: string;
  type: string;
  left: number;
  top: number;
}

interface ChildProps {
  top: number;
  left: number;
  name: string;
}

function snapToGrid(x: number, y: number): [number, number] {
  const snappedX = Math.round(x / 1) * 1;
  const snappedY = Math.round(y / 48) * 48;
  return [snappedX, snappedY];
}

const DragDropContainer: React.FC<ContainerProps> = ({
  children,
  isSnapToGrid,
  setChildren,
  currentContainer,
  id,
  newItemDrag,
}) => {
  // b: { top: 10, left: 20, title: "Drag me too" },
  const [boxes, setBoxes] = useState<BoxMap>({});
  const [draggingItem, setDraggingItem] = useState(newItemDrag || "");
  const elementToPush = useRef("");
  useEffect(() => {
    if (children instanceof Array) {
      const newBoxes = {};
      children.forEach((child) => {
        Object.assign(newBoxes, {
          [child.props.name]: { top: child.props.top, left: child.props.left },
        });
        return {
          ...newBoxes,
        };
      });
      setBoxes(newBoxes);
    }
  }, [children]);

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes((boxes) => {
        if (boxes[id]) {
          return update(boxes, {
            [id]: {
              $merge: { left, top },
            },
          });
        } else {
          //// moves element from one container to another (i.e from sub-screen1 to sub-screen2)
          if (Array.isArray(children)) {
            setChildren((prevChildren) => {
              const newChildren: any = { ...prevChildren };
              Object.keys(newChildren).forEach((key) => {
                if (key !== currentContainer) {
                  newChildren[key].forEach((child: any, index: number) => {
                    if (child.props.name === id) {
                      const updateChild = React.cloneElement(child, {
                        top: top,
                        left:
                          /// this was a calculation when both sub-screens where on the same
                          /// slider, now is not necessaty (i think), further testing required
                          currentContainer === "sub-screen1"
                            ? left + 550
                            : left - 550,
                      });

                      newChildren[currentContainer].push(updateChild);
                      newChildren[key].splice(index, 1);
                    }
                  });
                }
              });
              return newChildren;
            });
          }

          return {
            ...boxes,
            [id]: { left, top },
          };
        }
      });
    },
    [boxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "box",
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number;
          y: number;
        };

        if (elementToPush.current) {
          elementToPush.current = "";
          return;
        }

        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);

        if (isSnapToGrid) {
          [left, top] = snapToGrid(left, top);
          snapToGrid(left, top);
        }
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );

  return (
    <div ref={drop} style={stylesBox} id={id} className="drop-container">
      {Object.keys(boxes).map((key: string, index: number) => (
        <DraggableComponent
          key={key}
          id={key}
          draggingItem={draggingItem}
          setDraggingItem={setDraggingItem}
          boxes={boxes}
          setBoxes={setBoxes}
          setChildren={setChildren}
          elementToPush={elementToPush}
          // setElementToPush={setElementToPush}
          {...(boxes[key] as {
            top: number;
            left: number;
          })}
        >
          {children instanceof Array && children[index]}
        </DraggableComponent>
      ))}
    </div>
  );
};

export default DragDropContainer;
