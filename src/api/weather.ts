import axios from 'axios';

const WEATHER_API_KEY = import.meta.env.VITE_REACT_WETHER_API;

export const getWeekForecast = async (city: string) => {
  const {data} = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
    params: {
      key: WEATHER_API_KEY,
      q: city,
      days: 7,
    },
  });

  return data;
};
