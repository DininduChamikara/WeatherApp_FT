import React, { useEffect, useState } from "react";
import WeatherCardBottom from "./WeatherCardBottom";
import WeatherCardIndividualTop from "./WeatherCardIndividualTop";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiManager from "../../api/apiManager";
import { colors } from "../../constants";

type Props = {
  index: number;
  setIndividualView: (view: boolean) => void;
};

const WeatherCardIndividual: React.FC<Props> = ({
  index,
  setIndividualView,
}) => {
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState<boolean>(false);

  const [queryParameters] = useSearchParams();
  const citycode = queryParameters.get("citycode")?.toString() || "";

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

  let apiCallMade = false;

  const callAPI = () => {
    if (!apiCallMade && citycode !== "") {
      const apiCall = apiManager.apiGET_WeatherByCityIds([citycode], "metric");

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

          // Cache the data in localStorage with a timestamp
          localStorage.setItem(
            "cachedIndividualCardData",
            JSON.stringify({
              response,
              timestamp: Date.now(),
              lastRequestedCityCode: citycode,
            })
          );
          setLoaded(true);
        }
      });
      apiCallMade = true;
    }
  };

  useEffect(() => {
    // Check if cached data exists and is not expired
    const cachedIndividualCardData = localStorage.getItem(
      "cachedIndividualCardData"
    );

    if (cachedIndividualCardData) {
      const parsedCachedIndividualCardData = JSON.parse(
        cachedIndividualCardData
      );
      const cachedIndividualCardDataTimestamp =
        parsedCachedIndividualCardData.timestamp;
      const cachedIndividualCardDataResponse =
        parsedCachedIndividualCardData.response;
      const cachedLastRequestedCityCode =
        parsedCachedIndividualCardData.lastRequestedCityCode;

      if (citycode !== cachedLastRequestedCityCode) {
        callAPI();
        return;
      } else {
        if (Date.now() - cachedIndividualCardDataTimestamp < 5 * 60 * 1000) {
          setWeatherTopRecord({
            cityName: cachedIndividualCardDataResponse.list[0].name,
            country: cachedIndividualCardDataResponse.list[0].sys.country,
            dt: cachedIndividualCardDataResponse.list[0].dt,
            icon: cachedIndividualCardDataResponse.list[0].weather[0].icon,
            description:
              cachedIndividualCardDataResponse.list[0].weather[0].description,
            temp: cachedIndividualCardDataResponse.list[0].main.temp,
            temp_min: cachedIndividualCardDataResponse.list[0].main.temp_min,
            temp_max: cachedIndividualCardDataResponse.list[0].main.temp_max,
          });
          setWeatherBottomRecord({
            presure: cachedIndividualCardDataResponse.list[0].main.pressure,
            humidity: cachedIndividualCardDataResponse.list[0].main.humidity,
            visibility: cachedIndividualCardDataResponse.list[0].visibility,
            wind: cachedIndividualCardDataResponse.list[0].wind.speed,
            degree: cachedIndividualCardDataResponse.list[0].wind.deg,
            sunrise: cachedIndividualCardDataResponse.list[0].sys.sunrise,
            sunset: cachedIndividualCardDataResponse.list[0].sys.sunset,
          });
          setLoaded(true);
        } else {
          callAPI();
        }
      }
    } else {
      // No cached data
      callAPI();
    }
  }, []);

  return (
    <div
      className={`relative w-[600px] text-white ${colors[index]} rounded-xl`}
    >
      {loaded && (
        <div className="rounded-t-xl w-[600]">
          <div className="flex justify-start p-4">
            <button
              onClick={() => {
                setIndividualView(false);
                navigate("/");
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
      )}
    </div>
  );
};

export default WeatherCardIndividual;
