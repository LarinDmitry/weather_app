import {FC} from 'react';
import styled from 'styled-components';
import {Location, CurrentWeather} from '../MainTypes';
import BaseIcon from 'components/BaseComponents/BaseIcon/BaseIcon';
import Temperature from 'assets/icons/temp.svg';
import Wind from 'assets/icons/wind.svg';
import {font_display_reg_sm, font_text_reg_sm, font_text_reg_xl} from 'theme/fonts';

interface Props {
  current: Location | null;
  forecast: CurrentWeather | null;
}

const HeaderInfo: FC<Props> = ({current, forecast}) => {
  if (!current || !forecast) return null;

  return (
    <Wrapper>
      <Country>
        {current.country}, {current.name}
      </Country>
      <Temp>
        <div>
          <Icon icon={<Temperature />} boxW={256} boxH={256} />{forecast.temp_c}°C
        </div>
        |
        <div>
          {forecast.wind_kph} kph
          <Icon icon={<Wind />} boxW={18} boxH={17} />
        </div>
      </Temp>
      <Weather>{forecast.condition.text}</Weather>
      <Feels>Feels like {forecast.feelslike_c}°C</Feels>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0.5rem;
`;

const Country = styled.div`
  ${font_text_reg_xl};
`;

const Temp = styled.div`
  ${font_display_reg_sm};
  display: flex;
  justify-content: center;
  column-gap: 0.5rem;
`;

const Weather = styled.div`
  ${font_text_reg_sm};
`;

const Feels = styled(Weather)`
  opacity: 0.6;
`;

const Icon = styled(BaseIcon)`
  &.MuiSvgIcon-root {
    fill: rgb(255, 255, 255);
    margin: 0 0.5rem;
  }
`;

export default HeaderInfo;
