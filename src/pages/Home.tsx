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
    navigate('/city', { state: { city } });
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

  if (isLoading) return <h2 className="text-center mt-10 text-xl">Loading...</h2>;
  if (error) return <h2 className="text-center mt-10 text-xl text-red-500">Error loading data</h2>;

  const cityCount = data ? data.length :0;
  const lastRowCount = cityCount % 3;

  return (
    <div className="max-w-[90%] md:max-w-[80%] lg:max-w-[70%] mx-auto mt-10 p-4">
      <header className="App-header">
        <div className='flex flex-col md:flex-row gap-4 justify-between items-center mb-8'>
          <input 
            type="text" 
            name="city" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Enter city name"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSearch}
            className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">Weather App</h1>
        
        <div className="grid gap-6">
          {!searchedCity && data?.map((city: weatherData, index: number) => {
            
            let itemPosition = '';
            if(lastRowCount === 2 && index === cityCount - 2 ){
                itemPosition = 'md:col-start-1 xl:col-start-2';
            }
            if(lastRowCount === 1 && index === cityCount - 1 ){
                itemPosition = 'md:col-start-1 xl:col-start-2';
            }
            if(lastRowCount === 1){
                itemPosition = 'md:col-start-3 xl:col-start-6';
            }
            
            return(
                
            <div 
              key={index} 
              onClick={() => handleCityClick(city)} 
              className={'col-start-1 col-end-3 md:col-start-1 md:col-end-2 lg:col-start-1 lg:col-end-2'}
            >
                
                <CityCard city = {city} />

            </div>
            );

    })}
        </div>

        {searchedCity && (
             <div onClick={() => handleCityClick(searchedCity)}>
            <CityCard city={searchedCity} />
        </div>
        )}


      </header>
    </div>
  );
};

export default Home;