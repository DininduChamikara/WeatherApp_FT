import React from "react";
import { WeatherRecordTopType } from "../../propTypes";
import { formatTimestampToDateTime } from "../../formats";
import { api_constants } from "../../constants";

const WeatherCardIndividualTop: React.FC<WeatherRecordTopType> = ({ weatherTopRecord }) => {
  return (
    <>
      <div className="flex-col">
        <div className="w-full flex justify-center">
          <div className="flex flex-col space-y-1 items-center">
            <p className="text-xl font-bold">
              {weatherTopRecord.cityName}, {weatherTopRecord.country}
            </p>
            <p className="text-sm">{formatTimestampToDateTime(weatherTopRecord.dt)}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center p-4">
        <div className="grid grid-cols-2 divide-x">
          <div className="flex-col mx-5">
            <div className="flex justify-center">
              {weatherTopRecord && weatherTopRecord.icon && (
                <img
                  className="w-[50px] h-[50px]"
                  src={`${api_constants.BASE_URL_ICON}/img/wn/${weatherTopRecord.icon}@2x.png`}
                  alt="icon"
                />
              )}
            </div>
            <div className="flex justify-center">
              <p className="text-base font-bold">
                {weatherTopRecord.description}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col items-center justify-center font-bold">
              <div className="flex justify-center">
                <div className="flex items-center">
                  <p className="text-4xl">
                    {weatherTopRecord.temp.toFixed(0)}°c
                  </p>
                </div>
              </div>
              <p className="text-sm">
                Temp Min: {weatherTopRecord.temp_min.toFixed(0)}°c
              </p>
              <p className="text-sm">
                Temp Max: {weatherTopRecord.temp_max.toFixed(0)}°c
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCardIndividualTop;
