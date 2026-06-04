import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useWeekForecast} from 'api/weather';
import showNotification from 'components/BaseComponents/BaseNotification';
import Loader from 'components/GeneralComponents/Loader/Loader';
import WeekForecast from './components/WeekForecast';
import HeaderInfo from './components/HeaderInfo';
import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import Background from 'assets/images/bg.webp';
import {font_text_bold_md, font_text_reg_sm} from 'theme/fonts';

const Main = () => {
  const [city, setCity] = useState<string>('Kyiv');

  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('weather_search_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyDeleted, setRecentlyDeleted] = useState<{city: string; index: number} | null>(null);
  const [showUndoToast, setShowUndoToast] = useState<boolean>(false);

  const {data, isLoading, error} = useWeekForecast(city);

  useEffect(() => {
    localStorage.setItem('weather_search_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    error && showNotification('Error loading service', error as any, {type: 'error', toastId: 1});
  }, [error]);

  useEffect(() => {
    data?.location?.name && addToHistory(data.location.name);
  }, [data?.location?.name]);

  const addToHistory = (cityName: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== cityName.toLowerCase());
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

  useEffect(() => {
    if (showUndoToast) {
      const timer = setTimeout(() => {
        setShowUndoToast(false);
        setRecentlyDeleted(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showUndoToast]);

  const currentLocationData = data ? data.location : null;
  const currentForecastData = data
    ? {
        temp_c: data.current.temp_c,
        feelslike_c: data.current.feelslike_c,
        wind_kph: data.current.wind_kph,
        condition: {text: data.current.condition.text},
      }
    : null;
  const weekForecastData = data ? data.forecast.forecastday.map(({date, day, hour}) => ({date, day, hour})) : [];

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

  @media ${({theme}) => theme.breakpoints.maxSm} {
    height: auto;
    text-align: center;
    padding: 2rem 1rem;
  }
`;

const UndoToast = styled.div`
  ${font_text_reg_sm};
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
`;

const UndoButton = styled.button`
  ${font_text_bold_md};
  background: ${({theme}) => theme.colors.work080};
  border: none;
  color: ${({theme}) => theme.colors.dark100};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${({theme}) => theme.colors.work060};
  }
`;

export default Main;
