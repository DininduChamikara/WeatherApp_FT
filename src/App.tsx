import { useEffect, useState } from "react";
import apiManager from "./api/apiManager";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import cityData from "./data/cities.json";
import backgroundImage from "./images/header_bg.png";
import WeatherCardIndividual from "./components/WeatherCard/WeatherCardIndividual";
import Footer from "./components/Footer";

function App() {
  const [weatherRecords, setWeatherRecords] = useState<any[]>([]);
  const [individualView, setIndividualView] = useState<boolean>(false);
  const [individualRecord, setIndividualRecord] = useState<any>({});
  const [individualRecordIndex, setIndividualRecordIndex] = useState<number>(0);

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

      if (Date.now() - cachedWeatherDataTimestamp < 5 * 60 * 1000) {
        setWeatherRecords(cachedWeatherDataResponse.list);
        return;
      } else {
        // old cached data
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
              JSON.stringify({ response, timestamp: Date.now() })
            );
          }
        });
      }
    } else {
      // No cached data
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
            JSON.stringify({ response, timestamp: Date.now() })
          );
        }
      });
    }
  }, []);

  function popItemFromArray(index: number) {
    const newArray = [...weatherRecords];
    newArray.splice(index, 1);
    setWeatherRecords(newArray);
  }

  return (
    <>
      <div className="bg-[#1f2128] h-full pb-20">
        <div
          className="relative bg-no-repeat w-full p-5 md:p-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <Header />
          {individualView ? (
            <div>
              <div className="w-full flex justify-center">
                <WeatherCardIndividual
                  record={individualRecord}
                  index={individualRecordIndex}
                  setIndividualRecord={setIndividualRecord}
                  setIndividualView={setIndividualView}
                  setIndividualRecordIndex={setIndividualRecordIndex}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-8 px-0 lg:px-40">
              {weatherRecords.map((record: any, index: number) => {
                return (
                  <WeatherCard
                    key={record.id}
                    record={record}
                    index={index}
                    popItemFromArray={popItemFromArray}
                    setIndividualRecord={setIndividualRecord}
                    setIndividualView={setIndividualView}
                    setIndividualRecordIndex={setIndividualRecordIndex}
                  />
                );
              })}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
