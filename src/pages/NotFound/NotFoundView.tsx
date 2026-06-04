import React from 'react';
import styled from 'styled-components';
import NoContentPlug from 'components/GeneralComponents/NoContentPlug';

const NotFoundView = () => {
  console.log('Not Found View');

  return (
    <Wrapper>
      <NoContentPlug />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default NotFoundView;
