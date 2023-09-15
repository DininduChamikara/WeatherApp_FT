import React from "react";
import icon from "../../images/smart_icon.png";

type Props = {
  weatherBottomRecord: {
    presure: number;
    humidity: number;
    visibility: number;
    wind: number;
    degree: number;
    sunrise: number;
    sunset: number;
  };
};

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  return `${formattedHours}.${formattedMinutes}${amOrPm}`;
}

const WeatherCardBottom: React.FC<Props> = ({ weatherBottomRecord }) => {
  // console.log(weatherBottomRecord);
  return (
    <div className="bg-[#383b47] rounded-b-xl p-5">
      <div className="grid grid-cols-3 divide-x">
        <div className="flex justify-center">
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
              <p className="text-sm">{formatTimestamp(weatherBottomRecord.sunrise)}</p>
            </div>
            <div className="flex gap-1">
              <p className="text-sm font-bold">Sunset:</p>
              <p className="text-sm">{formatTimestamp(weatherBottomRecord.sunset)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCardBottom;
