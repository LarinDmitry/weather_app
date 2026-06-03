import type {FC} from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import BaseImage from 'components/BaseComponents/BaseImage/BaseImage';
import {ForecastDay} from '../MainTypes';

interface Props {
  data: ForecastDay[];
  selectedDate: string;
  onSelectDay: (day: ForecastDay) => void;
}

const WeekInfo: FC<Props> = ({data, selectedDate, onSelectDay}) => (
  <Wrapper>
    {data.map((item) => {
      const {
        date,
        day: {
          condition: {icon},
          maxtemp_c,
          mintemp_c,
        },
      } = item;

      return (
        <Forecast key={date} isactive={date === selectedDate} onClick={() => onSelectDay(item)}>
          {dayjs(date).format('D MMM ddd')}
          <BaseImage src={icon} />
          <Max>{maxtemp_c}°C</Max>
          <Min>{mintemp_c}°C</Min>
        </Forecast>
      );
    })}
  </Wrapper>
);

const Wrapper = styled.div`
  backdrop-filter: blur(20px);
  border-radius: 16px;
  justify-self: center;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media ${({theme}) => theme.breakpoints.maxLtg} {
    justify-self: left;
  }

  @media ${({theme}) => theme.breakpoints.maxSm} {
    justify-self: center;
  }
`;

const Forecast = styled.div<{isactive: boolean}>`
  display: grid;
  align-items: center;
  grid-column-gap: 0.5rem;
  grid-template-columns: 7rem 5rem 4rem 4rem;
  cursor: pointer;
  margin: 0.75rem;
  padding: 0 0.8rem;
  transition: background 0.2s ease-in-out;
  border-left: 2px solid
    ${({
      isactive,
      theme: {
        colors: {primary_blue},
      },
    }) => (isactive ? primary_blue : 'transparent')};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  img {
    width: 4rem;
    height: 4rem;
  }
`;

const Max = styled.div`
  color: ${({theme}) => theme.colors.error060};
`;

const Min = styled.div`
  color: ${({theme}) => theme.colors.work040};
  opacity: 0.6;
`;

export default WeekInfo;
