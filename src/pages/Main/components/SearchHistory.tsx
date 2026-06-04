import {FC} from 'react';
import styled from 'styled-components';

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
  font-size: 0.85rem;
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
  background: none;
  border: none;
  color: ${({theme}) => theme.colors.dark005};
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
  margin-right: 0.4rem;
  outline: none;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  padding: 0;
  outline: none;

  &:hover {
    color: ${({theme}) => theme.colors.error060};
  }
`;

export default SearchHistory;
