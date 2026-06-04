import {ToastOptions} from 'react-toastify';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | undefined;

export interface NotificationOptions extends Omit<ToastOptions, 'type'> {
  type?: NotificationType;
  toastId: string | number;
}

export interface ContainerProps {
  hideProgressBar: boolean;
  pauseOnHover: boolean;
  autoClose: number;
}
