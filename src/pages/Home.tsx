import React from "react";
import WeatherCard from "../components/WeatherCard/WeatherCard";

type Props = {
  weatherRecords: any[];
  popItemFromArray: (index: number) => void;
  setIndividualView: (view: boolean) => void;
  setIndividualRecordIndex: (index: number) => void;
};

const Home: React.FC<Props> = ({
  weatherRecords,
  popItemFromArray,
  setIndividualView,
  setIndividualRecordIndex,
}) => {
  return (
    // <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-8 px-0 lg:px-40">
    <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-8 px-0">
      {weatherRecords.map((record: any, index: number) => {
        return (
          <WeatherCard
            key={record.id}
            record={record}
            index={index}
            popItemFromArray={popItemFromArray}
            setIndividualView={setIndividualView}
            setIndividualRecordIndex={setIndividualRecordIndex}
          />
        );
      })}
    </div>
  );
};

export default Home;
