import {render} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import NotFoundView from './NotFoundView';

vi.mock('components/GeneralComponents/NoContentPlug', () => ({
  default: () => <div data-testid="mock-no-content-plug" />,
}));

describe('NotFoundView Component', () => {
  it('matches snapshot', () => {
    const {container} = render(<NotFoundView />);
    expect(container).toMatchSnapshot();
  });
});
