import { Grid, Tooltip } from "@mui/material";
import Wrapper from "./components/Wrapper";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { DndProvider } from "react-dnd";
import { useEffect, useState } from "react";
import dockImage from "/assets/pixel-dock-finished.png";
import { Help } from "@mui/icons-material";

function App() {
  const [infoMessage, setInfoMessage] = useState<boolean>(
    Boolean(sessionStorage.getItem("infoMessage"))
  );
  const [weatherData, setWeatherData] = useState("");
  const [weatherLocation, setWeatherLocation] = useState<[number, number]>([
    0, 0,
  ]);

  async function getWeather(latitude: number, longitude: number) {
    if (latitude && longitude) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=58ab3e4fa033b9933bab777dff79301b`
        );
        if (response.status === 200) {
          const data = await response.json();
          setWeatherLocation([latitude, longitude]);
          return setWeatherData(data);
        }
      } catch (error) {
        console.log("error", error);
        return;
      }
    } else {
      return;
    }
  }

  useEffect(() => {
    const lat = sessionStorage.getItem("latitude");
    const lon = sessionStorage.getItem("longitude");
    if (!weatherData) {
      if (lat && lon) {
        getWeather(Number(lat), Number(lon));
      } else {
        navigator.geolocation.getCurrentPosition(
          (pos) => getWeather(pos.coords.latitude, pos.coords.longitude),
          () => setWeatherData("401")
        );
      }
    }
    setInfoMessage(true);
    sessionStorage.setItem("infoMessage", "showed");
  }, [weatherData]);

  return (
    <Grid
      container
      id="App"
      columns={12}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <DndProvider
        backend={TouchBackend}
        options={{
          enableMouseEvents: true,
          dealyTouchStart: 500,
        }}
      >
        <Wrapper
          weatherData={weatherData}
          weatherLocation={weatherLocation}
          setWeatherData={setWeatherData}
        />
      </DndProvider>
      <div
        style={{
          position: "absolute",
          width: "50px",
          height: "50px",
          color: "red",
          left: "2rem",
          top: "2rem",
          zIndex: 2,
        }}
      >
        <Tooltip
          title={
            <>
              <p style={{ fontSize: "15px", margin: "0 auto" }}>
                How does it Work? <br />
                <span style={{ fontSize: "12px", margin: "0 auto" }}>
                  Just like a tablet (almost)
                </span>
                <ul>
                  <li>Swipe up to open the Apps Drawer</li>
                  <li>Click and hold to grab to add them to the home screen</li>
                  <li>
                    Swipe down or grab an pull the notification bar to open
                  </li>
                  <li>Click to open an App</li>
                  <li>Swipe left or right to switch screens</li>
                  <li>Open settings to check the customization options</li>
                  <li>
                    Swipe the bottom gray bar (if an app is opened) to close the
                    app
                  </li>
                </ul>
              </p>
            </>
          }
        >
          <Help
            style={{
              fill: "white",
              fontSize: "30px",
              backgroundColor: "gray",
              borderRadius: "20px",
            }}
          ></Help>
        </Tooltip>
      </div>
      {!infoMessage && (
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "150px",
            background: "gray",
            color: "black",
            left: "1rem",
            top: "10rem",
            borderRadius: "20px",
            fontSize: "18px",
            display: "flex",
            zIndex: 2,
          }}
        >
          <p style={{ margin: "auto 10px" }}>
            Location is requested solely for weather functionality
          </p>
        </div>
      )}
      <img id="dock-image" src={dockImage}></img>
    </Grid>
  );
}

export default App;
