import { weatherData } from "../extra/api";

const CityCard: React.FC<{ city: weatherData; classNames?: string }> = ({ city, classNames }) => {
  return (
    // Card container with consistent size, blue background, and proper padding
    <div className={`bg-blue-500 text-white rounded-[20px] px-6 py-8 transition-shadow duration-100 ease-in-out hover:shadow-city-card-hover min-h-[400px] h-full flex flex-col justify-between ${classNames}`}>
      
      {/* City name and country */}
      <h2 className="font-bold text-[32px] text-center leading-tight mb-4">
        {city.name}, {city.sys.country}
      </h2>

      {/* Weather Icon */}
      <img
        className="mx-auto w-[100px] min-h-[100px] mb-4"
        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
        alt={city.weather[0].description}
      />

      {/* Temperature */}
      <p className="text-center font-light text-[32px] mb-4">{city.main.temp} °C</p>

      {/* First row: Humidity & Sea Level */}
      <div className="flex justify-around mb-4">
        <div className="flex items-center gap-3">
          <img className="w-[28px]" src="images/humidity.png" alt="Humidity" />
          <div className="text-left">
            <p className="text-[16px]">{city.main.humidity}%</p>
            <p className="text-[12px]">Humidity</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img className="w-[28px]" src="images/sea-level.png" alt="Sea Level" />
          <div className="text-left">
            <p className="text-[16px]">{city.main.sea_level} hPa</p>
            <p className="text-[12px]">Sea Level</p>
          </div>
        </div>
      </div>

      {/* Second row: Wind Speed & Feels Like */}
      <div className="flex justify-around mb-4">
        <div className="flex items-center gap-3">
          <img className="w-[28px]" src="images/wind.png" alt="Wind Speed" />
          <div className="text-left">
            <p className="text-[16px]">{city.wind.speed} m/s</p>
            <p className="text-[12px]">Wind Speed</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img className="w-[28px]" src="images/feels-like.png" alt="Feels Like" />
          <div className="text-left">
            <p className="text-[16px]">{city.main.feels_like} °C</p>
            <p className="text-[12px]">Feels Like</p>
          </div>
        </div>
      </div>

      {/* Weather summary */}
      <p className="text-center font-light capitalize mt-2">
        Summary: {city.weather[0].description}
      </p>
    </div>
  );
};

export default CityCard;
