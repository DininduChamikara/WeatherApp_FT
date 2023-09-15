class ApiService {
  async apiGET_WeatherByCityIds(cityIDs: string[], unitType: string) {
    try {
      const response = await fetch(
        // `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${process.env.REACT_APP_API_KEY}`
        `http://api.openweathermap.org/data/2.5/group?id=${cityIDs}&units=${unitType}&appid=06c81a05ffd1f221a00746aafdc361f0`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiService();
