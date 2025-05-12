import React from 'react';
import { useLocation, useSearchParams } from 'react-router';
import CityCard from '../components/CityCard';
import {
  CityData,
  ForecastResponse,
  getCityForecast,
  getWeatherByCood,
  weatherData
} from '../extra/api';
import { useQuery } from '@tanstack/react-query';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const City: React.FC = () => {
  const [searchParams] = useSearchParams();
  const lon = searchParams.get('lon') || '';
  const lat = searchParams.get('lat') || '';

  const location = useLocation();
  const { city } = (location.state || {}) as { city: weatherData };

  const { data: newCity, isLoading, error } = useQuery({
    queryKey: ['weatherByCood'],
    queryFn: () => getWeatherByCood(lat, lon),
    enabled: !city
  });

  const { data: cityForecast, isLoading: isForecastLoading, error: forecastError } = useQuery<ForecastResponse>({
    queryKey: ['ForecastByCoord', lat + lon],
    queryFn: () => getCityForecast(lat, lon),
    enabled: true
  });

  return (
    <div className="mt-[20px]">
      {city && (
        <CityCard city={city} classNames="text-center mb-8 max-w-[80%] mx-auto" />
      )}
      {!city && newCity && (
        <CityCard city={newCity} classNames="text-center mb-8 max-w-[80%] mx-auto" />
      )}

      {cityForecast && (
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 10 },
          }}
          className="px-4"
        >
          {cityForecast.list.map((forecast: CityData, index: number) => {
            const date = new Date(forecast.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const formattedDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });

            return (
              <SwiperSlide key={index}>
                <div className="bg-blue-100 rounded-lg p-4 text-center shadow">
                  <p className="text-lg font-semibold">{dayName}</p>
                  <p className="text-sm">{formattedDate}</p>
                  <p className="text-xl">{forecast.main.temp}°C</p>
                  <img
                    className="mx-auto w-[100px] min-h-[100px]"
                    src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                    alt={forecast.weather[0].description}
                  />
                  <p className="text-sm capitalize">{forecast.weather[0].description}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default City;
