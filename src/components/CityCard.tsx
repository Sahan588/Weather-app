import { weatherData } from "../extra/api";

const CityCard: React.FC<{ city: weatherData; classNames?: string }> = ({ city, classNames }) => {
  return (
    <div className={`bg-card-bg-4 rounded-[20px] px-2 py-6 transition-shadow duration-100 ease-in-out hover:shadow-city-card-hover ${classNames}`}>

      <h2 className="font-bold text-[40px] leading-[65px]">
        {city.name}, {city.sys.country}
      </h2>

      <img
        className="mx-auto w-[150px] min-h-[150px]"
        src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
        alt={city.weather[0].description}
      />

      <p className="font-extralight text-[42px] mb-6">{city.main.temp} °C</p>

      <div className="flex mb-6 justify-around">
        <div className="flex gap-3 items-center">
          <img className="max-w-[30px] object-contain" src="images/humidity.png" alt="humidity" />
          <div className="text-left">
            <p className="text-[18px]">{city.main.humidity}%</p>
            <p className="text-[12px]">Humidity</p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <img className="max-w-[30px] object-contain" src="images/sea-level.png" alt="sea level" />
          <div className="text-left">
            <p className="text-[18px]">{city.main.sea_level}hPa</p>
            <p className="text-[12px]">Sea Level</p>
          </div>
        </div>
      </div>

        <div className="flex mb-6 justify-around">
            <div className="flex gap-3 items-center">
            <img className="max-w-[30px] object-contain" src="images/wind.png" alt="wind" />
            <div className="text-left">
                <p className="text-[18px]">{city.wind.speed} m/s</p>
                <p className="text-[12px]">Wind Speed</p>
            </div>
            </div>
    
            <div className="flex gap-3 items-center">
            <img className="max-w-[30px] object-contain" src="images/feels-like.png" alt="pressure" />
            <div className="text-left">
                <p className="text-[18px]">{city.main.feels_like} hPa</p>
                <p className="text-[12px]">feels_like</p>
            </div>
            </div>
    </div>
    <p className="font-extralight capitalize"> Summar : {city.weather[0].description}</p>
    </div>
    
  );
};

export default CityCard;
