import React from "react";
import icon from "../../images/smart_icon.png";
import { WeatherRecordBottomType } from "../../propTypes";
import { formatTimestampToTime } from "../../formats";
import { bgColors } from "../../constants";

const WeatherCardBottom: React.FC<WeatherRecordBottomType> = ({ weatherBottomRecord }) => {
  return (
    <div className={`bg-[${bgColors.CARD_BOTTOM}] rounded-b-xl p-5`}>
      {/* medium and large screen */}
      <div className="hidden md:grid md:grid-cols-3 md:divide-x">
        <div className="flex sm:my-1 md:my-0 justify-center">
          <div className="flex flex-col justify-center">
            <div className="flex gap-1">
              <p className="text-sm font-bold">Pressure:</p>
              <p className="text-sm">{weatherBottomRecord.presure}hPa</p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm font-bold">Humidity:</p>
              <p className="text-sm">{weatherBottomRecord.humidity}%</p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm font-bold">Visibility:</p>
              <p className="text-sm">
                {(weatherBottomRecord.visibility / 1000).toFixed(1)}km
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center gap-1">
            <img className="w-[16px] h-[16px]" src={icon} alt="logo"></img>
            <div className="flex gap-1">
              <p className="text-sm">
                {weatherBottomRecord.wind.toFixed(1)}m/s
              </p>
              <p className="text-sm">{weatherBottomRecord.degree} Degree</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex gap-1">
              <p className="text-sm font-bold">Sunrise:</p>
              <p className="text-sm">{formatTimestampToTime(weatherBottomRecord.sunrise)}</p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm font-bold">Sunset:</p>
              <p className="text-sm">{formatTimestampToTime(weatherBottomRecord.sunset)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* small screen */}
      <div className="md:hidden sm:grid grid-rows-3 divide-y">
        <div className="flex mb-2 justify-center">
          <div className="flex flex-col justify-center">
            <div className="flex gap-1">
              <p className="text-sm font-bold">Pressure:</p>
              <p className="text-sm">{weatherBottomRecord.presure}hPa</p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm font-bold">Humidity:</p>
              <p className="text-sm">{weatherBottomRecord.humidity}%</p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm font-bold">Visibility:</p>
              <p className="text-sm">
                {(weatherBottomRecord.visibility / 1000).toFixed(1)}km
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex my-2 flex-col justify-center items-center gap-1">
            <img className="w-[16px] h-[16px]" src={icon} alt="logo"></img>
            <div className="flex gap-1">
              <p className="text-sm">
                {weatherBottomRecord.wind.toFixed(1)}m/s
              </p>
              <p className="text-sm">{weatherBottomRecord.degree} Degree</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex my-2 flex-col justify-center items-center">
            <div className="flex gap-1">
              <p className="text-sm font-bold">Sunrise:</p>
              <p className="text-sm">{formatTimestampToTime(weatherBottomRecord.sunrise)}</p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm font-bold">Sunset:</p>
              <p className="text-sm">{formatTimestampToTime(weatherBottomRecord.sunset)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCardBottom;
