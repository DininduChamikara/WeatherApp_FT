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

function App() {
  const [weatherRecords, setWeatherRecords] = useState<any[]>([]);
  const [individualView, setIndividualView] = useState<boolean>(false);
  const [individualRecordIndex, setIndividualRecordIndex] = useState<number>(0);

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
        "metric"
      );
      apiCall.then((response) => {
        if (response) {
          setWeatherRecords(response.list);

          // Cache the data in localStorage with a timestamp
          localStorage.setItem(
            "cachedWeatherData",
            JSON.stringify({
              response,
              individualView,
              individualRecordIndex,
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
    const cachedWeatherData = localStorage.getItem("cachedWeatherData");

    const cityCodesArr: any[] = [];
    cityData.List.forEach((city: any) => {
      cityCodesArr.push(city.CityCode);
    });

    if (cachedWeatherData) {
      const parsedCachedWeatherData = JSON.parse(cachedWeatherData);
      const cachedWeatherDataTimestamp = parsedCachedWeatherData.timestamp;
      const cachedWeatherDataResponse = parsedCachedWeatherData.response;

      const cachedIndividualRecordIndex =
        parsedCachedWeatherData.individualRecordIndex;
      const cachedIndividualView = parsedCachedWeatherData.individualView;

      if (Date.now() - cachedWeatherDataTimestamp < 5 * 60 * 1000) {
        setWeatherRecords(cachedWeatherDataResponse.list);
        setIndividualView(cachedIndividualView);
        setIndividualRecordIndex(cachedIndividualRecordIndex);
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
    <div className="bg-[#1f2128] w-full pb-20">
      <div
        className="bg-fixed bg-no-repeat w-full p-5 md:p-20"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Header />
        {loaded ? (
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    weatherRecords={weatherRecords}
                    popItemFromArray={popItemFromArray}
                    setIndividualView={setIndividualView}
                    setIndividualRecordIndex={setIndividualRecordIndex}
                  />
                }
              />
              <Route
                path="/individual_view"
                element={
                  <IndividualView
                    individualRecordIndex={individualRecordIndex}
                    setIndividualView={setIndividualView}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        ) : (
          <SpinerLoader />
        )}
      </div>
      <Footer />
      <div className="fixed bottom-0 left-0 right-0 z-[-1] h-screen bg-[#1f2128]" />
    </div>
  );
}

export default App;
