import { api_constants } from "../constants";

class ApiService {
  async apiGET_WeatherByCityIds(cityIDs: string[], unitType: string) {
    try {
      const response = await fetch(
        `${api_constants.BASE_URL}/data/2.5/group?id=${cityIDs}&units=${unitType}&appid=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching: ", error);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiService();
