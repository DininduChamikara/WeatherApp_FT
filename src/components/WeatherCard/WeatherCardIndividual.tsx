import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiManager from "../../api/apiManager";
import { api_constants, colors, query_params, routes } from "../../constants";
import SpinerLoader from "../SpinerLoader";
import WeatherCardBottom from "./WeatherCardBottom";
import WeatherCardIndividualTop from "./WeatherCardIndividualTop";

const WeatherCardIndividual = () => {
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState<boolean>(false);

  const [queryParameters] = useSearchParams();

  const citycode = queryParameters.get(query_params.CITY_CODE)?.toString() || "";
  const color_index_str = queryParameters.get(query_params.COLOR_INDEX) || "0";

  const color_index = parseInt(color_index_str);

  const [weatherTopRecord, setWeatherTopRecord] = React.useState({
    cityName: "",
    country: "",
    dt: 0,
    icon: "",
    description: "",
    temp: 0,
    temp_min: 0,
    temp_max: 0,
  });

  const [weatherBottomRecord, setWeatherBottomRecord] = React.useState({
    presure: 0,
    humidity: 0,
    visibility: 0,
    wind: 0,
    degree: 0,
    sunrise: 0,
    sunset: 0,
  });

  const callAPI = () => {
    if (citycode !== "") {
      const apiCall = apiManager.apiGET_WeatherByCityIds([citycode], api_constants.UNIT_TYPE);

      apiCall.then((response) => {
        if (response) {
          setWeatherTopRecord({
            cityName: response.list[0].name,
            country: response.list[0].sys.country,
            dt: response.list[0].dt,
            icon: response.list[0].weather[0].icon,
            description: response.list[0].weather[0].description,
            temp: response.list[0].main.temp,
            temp_min: response.list[0].main.temp_min,
            temp_max: response.list[0].main.temp_max,
          });
          setWeatherBottomRecord({
            presure: response.list[0].main.pressure,
            humidity: response.list[0].main.humidity,
            visibility: response.list[0].visibility,
            wind: response.list[0].wind.speed,
            degree: response.list[0].wind.deg,
            sunrise: response.list[0].sys.sunrise,
            sunset: response.list[0].sys.sunset,
          });
          setLoaded(true);
        }
      });
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div
      className={`relative w-[600px] text-white ${colors[color_index]} rounded-xl`}
    >
      {loaded ? (
        <div className="rounded-t-xl w-[600]">
          <div className="flex justify-start p-4">
            <button
              onClick={() => {
                navigate(routes.HOME);
              }}
            >
              <svg
                className="w-[18px] h-[18px] text-white"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
          </div>
          <WeatherCardIndividualTop weatherTopRecord={weatherTopRecord} />
          <WeatherCardBottom weatherBottomRecord={weatherBottomRecord} />
        </div>
      ):(
        <SpinerLoader />
      )}
    </div>
  );
};

export default WeatherCardIndividual;
