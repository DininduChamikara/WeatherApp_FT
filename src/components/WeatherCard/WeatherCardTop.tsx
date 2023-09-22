import React from "react";
import { WeatherRecordTopType } from "../../propTypes";
import { formatTimestampToDateTime } from "../../formats";
import { api_constants } from "../../constants";

const WeatherCardTop: React.FC<WeatherRecordTopType> = ({
  weatherTopRecord,
}) => {
  return (
    <>
      <div className="flex">
        <div className="w-[60%] flex justify-center">
          <div className="flex flex-col space-y-1 items-center">
            <p className="text-xl font-bold">
              {weatherTopRecord.cityName}, {weatherTopRecord.country}
            </p>
            <p className="text-sm">
              {formatTimestampToDateTime(weatherTopRecord.dt)}
            </p>
          </div>
        </div>
        <div className="w-[40%] flex justify-center">
          <div className="flex items-center">
            <p className="text-4xl">{weatherTopRecord.temp.toFixed(0)}°c</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-[60%] flex justify-center">
          <div className="flex items-center gap-1 mt-4">
            <img
              className="w-[50px] h-[50px]"
              src={`${api_constants.BASE_URL_ICON}/img/wn/${weatherTopRecord.icon}@2x.png`}
              alt="icon"
            />
            <p className="text-base font-bold">
              {weatherTopRecord.description}
            </p>
          </div>
        </div>
        <div className="w-[40%] flex justify-center">
          <div className="flex flex-col items-center justify-center font-bold">
            <p className="text-sm">
              Temp Min: {weatherTopRecord.temp_min.toFixed(0)}°c
            </p>
            <p className="text-sm">
              Temp Max: {weatherTopRecord.temp_max.toFixed(0)}°c
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCardTop;
