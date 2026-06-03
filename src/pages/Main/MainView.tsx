import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {getWeekForecast} from 'api/weather';
import Background from 'assets/images/bg.webp';
import Loader from 'components/GeneralComponents/Loader/Loader';
import WeekForecast from './components/WeekForecast';
import HeaderInfo from 'pages/Main/components/HeaderInfo';
import {CurrentWeather, ForecastDay, Location, WeatherApiResponse} from './MainTypes';

const Main = () => {
  const [city, setCity] = useState<string>('Kyiv');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentLocationData, setCurrentLocationData] = useState<Location | null>(null);
  const [currentForecastData, setCurrentForecastData] = useState<CurrentWeather | null>(null);
  const [weekForecastData, setWeekForecastData] = useState<ForecastDay[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getWeekForecast(city)
      .then((data: WeatherApiResponse) => {
        const {
          location,
          current: {
            condition: {text},
            temp_c,
            feelslike_c,
            wind_kph,
          },
          forecast: {forecastday},
        } = data;

        setCurrentLocationData(location);
        setCurrentForecastData({temp_c, feelslike_c, wind_kph, condition: {text}});
        setWeekForecastData(forecastday.map(({date, day, hour}: any) => ({date, day, hour})));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [city]);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchBar />
          <HeaderInfo current={currentLocationData} forecast={currentForecastData} />
          <WeekForecast data={weekForecastData} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 2rem 1.8rem;
  height: 100vh;
  background: url(${Background}) center center / cover no-repeat;
  color: ${({theme}) => theme.colors.dark005};
`;

const SearchBar = styled.div`
  background: white;
  width: 14rem;
  height: 2rem;
  margin: auto;
`;

export default Main;
