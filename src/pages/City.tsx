import React, { useEffect } from 'react';
import { useLocation,useSearchParams } from 'react-router';
import CityCard from '../components/CityCard';
import { CityData, getCityForecast, getWeatherByCood, weatherData } from '../extra/api';
import { useQuery } from '@tanstack/react-query';


const City: React.FC = () => {

  const [searchParams] = useSearchParams();
  const lon = searchParams.get('lon') ||'';
  const lat = searchParams.get('lat') ||'';

  console.log(lon,lat);

  const location = useLocation();
  const {city} = (location.state || {} ) as { city: weatherData }; 

  const {data:newCity,isLoading,error} = useQuery({ 
    queryKey:['weatherByCood'],
    queryFn: () => getWeatherByCood(lat,lon),
    enabled:!city
  });

 const {data:cityForecast,isLoading:isForecastLoading,error:forecastError} = useQuery({
  queryKey:['ForecastByCoord',lat+lon],
  queryFn: () => getCityForecast(lat,lon),
  enabled:!city
 });




  useEffect(() => {
    //getCityForecast(lat,lon);
  },[])

  return (
   <div className="mt-[20px]">

      

      {city && <CityCard city={city} classNames="text-center mb-8 max-w-[80%] mx-auto"/>}
      {!city && newCity && <CityCard city={newCity} classNames="text-center mb-8 max-w-[80%] mx-auto" /> }

      <div>
         {cityForecast?.map((city:CityData,index:number)=>{
          const date = new Date(city.dt*1000)
          const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',})

           return (
            <div key={index }className="">
               
               <p> {city.main.temp}C</p>
               <img 
               className = "mx-auto w-[100px] min-h-[100px]"
               src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
               alt = {city.weather[0].description}
                />
              </div>
           )
            })}
      </div>

   </div>
  );
};

export default City;
