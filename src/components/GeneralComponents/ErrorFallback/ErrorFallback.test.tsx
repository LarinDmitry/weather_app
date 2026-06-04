import {render, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach, afterAll} from 'vitest';
import {useRouteError} from 'react-router';
import ErrorFallback from './ErrorFallback';

vi.mock('react-router', () => ({
  useRouteError: vi.fn(),
}));

describe('ErrorFallback Component', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {reload: vi.fn()},
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation,
    });
  });

  it('renders error message from props when provided', () => {
    vi.mocked(useRouteError).mockReturnValue(null);

    const {container} = render(<ErrorFallback error={{message: 'Props Error Mock'}} />);
    const errorText = container.querySelector('div:nth-child(2)');

    expect(container.textContent).toContain('Something went wrong:');
    expect(errorText?.textContent).toBe('Props Error Mock');
  });

  it('renders error message from react-router when props are omitted', () => {
    vi.mocked(useRouteError).mockReturnValue({message: 'Router Error Mock'});

    const {container} = render(<ErrorFallback />);
    const errorText = container.querySelector('div:nth-child(2)');

    expect(errorText?.textContent).toBe('Router Error Mock');
  });

  it('triggers window.location.reload when Try Again button is clicked', () => {
    vi.mocked(useRouteError).mockReturnValue({message: 'Some Error'});

    const {container} = render(<ErrorFallback />);
    const button = container.querySelector('button');

    if (button) fireEvent.click(button);

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    vi.mocked(useRouteError).mockReturnValue({message: 'Snapshot Error'});

    const {container} = render(<ErrorFallback error={{message: 'Props Error'}} />);
    expect(container).toMatchSnapshot();
  });
});
