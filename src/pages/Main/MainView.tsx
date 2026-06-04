import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {getWeekForecast} from 'api/weather';
import showNotification from 'components/BaseComponents/BaseNotification/BaseNotification';
import Loader from 'components/GeneralComponents/Loader/Loader';
import WeekForecast from './components/WeekForecast';
import HeaderInfo from './components/HeaderInfo';
import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import {CurrentWeather, ForecastDay, Location, WeatherApiResponse} from './MainTypes';
import Background from 'assets/images/bg.webp';

const Main = () => {
  const [city, setCity] = useState<string>('Kyiv');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentLocationData, setCurrentLocationData] = useState<Location | null>(null);
  const [currentForecastData, setCurrentForecastData] = useState<CurrentWeather | null>(null);
  const [weekForecastData, setWeekForecastData] = useState<ForecastDay[]>([]);

  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('weather_search_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyDeleted, setRecentlyDeleted] = useState<{city: string; index: number} | null>(null);
  const [showUndoToast, setShowUndoToast] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('weather_search_history', JSON.stringify(history));
  }, [history]);

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
        setWeekForecastData(forecastday.map(({date, day, hour}) => ({date, day, hour})));
        addToHistory(location.name);
      })
      .catch((e) => {
        showNotification('Error loading service', e, {type: 'error', toastId: 1});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [city]);

  const addToHistory = (cityName: string) => {
    setHistory((prev) => {
      // Delete the city if it already exists add move it to the top of the list
      const filtered = prev.filter((item) => item.toLowerCase() !== cityName.toLowerCase());
      // History limit to 5 elements for suitable space
      return [cityName, ...filtered].slice(0, 5);
    });
  };

  const removeFromHistory = (cityName: string) => {
    const index = history.indexOf(cityName);
    if (index !== -1) {
      setRecentlyDeleted({city: cityName, index});
      setShowUndoToast(true);
      setHistory((prev) => prev.filter((item) => item !== cityName));
    }
  };

  const handleUndo = () => {
    if (recentlyDeleted) {
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory.splice(recentlyDeleted.index, 0, recentlyDeleted.city);
        return newHistory;
      });
      setRecentlyDeleted(null);
      setShowUndoToast(false);
    }
  };

  // Timer to automatically hide the Undo bar after 5 seconds
  useEffect(() => {
    if (showUndoToast) {
      const timer = setTimeout(() => {
        setShowUndoToast(false);
        setRecentlyDeleted(null);
      }, 115000);
      return () => clearTimeout(timer);
    }
  }, [showUndoToast]);

  return (
    <Wrapper>
      <SearchHistory history={history} onSelectCity={setCity} onRemoveCity={removeFromHistory} />
      <SearchBar onSelectCity={setCity} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <HeaderInfo current={currentLocationData} forecast={currentForecastData} />
          <WeekForecast data={weekForecastData} />
        </>
      )}

      {showUndoToast && recentlyDeleted && (
        <UndoToast>
          City {recentlyDeleted.city} was removed from history.
          <UndoButton onClick={handleUndo}>Cancel</UndoButton>
        </UndoToast>
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

const UndoToast = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: ${({theme}) => theme.colors.dark005};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 100;
  font-size: 0.9rem;
`;

const UndoButton = styled.button`
  background: ${({theme}) => theme.colors.work080};
  border: none;
  color: ${({theme}) => theme.colors.dark100};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: ${({theme}) => theme.colors.work060};
  }
`;

export default Main;
