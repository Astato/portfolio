interface WeatherIcon {
  [theme: string]: {
    [iconCode: string]: string;
  };
}

const weatherIcons: WeatherIcon = {
  dark: {
    "01d": "/assets/icons/weather/dark/clear_day.svg",
    "01n": "/assets/icons/weather/dark/clear_night.svg",
    "02d": "/assets/icons/weather/dark/mostly_clear_day",
    "02n": "/assets/icons/weather/dark/mostly_clear_night.svg",
    "03d": "/assets/icons/weather/dark/mostly_cloudy_day.svg",
    "03n": "/assets/icons/weather/dark/mostly_cloudy_night.svg",
    "04d": "/assets/icons/weather/dark/cloudy.svg",
    "04n": "/assets/icons/weather/dark/cloudy.svg",
    "09d": "/assets/icons/weather/dark/scattered_showers_day.svg",
    "09n": "/assets/icons/weather/dark/scattered_showers_night.svg",
    "10d": "/assets/icons/weather/dark/showers_rain.svg",
    "10n": "/assets/icons/weather/dark/showers_rain.svg",
    "11d": "/assets/icons/weather/dark/strong_thunderstorms.svg",
    "11n": "/assets/icons/weather/dark/strong_thunderstorms.svg",
    "12d": "/assets/icons/weather/dark/clear_night.svg",
    "12n": "/assets/icons/weather/dark/clear_night.svg",
    "13d": "/assets/icons/weather/dark/showers_snow.svg",
    "13n": "/assets/icons/weather/dark/showers_snow.svg",
    "50d": "/assets/icons/weather/dark/haze_fog_dust_smoke.svg",
    "602": "/assets/icons/weather/dark/heavy_snow.svg",
    "611": "/assets/icons/weather/dark/sleet_hail.svg",
    "621": "/assets/icons/weather/dark/showers_snow.svg",
    wind: "/assets/icons/weather/dark/windy_breezy.svg",
  },
  light: {
    "01d": "/assets/icons/weather/light/clear_day.svg",
    "01n": "/assets/icons/weather/light/clear_night.svg",
    "02d": "/assets/icons/weather/light/mostly_clear_day",
    "02n": "/assets/icons/weather/light/mostly_clear_night.svg",
    "03d": "/assets/icons/weather/light/mostly_cloudy_day.svg",
    "03n": "/assets/icons/weather/light/mostly_cloudy_night.svg",
    "04d": "/assets/icons/weather/light/cloudy.svg",
    "04n": "/assets/icons/weather/light/cloudy.svg",
    "09d": "/assets/icons/weather/light/scattered_showers_day.svg",
    "09n": "/assets/icons/weather/light/scattered_showers_night.svg",
    "10d": "/assets/icons/weather/light/showers_rain.svg",
    "10n": "/assets/icons/weather/light/showers_rain.svg",
    "11d": "/assets/icons/weather/light/strong_thunderstorms.svg",
    "11n": "/assets/icons/weather/light/strong_thunderstorms.svg",
    "12d": "/assets/icons/weather/light/clear_night.svg",
    "12n": "/assets/icons/weather/light/clear_night.svg",
    "13d": "/assets/icons/weather/light/showers_snow.svg",
    "13n": "/assets/icons/weather/light/showers_snow.svg",
    "50d": "/assets/icons/weather/light/haze_fog_dust_smoke.svg",
    "602": "/assets/icons/weather/light/heavy_snow.svg",
    "611": "/assets/icons/weather/light/sleet_hail.svg",
    "621": "/assets/icons/weather/light/showers_snow.svg",
    wind: "/assets/icons/weather/light/windy_breezy.svg",
  },
};

export default weatherIcons;
