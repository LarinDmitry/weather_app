import {FC} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  hideProgressBar: boolean;
  pauseOnHover: boolean;
  autoClose: number;
}

const NotificationsContainer: FC<Props> = ({hideProgressBar, pauseOnHover, autoClose}) => (
  <ToastContainer
    pauseOnHover={pauseOnHover}
    position="top-right"
    hideProgressBar={hideProgressBar}
    autoClose={autoClose}
  />
);

export default NotificationsContainer;
