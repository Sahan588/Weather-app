import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import CityCard from '../components/CityCard';
import {
  CityData,
  ForecastResponse,
  getCityForecast,
  getWeatherByCood,
  weatherData,
  CityDisplayData,
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

  const [cityDisplayData, setCityDisplayData] = useState<CityDisplayData | null>(null);
  const [selectedCard, setSelectedCard] = useState(-1);

  const location = useLocation();
  const { city } = (location.state || {}) as { city: weatherData };

  const { data: newCity } = useQuery({
    queryKey: ['weatherByCood'],
    queryFn: () => getWeatherByCood(lat, lon),
    enabled: !city,
  });

  const { data: cityForecast } = useQuery<ForecastResponse>({
    queryKey: ['ForecastByCoord', lat + lon],
    queryFn: () => getCityForecast(lat, lon),
    enabled: true,
  });

  // 👉 Only update cityDisplayData when no card is selected
  useEffect(() => {
    if (selectedCard === -1) {
      const source = city || newCity;
      if (source) {
        const display: CityDisplayData = {
          temp: source.main.temp,
          feels_like: source.main.feels_like,
          humidity: source.main.humidity,
          sea_level: source.main.sea_level,
          speed: source.wind.speed,
          description: source.weather[0].description,
          icon: source.weather[0].icon,
        };
        setCityDisplayData(display);
      }
    }
  }, [city, newCity, selectedCard]);

  const cardClickHandler = (forecast: CityData, index: number) => {
    setSelectedCard(index);

    const display: CityDisplayData = {
      temp: forecast.main.temp,
      feels_like: forecast.main.feels_like,
      humidity: forecast.main.humidity,
      sea_level: forecast.main.sea_level ?? 0,
      speed: forecast.wind.speed,
      description: forecast.weather[0].description,
      icon: forecast.weather[0].icon,
    };

    setCityDisplayData(display);
  };

  return (
    <div className="mt-[20px]">
      {cityDisplayData && (
        <CityCard
          city={{
            ...((city || newCity) as weatherData),
            main: {
              ...((city || newCity)?.main || {}),
              temp: cityDisplayData.temp,
              feels_like: cityDisplayData.feels_like,
              humidity: cityDisplayData.humidity,
              sea_level: cityDisplayData.sea_level,
            },
            wind: {
              ...((city || newCity)?.wind || {}),
              speed: cityDisplayData.speed,
            },
            weather: [
              {
                id: 0,
                main: '',
                description: cityDisplayData.description,
                icon: cityDisplayData.icon,
              },
            ],
          }}
          classNames="text-center mb-8 max-w-[80%] mx-auto"
        />
      )}

      {cityForecast && (
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 10 },
          }}
          className="px-4"
        >
          {cityForecast.list.map((forecast: CityData, index: number) => {
            const date = new Date(forecast.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            const formattedTime = date.toLocaleTimeString('en-US', {
               hour: '2-digit',
                minute: '2-digit',
          });


            return (
              <SwiperSlide key={index}>
                <div
                  onClick={() => cardClickHandler(forecast, index)}
                  className="cursor-pointer bg-blue-100 rounded-lg p-4 text-center shadow hover:shadow-lg transition"
                >
                  <p className="text-lg font-semibold">{dayName}</p>
                  <p className="text-sm">{formattedTime}</p>
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
