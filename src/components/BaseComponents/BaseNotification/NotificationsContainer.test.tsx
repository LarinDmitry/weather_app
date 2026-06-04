import {render} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import {ToastContainer} from 'react-toastify';
import NotificationsContainer from './NotificationsContainer';

vi.mock('react-toastify', () => ({
  ToastContainer: vi.fn(() => <div data-testid="mock-toast-container" />),
}));

describe('NotificationsContainer Component', () => {
  it('renders ToastContainer with correct props', () => {
    render(<NotificationsContainer hideProgressBar={true} pauseOnHover={false} autoClose={3000} />);

    expect(ToastContainer).toHaveBeenCalledTimes(1);

    const callArgs = vi.mocked(ToastContainer).mock.calls[0][0];

    expect(callArgs.hideProgressBar).toBe(true);
    expect(callArgs.pauseOnHover).toBe(false);
    expect(callArgs.autoClose).toBe(3000);
    expect(callArgs.position).toBe('top-right');
  });

  it('matches snapshot', () => {
    const {container} = render(<NotificationsContainer hideProgressBar={false} pauseOnHover={true} autoClose={5000} />);
    expect(container).toMatchSnapshot();
  });
});
