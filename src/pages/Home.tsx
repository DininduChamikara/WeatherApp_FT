import React, { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import { localStorageKeys } from "../constants";
import { HomePropsType } from "../propTypes";
import { useAuth0 } from "@auth0/auth0-react";
import SpinerLoader from "../components/SpinerLoader";

const Home: React.FC<HomePropsType> = ({
  weatherRecords,
  popItemFromArray,
}) => {
  const { isAuthenticated } = useAuth0();
  const [isAuthenticatedInCache, setIsAuthenticatedInCache] =
    useState(isAuthenticated);

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
      {isAuthenticated || isAuthenticatedInCache ? (
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
      ) : (
        <SpinerLoader />
      )}
    </>
  );
};

export default Home;
