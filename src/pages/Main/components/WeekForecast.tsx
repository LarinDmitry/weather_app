import {FC, useState, useEffect} from 'react';
import styled from 'styled-components';
import {ForecastDay} from '../MainTypes';
import WeekInfo from './WeekInfo';
import SelectDayChart from './SelectDayChart';

interface Props {
  data: ForecastDay[];
}

const WeekForecast: FC<Props> = ({data}) => {
  const [selectedDay, setSelectedDay] = useState<ForecastDay | null>(null);

  useEffect(() => {
    data.length > 0 && !selectedDay && setSelectedDay(data[0]);
  }, [data, selectedDay]);

  return (
    <Wrapper>
      <WeekInfo data={data} selectedDate={selectedDay?.date || ''} onSelectDay={setSelectedDay} />
      <SelectDayChart selectedDay={selectedDay} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: min-content 70%;
  grid-template-rows: 34rem;
  grid-gap: 1rem;
  justify-content: space-evenly;

  @media ${({theme}) => theme.breakpoints.maxLtg} {
    grid-template-columns: 1fr;
  }
`;

export default WeekForecast;
