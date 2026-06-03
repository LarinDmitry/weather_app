export interface Location {
  name: string;
  country: string;
  region?: string;
  lat: number;
  lon: number;
  localtime?: string;
}

export interface CurrentWeather {
  temp_c: number;
  feelslike_c: number;
  wind_kph: number;
  condition: {
    text: string;
    icon?: string;
    code?: number;
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: {
      text: string;
      icon?: string;
    };
  };
  hour: HourForecast[];
}

export interface HourForecast {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon?: string;
  };
}

export interface WeatherApiResponse {
  location: Location;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}