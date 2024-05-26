import type { CSSProperties, FC } from "react";
import { memo, useEffect, useState } from "react";

const styles: CSSProperties = {
  display: "inline-block",
  transform: "rotate(-7deg)",
  WebkitTransform: "rotate(-7deg)",
};

export interface BoxDragPreviewProps {
  children: React.ReactNode;
}

export interface BoxDragPreviewState {
  tickTock: any;
}

export const ComponentDragPreview: FC<BoxDragPreviewProps> = memo(
  function BoxDragPreview({ children }) {
    const [tickTock, setTickTock] = useState(false);

    useEffect(
      function subscribeToIntervalTick() {
        const interval = setInterval(() => setTickTock(!tickTock), 500);
        return () => clearInterval(interval);
      },
      [tickTock]
    );

    return <div style={styles}>{children || null}</div>;
  }
);
