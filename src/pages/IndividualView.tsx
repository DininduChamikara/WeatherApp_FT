import { useAuth0 } from "@auth0/auth0-react";
import WeatherCardIndividual from "../components/WeatherCard/WeatherCardIndividual";

const IndividualView = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <div className="w-full flex justify-center">
          <WeatherCardIndividual />
        </div>
      )}
    </>
  );
};

export default IndividualView;
