import {ReactNode} from 'react';
import styled from 'styled-components';
import {toast, ToastOptions} from 'react-toastify';
import BaseIcon from '../BaseIcon/BaseIcon';
import Close from 'assets/icons/close.svg';
import {font_text_med_md, font_text_reg_sm} from 'theme/fonts';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | undefined;

interface NotificationOptions extends Omit<ToastOptions, 'type'> {
  type?: NotificationType;
  toastId: string | number;
}

const showNotification = (message: ReactNode, description: ReactNode, options: NotificationOptions): void => {
  const {type, toastId, ...rest} = options;

  toast(
    <Content data-qa="base-notification">
      {message}
      {description && <div data-qa="base-notification-description">{description}</div>}
    </Content>,
    {type, toastId, closeButton: <CloseIcon onClick={() => toast.dismiss()} icon={<Close />} />, ...rest}
  );
};

const Content = styled.div`
  ${font_text_med_md};
  color: ${({theme}) => theme.colors.dark100};
  margin-right: 0.25rem;
  padding: 0.5rem 0;
  width: 100%;

  div {
    ${font_text_reg_sm};
    color: ${({theme}) => theme.colors.dark080};
    padding: 0.5rem 0;
  }
`;

const CloseIcon = styled(BaseIcon)`
  &.MuiSvgIcon-root {
    align-self: baseline;
    width: 1.25rem;
    height: 1.25rem;
    margin-top: 0.5rem;
  }
`;

export default showNotification;
