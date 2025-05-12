import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { getCityByName, weatherData } from '../extra/api';
import CityCard from '../components/CityCard';

const cityIds = process.env.REACT_APP_CITY_LIST || '';

const fetchweather = async (cityIds: string) => {
  const apikey = process.env.REACT_APP_WEATHER_API_KEY || '';
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/group?id=${cityIds}&appid=${apikey}&units=metric`
  );
  if (!response.ok) throw new Error('Failed to fetch weather data');
  const data = await response.json();
  return data.list;
};

const Home: React.FC = () => {
  const [cityName, setCityName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['weather'],
    queryFn: () => fetchweather(cityIds),
  });

  const {
    data: searchedCity,
    refetch,
  } = useQuery({
    queryKey: ['weatherByName', cityName],
    queryFn: () => getCityByName(cityName),
    enabled: false,
  });

  const navigate = useNavigate();

const handleCityClick = (city: weatherData) => {
  navigate(`/city?lon=${city.coord.lon}&lat=${city.coord.lat}`, { state: { city } });
};


  const handleSearch = () => {
    if (searchTerm.trim()) {
      setCityName(searchTerm.trim());
      refetch();
      console.log('Searching for:', searchTerm);
    } else {
      alert('Please enter a city name');
    }
  };

  useEffect(() => {
    if (searchedCity) {
      console.log('Searched City Data:', searchedCity);
    }
  }, [searchedCity]);

  if (isLoading) {
    return <h2 className="text-center mt-10 text-xl">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center mt-10 text-xl text-red-500">Error loading data</h2>;
  }

  return (
    <div
      className="max-w-[90%] md:max-w-[80%] lg:max-w-[70%] mx-auto mt-10 p-4 bg-cover bg-center"
      style={{ backgroundImage: 'url("/background.jpg")' }}
    >
      <header>
        {/* Search section */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <input
            type="text"
            name="city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter city name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600"
          />
          <button
            onClick={handleSearch}
            className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">Weather App</h1>

        {/* Weather card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {!searchedCity &&
            data?.map((city: weatherData, index: number) => (
              <div
                key={index}
                onClick={() => handleCityClick(city)}
                className="cursor-pointer"
              >
                <CityCard city={city} />
              </div>
            ))}
        </div>

        {/* Searched city result */}
        {searchedCity && (
          <div
            onClick={() => handleCityClick(searchedCity)}
            className="mt-8 cursor-pointer"
          >
            <CityCard city={searchedCity} />
          </div>
        )}
      </header>
    </div>
  );
};

export default Home;
