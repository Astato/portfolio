import {
  useRef,
  type CSSProperties,
  type FC,
  useEffect,
  useState,
} from "react";
import type { XYCoord } from "react-dnd";
import { useDragLayer } from "react-dnd";

import { ComponentDragPreview } from "./ComponentDragPreview";
// import { ItemTypes } from "./ItemTypes";
// import { snapToGrid } from "./snapToGrid";

const layerStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

const layerStyles2: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function snapToGrid(x: number, y: number): [number, number] {
  const snappedX = Math.round(x / 1);
  const snappedY = Math.round(y / 1);
  return [snappedX, snappedY];
}

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  isSnapToGrid: boolean,
  draggedItem: DOMRect | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  let { x, y } = currentOffset;
  if (isSnapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }
  let transform;
  if (draggedItem) {
    transform = `translate(${x - draggedItem.left}px, ${
      y - draggedItem.top
    }px)`;
  }

  return {
    transform,
    WebkitTransform: transform,
  };
}

export interface CustomDragLayerProps {
  snapToGrid: boolean;
  children: React.ReactNode;
  id: string;
}

export const DragLayer: FC<CustomDragLayerProps> = ({
  children,
  snapToGrid,
  id,
}) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));
  const draggedItem = useRef<HTMLDivElement>(null);
  const [draggedRect, setDragRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    //// if layer rect is not used and updated whenever an icon is grabbed,
    // an error occurs when changing slides: the preview component (grabbed icon) will display in the first layer where the
    // first icon was grabbed, the preview box will never update again, ergo, displaying out of view, remove second condition to test.
    if (draggedItem.current) {
      const rect = draggedItem.current.parentElement?.getBoundingClientRect();
      if (rect) {
        Object.assign(rect, { id: item.id });
        if (!draggedRect) {
          setDragRect(rect);
        }
        //@ts-expect-error
        if (draggedRect && draggedRect.id !== item.id) {
          setDragRect(rect);
        }
      }
    }
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDragRect(null);
    });
  });

  function renderItem() {
    if (children instanceof Array) {
      return children.map((child, index: number) => {
        switch (itemType) {
          case "box":
            return (
              <ComponentDragPreview
                key={index}
                children={child.props.name === item.id ? child : ""}
              ></ComponentDragPreview>
            );

          default:
            return null;
        }
      });
    } else {
      return null;
    }
  }

  // function renderItem() {
  //   switch (itemType) {
  //     case "box":
  //       return <ComponentDragPreview children={item.id}></ComponentDragPreview>;
  //     default:
  //       return null;
  //   }
  // }

  if (!isDragging) {
    return null;
  }

  // const components = renderItem();
  return (
    <div style={id === "layer2" ? layerStyles2 : layerStyles}>
      <div
        ref={draggedItem}
        style={getItemStyles(
          initialOffset,
          currentOffset,
          snapToGrid,
          draggedRect
        )}
      >
        {renderItem()}
      </div>
    </div>
  );
};
