import React from 'react';
import { useLocation } from 'react-router';

const City: React.FC = () => {
  const location = useLocation();
  const city = location.state.city; // fixed line

  return (
    <ul>
      <li>Name - {city.name}</li>
      <li>Feels Like - {city.main.feels_like}°C</li>
      <li>Humidity - {city.main.humidity}%</li>
      <li>Country - {city.sys.country}</li>
      <li>Main - {city.weather[0].main}</li>
      <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="weather icon" />
    </ul>
  );
};

export default City;
