import React from 'react';
import { useQuery } from '@tanstack/react-query';

type City = {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: [{
    main: string;
    icon: string; // ← corrected
  }];
};

const apikey = process.env.REACT_APP_WEATHER_API_KEY || '';
const cityIds = process.env.REACT_APP_CITY_LIST || '';

const Home: React.FC = () => {

  const fetchCities = async (): Promise<City[]> => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/group?id=${cityIds}&appid=${apikey}&units=metric`);
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    console.log(data.list);
    return data.list;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchCities, // ← fixed
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading data</h2>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        {data?.map((city: City, index: number) => (
          <ul key={index}>
            <li>Name - {city.name}</li>
            <li>Feels Like - {city.main.feels_like}°C</li>
            <li>Humidity - {city.main.humidity}%</li>
            <li>Country - {city.sys.country}</li>
            <li>Main - {city.weather[0].main}</li>
            <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="weather icon" />
          </ul>
        ))}
      </header>
    </div>
  );
};

export default Home;
