import { useAuth0 } from "@auth0/auth0-react";
import WeatherCardIndividual from "../components/WeatherCard/WeatherCardIndividual";
import { useEffect, useState } from "react";
import { localStorageKeys } from "../constants";

const IndividualView = () => {
  const { isAuthenticated } = useAuth0();
  const [isAuthenticatedInCache, setIsAuthenticatedInCache] = useState(isAuthenticated);

  useEffect(() => {
    const cachedAuth0Data = localStorage.getItem(
      localStorageKeys.CACHED_AUTH0_DATA
    );

    if (cachedAuth0Data) {
      const parsedCachedAuth0Data = JSON.parse(cachedAuth0Data);
      const cachedIsAuthenticated = parsedCachedAuth0Data.isAuthenticated;
      if (cachedIsAuthenticated) {
        setIsAuthenticatedInCache(cachedIsAuthenticated);
      }
    } else {
      if (isAuthenticated) {
        localStorage.setItem(
          localStorageKeys.CACHED_AUTH0_DATA,
          JSON.stringify({
            isAuthenticated: isAuthenticated,
          })
        );
        setIsAuthenticatedInCache(isAuthenticated);
      }
    }
  }, []);

  return (
    <>
      {(isAuthenticated || isAuthenticatedInCache ) && (
        <div className="w-full flex justify-center">
          <WeatherCardIndividual />
        </div>
      )}
    </>
  );
};

export default IndividualView;
