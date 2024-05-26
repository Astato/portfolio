interface WeatherIcon {
  [theme: string]: {
    [iconCode: string]: string;
  };
}

const weatherIcons: WeatherIcon = {
  dark: {
    "01d": "/src/assets/icons/weather/dark/clear_day.svg",
    "01n": "/src/assets/icons/weather/dark/clear_night.svg",
    "02d": "/src/assets/icons/weather/dark/mostly_clear_day",
    "02n": "/src/assets/icons/weather/dark/mostly_clear_night.svg",
    "03d": "/src/assets/icons/weather/dark/mostly_cloudy_day.svg",
    "03n": "/src/assets/icons/weather/dark/mostly_cloudy_night.svg",
    "04d": "/src/assets/icons/weather/dark/cloudy.svg",
    "04n": "/src/assets/icons/weather/dark/cloudy.svg",
    "09d": "/src/assets/icons/weather/dark/scattered_showers_day.svg",
    "09n": "/src/assets/icons/weather/dark/scattered_showers_night.svg",
    "10d": "/src/assets/icons/weather/dark/showers_rain.svg",
    "10n": "/src/assets/icons/weather/dark/showers_rain.svg",
    "11d": "/src/assets/icons/weather/dark/strong_thunderstorms.svg",
    "11n": "/src/assets/icons/weather/dark/strong_thunderstorms.svg",
    "12d": "/src/assets/icons/weather/dark/clear_night.svg",
    "12n": "/src/assets/icons/weather/dark/clear_night.svg",
    "13d": "/src/assets/icons/weather/dark/showers_snow.svg",
    "13n": "/src/assets/icons/weather/dark/showers_snow.svg",
    "50d": "/src/assets/icons/weather/dark/haze_fog_dust_smoke.svg",
    "602": "/src/assets/icons/weather/dark/heavy_snow.svg",
    "611": "/src/assets/icons/weather/dark/sleet_hail.svg",
    "621": "/src/assets/icons/weather/dark/showers_snow.svg",
    wind: "/src/assets/icons/weather/dark/windy_breezy.svg",
  },
  light: {
    "01d": "/src/assets/icons/weather/light/clear_day.svg",
    "01n": "/src/assets/icons/weather/light/clear_night.svg",
    "02d": "/src/assets/icons/weather/light/mostly_clear_day",
    "02n": "/src/assets/icons/weather/light/mostly_clear_night.svg",
    "03d": "/src/assets/icons/weather/light/mostly_cloudy_day.svg",
    "03n": "/src/assets/icons/weather/light/mostly_cloudy_night.svg",
    "04d": "/src/assets/icons/weather/light/cloudy.svg",
    "04n": "/src/assets/icons/weather/light/cloudy.svg",
    "09d": "/src/assets/icons/weather/light/scattered_showers_day.svg",
    "09n": "/src/assets/icons/weather/light/scattered_showers_night.svg",
    "10d": "/src/assets/icons/weather/light/showers_rain.svg",
    "10n": "/src/assets/icons/weather/light/showers_rain.svg",
    "11d": "/src/assets/icons/weather/light/strong_thunderstorms.svg",
    "11n": "/src/assets/icons/weather/light/strong_thunderstorms.svg",
    "12d": "/src/assets/icons/weather/light/clear_night.svg",
    "12n": "/src/assets/icons/weather/light/clear_night.svg",
    "13d": "/src/assets/icons/weather/light/showers_snow.svg",
    "13n": "/src/assets/icons/weather/light/showers_snow.svg",
    "50d": "/src/assets/icons/weather/light/haze_fog_dust_smoke.svg",
    "602": "/src/assets/icons/weather/light/heavy_snow.svg",
    "611": "/src/assets/icons/weather/light/sleet_hail.svg",
    "621": "/src/assets/icons/weather/light/showers_snow.svg",
    wind: "/src/assets/icons/weather/light/windy_breezy.svg",
  },
};

export default weatherIcons;
