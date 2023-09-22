import React from "react";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import { HomePropsType } from "../propTypes";

const Home: React.FC<HomePropsType> = ({
  weatherRecords,
  popItemFromArray,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-8 px-0">
      {weatherRecords?.map((record: any, index: number) => {
        return (
          <WeatherCard
            key={record.id}
            record={record}
            index={index}
            popItemFromArray={popItemFromArray}
          />
        );
      })}
    </div>
  );
};

export default Home;
