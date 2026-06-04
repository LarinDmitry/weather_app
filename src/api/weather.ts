import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import {WeatherApiResponse, SuggestionProps} from 'pages/Main/MainTypes';

const WEATHER_API_KEY = import.meta.env.VITE_REACT_WETHER_API;

export const useWeekForecast = (city: string) => {
  return useQuery<WeatherApiResponse>({
    queryKey: ['weatherForecast', city],
    queryFn: async () => {
      const {data} = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
        params: {
          key: WEATHER_API_KEY,
          q: city,
          days: 7,
        },
      });
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5m
    refetchOnWindowFocus: false,
  });
};

export const useSearchCities = (query: string) => {
  return useQuery<SuggestionProps[]>({
    queryKey: ['searchCities', query],
    queryFn: async () => {
      const {data} = await axios.get('https://api.weatherapi.com/v1/search.json', {
        params: {
          key: WEATHER_API_KEY,
          q: query,
        },
      });
      return data;
    },
    enabled: query.trim().length >= 3,
    staleTime: 60 * 60 * 1000, // 1h
  });
};
