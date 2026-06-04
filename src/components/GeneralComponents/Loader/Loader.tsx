import styled from 'styled-components';
import BaseLoader from 'components/BaseComponents/BaseLoader';

const Loader = () => (
  <Wrapper>
    <BaseLoader />
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loader;
