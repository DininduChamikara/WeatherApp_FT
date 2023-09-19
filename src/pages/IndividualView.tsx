import React from "react";
import WeatherCardIndividual from "../components/WeatherCard/WeatherCardIndividual";

type Props = {
  individualRecordIndex: number;
  setIndividualView: (view: boolean) => void;
};

const IndividualView: React.FC<Props> = ({
  individualRecordIndex,
  setIndividualView,
}) => {

  return (
    <div className="w-full flex justify-center">
      <WeatherCardIndividual
        index={individualRecordIndex}
        setIndividualView={setIndividualView}
      />
    </div>
  );
};

export default IndividualView;
