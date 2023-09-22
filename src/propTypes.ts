type WeatherRecordType = {
  record: {
    sys: {
      country: string;
      timezone: Int32Array;
      sunrise: number;
      sunset: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    id: Int32Array;
    name: string;
  };
  index: number;
  popItemFromArray: (index: number) => void;
};

type WeatherRecordTopType = {
  weatherTopRecord: {
    cityName: string;
    country: string;
    dt: number;
    icon: string;
    description: string;
    temp: number;
    temp_min: number;
    temp_max: number;
  };
};

type WeatherRecordBottomType = {
  weatherBottomRecord: {
    presure: number;
    humidity: number;
    visibility: number;
    wind: number;
    degree: number;
    sunrise: number;
    sunset: number;
  };
};

type HomePropsType = {
  weatherRecords: any[];
  popItemFromArray: (index: number) => void;
};

export type {
  WeatherRecordType,
  WeatherRecordBottomType,
  WeatherRecordTopType,
  HomePropsType
};
