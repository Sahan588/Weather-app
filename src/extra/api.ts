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

export interface CityData{
  main:{
    temp: number;
    feels_like: number;
    humidity: number;
    sea_level: number;
  };
  dt: number;
  wind:[{
      id:number;
      main:string;
      description: string;
      icon: string;
  }]
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
}
const apikey = process.env.REACT_APP_WEATHER_API_KEY || '';

//  weather for multiple city IDs
export const fetchweather = async (Ids: string): Promise<weatherData[]> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/group?id=${Ids}&appid=${apikey}&units=metric`
  );
  if (!response.ok) throw new Error('Failed to fetch data');
  const data = await response.json();
  return data.list;
};

//  Fetch weather by lat & lon (fixed the API call)
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

// Fetch weather by city name (added this function to fix your error)
export const getCityByName = async (cityName: string): Promise<weatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`
  );
  if (!response.ok) throw new Error('City not found');
  return await response.json();
};

export const getCityForecast = async (lat: string, lon: string) : Promise<CityData[]>=>{
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
  );
  if (!response.ok) throw new Error('Failed to fetch data');
  const data = await response.json();
  console.log(data.list);
  return data.list;
};
