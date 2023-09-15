import React, { useState } from "react";
import backgroundImage from "../../images/cloud_bg.png";
import WeatherCardBottom from "./WeatherCardBottom";
import WeatherCardTop from "./WeatherCardTop";

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

type Props = {
  record: {
    sys: {
      country: string;
      timezone: Int32Array;
      sunrise: number;
      sunset: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    id: Int32Array;
    name: string;
  };
  index: number;
  popItemFromArray: (index: number) => void;
  setIndividualRecord: (record: any) => void;
  setIndividualView: (view: boolean) => void;
  setIndividualRecordIndex: (index: number) => void;
};

const WeatherCard: React.FC<Props> = ({
  record,
  index,
  popItemFromArray,
  setIndividualRecord,
  setIndividualView,
  setIndividualRecordIndex,
}) => {
  const weatherTopRecord = {
    cityName: record.name,
    country: record.sys.country,
    dt: record.dt,
    icon: record.weather[0].icon,
    description: record.weather[0].description,
    temp: record.main.temp,
    temp_min: record.main.temp_min,
    temp_max: record.main.temp_max,
  };

  const weatherBottomRecord = {
    presure: record.main.pressure,
    humidity: record.main.humidity,
    visibility: record.visibility,
    wind: record.wind.speed,
    degree: record.wind.deg,
    sunrise: record.sys.sunrise,
    sunset: record.sys.sunset,
  };

  return (
    <div
      className={`relative bg-no-repeat w-full text-white ${colors[index]} rounded-xl`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
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
            setIndividualRecord(record);
            setIndividualView(true);
            setIndividualRecordIndex(index);
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
