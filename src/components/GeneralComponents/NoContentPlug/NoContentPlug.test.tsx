import {render} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import NoContentPlug from './NoContentPlug';

vi.mock('components/BaseComponents/BaseImage', () => ({
  default: (props: any) => <img data-testid="mock-base-image" alt="mock-alt" {...props} />,
}));

vi.mock('assets/images/no_content.webp', () => ({
  default: 'mocked-no-content-path.webp',
}));

describe('NoContentPlug Component', () => {
  it('renders successfully and passes correct src to BaseImage', () => {
    const {container} = render(<NoContentPlug />);

    const baseImage = container.querySelector('[data-testid="mock-base-image"]');

    expect(baseImage).not.toBeNull();
    expect(baseImage?.getAttribute('src')).toBe('mocked-no-content-path.webp');
  });

  it('matches snapshot', () => {
    const {container} = render(<NoContentPlug />);
    expect(container).toMatchSnapshot();
  });
});
