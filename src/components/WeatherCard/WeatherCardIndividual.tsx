import React from "react";
import WeatherCardBottom from "./WeatherCardBottom";
import WeatherCardIndividualTop from "./WeatherCardIndividualTop";

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
  setIndividualRecord: (record: any) => void;
  setIndividualView: (view: boolean) => void;
  setIndividualRecordIndex: (index: number) => void;
};

const WeatherCardIndividual: React.FC<Props> = ({
  record,
  index,
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
      className={`relative w-[600px] text-white ${colors[index]} rounded-xl`}
    >
      <div className="rounded-t-xl w-[600]">
        <div className="flex justify-start p-4">
          <button
            onClick={() => {
              setIndividualRecord({});
              setIndividualView(false);
              setIndividualRecordIndex(0);
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
    </div>
  );
};

export default WeatherCardIndividual;
