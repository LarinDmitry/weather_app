import {FC} from 'react';
import {Outlet} from 'react-router';
import styled from 'styled-components';

const PageLayout: FC = () => (
  <Wrapper>
    <Content>
      <Outlet />
    </Content>
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
`;

const Content = styled.div`
  container: page-layout / inline-size;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default PageLayout;
