import { memo } from "react";

const styles: React.CSSProperties = {
  height: "100%",
  borderRadius: "100%",
  cursor: "move",
};

export interface BoxProps {
  yellow?: boolean;
  preview?: boolean;
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = memo(function Box({ preview, children }) {
  return (
    <div style={{ ...styles }} role={preview ? "BoxPreview" : "Box"}>
      {children}
    </div>
  );
});

export default Box;
