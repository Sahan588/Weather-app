export interface weatherData {
  id: number;
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    sea_level: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  sys: {
    country: string;
  };
  wind: {
    speed: number;
  };
  weather: [
    {
      id: number;
      description: string;
      main: string;
      icon: string;
    }
  ];
}

export interface CityData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    sea_level?: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface ForecastResponse {
  list: CityData[];
  city: {
    name: string;
    country: string;
    timezone: number;
  };
}

export interface CityDisplayData { 
  temp: number;
  feels_like: number;
  humidity: number;
  sea_level: number;
  speed: number;
  description: string;
  icon: string;
} 

const apikey = process.env.REACT_APP_WEATHER_API_KEY || '';

export const fetchweather = async (Ids: string): Promise<weatherData[]> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/group?id=${Ids}&appid=${apikey}&units=metric`
  );
  if (!response.ok) throw new Error('Failed to fetch data');
  const data = await response.json();
  return data.list;
};

export const getWeatherByCood = async (
  lat: string,
  lon: string
): Promise<weatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
  );
  if (!response.ok) throw new Error('Failed to fetch data');
  return await response.json();
};

export const getCityByName = async (cityName: string): Promise<weatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`
  );
  if (!response.ok) throw new Error('City not found');
  return await response.json();
};

export const getCityForecast = async (
  lat: string,
  lon: string
): Promise<ForecastResponse> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
  );
  if (!response.ok) throw new Error('Failed to fetch data');
  return await response.json();
};
