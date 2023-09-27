const appTitle = "Weather App";
const footerText = "2023 Fidenz Technologies";

const api_constants = {
  BASE_URL: "http://api.openweathermap.org",
  BASE_URL_ICON: "https://openweathermap.org",
  UNIT_TYPE: "metric",
};

const localStorageKeys = {
  CACHED_WEATHER_DATA: "cachedWeatherData",
  CACHED_INDIVIDUAL_CARD_DATA: "cachedIndividualCardData",
};

const cachedExpirationTime = 5 * 60 * 1000;

const routes = {
  HOME: "/",
  INDIVIDUAL_VIEW: "/individual_view",
};

const colors = [
  "bg-orange-500",
  "bg-sky-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-blue-500",
];

const query_params = {
  CITY_CODE: "citycode",
  COLOR_INDEX: "color_index",
};

export {
  colors,
  appTitle,
  footerText,
  api_constants,
  localStorageKeys,
  cachedExpirationTime,
  routes,
  query_params,
};
