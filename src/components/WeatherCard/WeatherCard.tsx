import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../images/cloud_bg.png";
import WeatherCardBottom from "./WeatherCardBottom";
import WeatherCardTop from "./WeatherCardTop";
import { colors, routes } from "../../constants";
import { WeatherRecordType } from "../../propTypes";

const WeatherCard: React.FC<WeatherRecordType> = ({
  record,
  index,
  popItemFromArray,
}) => {
  const navigate = useNavigate();

  const weatherTopRecord = {
    cityName: record?.name,
    country: record?.sys.country,
    dt: record?.dt,
    icon: record?.weather[0].icon,
    description: record?.weather[0].description,
    temp: record?.main.temp,
    temp_min: record?.main.temp_min,
    temp_max: record?.main.temp_max,
  };

  const weatherBottomRecord = {
    presure: record?.main.pressure,
    humidity: record?.main.humidity,
    visibility: record?.visibility,
    wind: record?.wind.speed,
    degree: record?.wind.deg,
    sunrise: record?.sys.sunrise,
    sunset: record?.sys.sunset,
  };

  return (
    <div
      className={`relative bg-no-repeat w-full text-white ${colors[index]} rounded-xl`}
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}
    >
      <div className="rounded-t-xl">
        <div className="flex justify-end p-4">
          <button onClick={() => popItemFromArray(index)}>
            <svg
              className="w-[12px] h-[12px] text-white"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            navigate(`${routes.INDIVIDUAL_VIEW}?color_index=${index}&citycode=${record.id}`);
          }}
        >
          <WeatherCardTop weatherTopRecord={weatherTopRecord} />
          <WeatherCardBottom weatherBottomRecord={weatherBottomRecord} />
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
