import {render} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import Loader from './Loader';

vi.mock('components/BaseComponents/BaseLoader', () => ({
  default: () => <div data-testid="mock-base-loader" />,
}));

describe('Loader Component', () => {
  it('renders successfully and contains BaseLoader', () => {
    const {container} = render(<Loader />);

    const baseLoader = container.querySelector('[data-testid="mock-base-loader"]');

    expect(container.firstChild).not.toBeNull();
    expect(baseLoader).not.toBeNull();
  });

  it('matches snapshot', () => {
    const {container} = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});
