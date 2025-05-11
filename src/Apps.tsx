import React, { useState, useEffect } from 'react';
import './App.css';
import { useQuery } from '@tanstack/react-query';

type City = {
  id: number;
  name: string;
  main: {
    feels_like: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    icon: string;
    description: string;
  }[];
};

const apikey = process.env.REACT_APP_WEATHER_API_KEY || '';
const cityIds = process.env.REACT_APP_CITY_LIST || '';



function App() {
  const [cities, setCities] = useState<City[]>([]); 

  const fetchCities = async (): Promise<City[]> => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/group?id=${cityIds}&appid=${apikey}&units=metric`);
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    return data.list;
  };

  const { data, isLoading, error } = useQuery<City[]>({
    queryKey: ['weather'],
    queryFn: fetchCities,
  });

  useEffect(() => {
    if (data) {
      setCities(data); 
    }
  }, [data]);

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading data</h2>;

  return (
    <div className="App">
      <header className="App-header">
        {cities.map((city) => (
          <ul key={city.id}>
            <li>Name - {city.name}</li>
            <li>Feels Like - {city.main.feels_like} °C</li>
            <li>Humidity - {city.main.humidity}%</li>
            <li>Country - {city.sys.country}</li>
            <img
              src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
              alt={city.weather[0].description}
            />
          </ul>
        ))}
      </header>
    </div>
  );
}

export default App;
