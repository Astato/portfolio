import { useContext, useState } from "react";
import { DarkModeContext } from "./Wrapper";
import HubFlipperClock from "./HubFlipperClock";
import HubDigitalClock from "./HubDigitalClock";
const HubMode = () => {
  const appContext = useContext(DarkModeContext);
  const setHubModeActive = appContext?.setHubModeActive;
  const hubMode = appContext?.hubModeType;

  return (
    <div
      id="hub-screen"
      style={{
        minWidth: "100%",
        background: "white",
        display: "grid",
      }}
      onDoubleClick={() => setHubModeActive && setHubModeActive(false)}
    >
      {hubMode && hubMode === "default" && <HubFlipperClock />}
      {hubMode && hubMode === "digital" && <HubDigitalClock />}
    </div>
  );
};

export default HubMode;
