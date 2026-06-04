import {render} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {toast} from 'react-toastify';
import {ThemeProvider} from 'styled-components';
import showNotification from './BaseNotification';
import MainTheme from 'theme/index';

vi.mock('react-toastify', () => ({
  toast: vi.fn(),
}));

vi.mock('../BaseIcon/BaseIcon', () => ({
  default: () => <svg data-testid="mock-base-icon" />,
}));

vi.mock('assets/icons/close.svg', () => ({
  default: () => <svg data-testid="mock-close-svg" />,
}));

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider theme={MainTheme}>{ui}</ThemeProvider>);

describe('showNotification', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls toast with content and default configuration', () => {
    const options = {type: 'success' as const, toastId: 'test-id'};
    showNotification('Main Message', null, options);

    expect(toast).toHaveBeenCalledTimes(1);

    const callArgs = vi.mocked(toast).mock.calls[0];
    const renderContent = callArgs[0];
    const toastOptions = callArgs[1];

    expect(toastOptions?.type).toBe('success');
    expect(toastOptions?.toastId).toBe('test-id');
    expect(toastOptions?.closeButton).toBeDefined();

    const {container} = renderWithTheme(<>{renderContent}</>);
    const notification = container.querySelector('[data-qa="base-notification"]');

    expect(notification).not.toBeNull();
    expect(notification?.textContent).toBe('Main Message');
  });

  it('renders description when it is provided', () => {
    const options = {toastId: 123};
    showNotification('Title', 'Detailed description text', options);

    const callArgs = vi.mocked(toast).mock.calls[0];
    const renderContent = callArgs[0];

    const {container} = renderWithTheme(<>{renderContent}</>);
    const description = container.querySelector('[data-qa="base-notification-description"]');

    expect(description).not.toBeNull();
    expect(description?.textContent).toBe('Detailed description text');
  });

  it('forwards extra react-toastify options via ...rest', () => {
    const options = {
      toastId: 'id',
      autoClose: 5000,
      position: 'top-right' as const,
    };
    showNotification('Message', null, options);

    const callArgs = vi.mocked(toast).mock.calls[0];
    const toastOptions = callArgs[1];

    expect(toastOptions?.autoClose).toBe(5000);
    expect(toastOptions?.position).toBe('top-right');
  });
});
