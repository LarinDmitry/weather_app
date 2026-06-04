import React, {FC, useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useSearchCities} from 'api/weather';
import showNotification from 'components/BaseComponents/BaseNotification';
import BaseIcon from 'components/BaseComponents/BaseIcon/BaseIcon';
import Close from 'assets/icons/close.svg';
import {font_text_reg_md, font_text_reg_sm} from 'theme/fonts';

interface Props {
  onSelectCity: (cityName: string) => void;
}

const SearchBar: FC<Props> = ({onSelectCity}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 400);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const {data: suggestions = [], error} = useSearchCities(debouncedValue);

  useEffect(() => {
    suggestions.length > 0 && debouncedValue.trim().length >= 3 && setIsOpen(true);
  }, [suggestions, debouncedValue]);

  useEffect(() => {
    if (error) {
      showNotification('Error while searching', error as any, {type: 'error', toastId: 1});
      console.error('Error while searching:', error);
    }
  }, [error]);

  useEffect(() => {
    const handleClickOutside = ({target}: MouseEvent) =>
      wrapperRef.current && !wrapperRef.current.contains(target as Node) && setIsOpen(false);
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (cityName: string) => {
    setInputValue(cityName);
    onSelectCity(cityName);
    setIsOpen(false);
  };

  return (
    <Wrapper ref={wrapperRef}>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={({target: {value}}) => setInputValue(value)}
          onFocus={() => inputValue.length >= 3 && setIsOpen(true)}
        />
        {inputValue.length > 0 && (
          <CloseIcon
            icon={<Close />}
            onClick={() => {
              setInputValue('');
              setDebouncedValue('');
            }}
          />
        )}
      </InputWrapper>
      {isOpen && suggestions.length > 0 && (
        <Dropdown>
          {suggestions.map(({id, name, country}) => (
            <DropdownItem key={id} onClick={() => handleSelect(name)}>
              {name}, <CountrySpan>{country}</CountrySpan>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 16rem;
  margin: 0 auto;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CloseIcon = styled(BaseIcon)`
  &.MuiSvgIcon-root {
    position: absolute;
    right: 0.25rem;
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
  }
`;

const Input = styled.input`
  ${font_text_reg_md};
  width: 100%;
  height: 2.5rem;
  padding: 0 2rem 0 1rem;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 2.8rem;
  left: 0;
  width: 100%;
  background: ${({theme}) => theme.colors.dark005};
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  max-height: 15rem;
  overflow-y: auto;
  z-index: 10;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const DropdownItem = styled.li`
  ${font_text_reg_sm};
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: ${({theme}) => theme.colors.dark080};
`;

const CountrySpan = styled.span`
  color: ${({theme}) => theme.colors.dark025};
  font-size: 0.8rem;
`;

export default SearchBar;
