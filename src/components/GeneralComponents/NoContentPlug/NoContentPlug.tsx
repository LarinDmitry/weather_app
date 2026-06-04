import styled from 'styled-components';
import BaseImage from 'components/BaseComponents/BaseImage';
import NoContent from 'assets/images/no_content.webp';

const NoContentPlug = () => <Wrapper src={NoContent} />;

const Wrapper = styled(BaseImage)`
  width: 30rem;
`;

export default NoContentPlug;
