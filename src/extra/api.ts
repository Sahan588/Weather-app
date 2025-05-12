


export interface weatherData  {
    id: number;
    name: string;
    main: {

        temp: number;
        feels_like: number;
        humidity: number;
        sea_level: number;
    };


    coord: {
        lat: number;
        lon: number;
    };

    sys: {
        country: string;
      };

    wind:{
        speed: number;
    }

  weather: [{
    id: number;
    description: string;
    main: string;
    icon: string; // ← corrected
  }
]

}

const apikey = process.env.REACT_APP_WEATHER_API_KEY || '';

export const fetchweather = async (Ids:string): Promise<weatherData[]> => {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/group?id=${Ids}&appid=${apikey}&units=metric`);
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    console.log(data.list);
    return data.list;
  }

  

export const getCityByName= async (cityName:string): Promise<weatherData> => {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`);
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    console.log(data.list);
    return data;
  };

