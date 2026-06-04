import {FC} from 'react';
import styled from 'styled-components';
import {useRouteError} from 'react-router';
import {font_display_med_md, font_display_med_sm} from 'theme/fonts';
import {ErrorBoundaryProps, ErrorMessageProps} from './types';

const ErrorFallback: FC<ErrorBoundaryProps> = ({error}) => {
  const routerError = useRouteError() as ErrorMessageProps;

  return (
    <Wrapper>
      <div>Something went wrong:</div>
      <ErrorText>{error?.message || routerError?.message}</ErrorText>
      <Button onClick={() => window.location.reload()}>Try again</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${font_display_med_md};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 1rem;
`;

const ErrorText = styled.div`
  ${font_display_med_sm};
`;

const Button = styled.button`
  padding: 8px 36px;
  background-color: rgb(255, 255, 255);
  border: none;

  &:hover {
    border: none;
  }
`;

export default ErrorFallback;
