import {FC} from 'react';
import styled from 'styled-components';
import {font_text_reg_lg, font_text_reg_sm} from 'theme/fonts';

interface Props {
  history: string[];
  onSelectCity: (cityName: string) => void;
  onRemoveCity: (cityName: string) => void;
}

const SearchHistory: FC<Props> = ({history, onSelectCity, onRemoveCity}) => {
  if (history.length === 0) return null;

  return (
    <Wrapper>
      <Title>Search history:</Title>
      <HistoryList>
        {history.map((cityName) => (
          <HistoryItem key={cityName}>
            <CityNameButton onClick={() => onSelectCity(cityName)}>{cityName}</CityNameButton>
            <RemoveButton
              onClick={(e) => {
                e.stopPropagation();
                onRemoveCity(cityName);
              }}
              title="Remove from history"
            >
              &times;
            </RemoveButton>
          </HistoryItem>
        ))}
      </HistoryList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto 1.5rem auto;
  text-align: center;
`;

const Title = styled.span`
  ${font_text_reg_sm};
  color: rgba(255, 255, 255, 0.8);
  margin-right: 0.5rem;
  display: block;
  margin-bottom: 0.5rem;
`;

const HistoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border-radius: 16px;
  padding: 0.2rem 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const CityNameButton = styled.button`
  ${font_text_reg_sm};
  background: none;
  border: none;
  color: ${({theme}) => theme.colors.dark005};
  cursor: pointer;
  padding: 0;
  margin-right: 0.4rem;
  outline: none;
`;

const RemoveButton = styled.button`
  ${font_text_reg_lg};
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  line-height: 1;
  padding: 0;
  outline: none;

  &:hover {
    color: ${({theme}) => theme.colors.error060};
  }
`;

export default SearchHistory;
