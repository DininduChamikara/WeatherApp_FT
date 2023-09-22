import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import apiManager from "./api/apiManager";
import Footer from "./components/Footer";
import Header from "./components/Header";
import cityData from "./data/cities.json";
import backgroundImage from "./images/header_bg.png";
import Home from "./pages/Home";
import IndividualView from "./pages/IndividualView";
import SpinerLoader from "./components/SpinerLoader";
import { api_constants, localStorageKeys, routes } from "./constants";

function App() {
  const [weatherRecords, setWeatherRecords] = useState<any[]>([]);

  const [loaded, setLoaded] = useState<boolean>(false);

  let apiCallMade = false;

  const callAPI = () => {
    if (!apiCallMade) {
      const cityCodesArr: any[] = [];
      cityData.List.forEach((city: any) => {
        cityCodesArr.push(city.CityCode);
      });

      const apiCall = apiManager.apiGET_WeatherByCityIds(
        cityCodesArr,
        api_constants.UNIT_TYPE
      );

      apiCall.then((response) => {
        if (response) {
          setWeatherRecords(response.list);

          // Cache the data in localStorage with a timestamp
          localStorage.setItem(
            localStorageKeys.CACHED_WEATHER_DATA,
            JSON.stringify({
              response,
              timestamp: Date.now(),
            })
          );
          setLoaded(true);
        }
      });
      apiCallMade = true;
    }
  };

  useEffect(() => {
    // Check if cached data exists and is not expired
    const cachedWeatherData = localStorage.getItem(
      localStorageKeys.CACHED_WEATHER_DATA
    );

    if (cachedWeatherData) {
      const parsedCachedWeatherData = JSON.parse(cachedWeatherData);
      const cachedWeatherDataTimestamp = parsedCachedWeatherData.timestamp;
      const cachedWeatherDataResponse = parsedCachedWeatherData.response;

      if (Date.now() - cachedWeatherDataTimestamp < 5 * 60 * 1000) {
        setWeatherRecords(cachedWeatherDataResponse.list);
        setLoaded(true);
        return;
      } else {
        // old cached data
        callAPI();
      }
    } else {
      // No cached data
      callAPI();
    }
  }, []);

  function popItemFromArray(index: number) {
    const newArray = [...weatherRecords];
    newArray.splice(index, 1);
    setWeatherRecords(newArray);
  }

  return (
    <div className="w-full pb-10">
      <div
        className="bg-fixed bg-no-repeat w-full p-5 md:p-20"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Header />
        {loaded ? (
          <BrowserRouter>
            <Routes>
              <Route
                path={routes.HOME}
                element={
                  <Home
                    weatherRecords={weatherRecords}
                    popItemFromArray={popItemFromArray}
                  />
                }
              />
              <Route
                path={routes.INDIVIDUAL_VIEW}
                element={<IndividualView />}
              />
            </Routes>
          </BrowserRouter>
        ) : (
          <SpinerLoader />
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <Footer />
      </div>
      <div
        className="fixed bottom-0 left-0 right-0 z-[-1] h-screen bg-[#1f2128]"
      />
    </div>
  );
}

export default App;
