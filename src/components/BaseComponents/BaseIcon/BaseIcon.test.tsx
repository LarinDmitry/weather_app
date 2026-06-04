import {render, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import BaseIcon from './BaseIcon';

describe('BaseIcon', () => {
  const mockPath = <path data-testid="mock-path" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;

  it('renders successfully with required props', () => {
    const {container} = render(<BaseIcon icon={mockPath} />);

    const svgElement = container.querySelector('[data-qa="base-icon"]');
    const pathElement = container.querySelector('[data-testid="mock-path"]');

    expect(svgElement).not.toBeNull();
    expect(pathElement).not.toBeNull();
  });

  it('uses default values for fill and viewBox', () => {
    const {container} = render(<BaseIcon icon={mockPath} />);
    const svgElement = container.querySelector('[data-qa="base-icon"]');

    expect(svgElement?.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(svgElement?.getAttribute('fill')).toBe('rgb(0, 0, 0)');
  });

  it('applies custom props for size (boxW, boxH) and fill color', () => {
    const {container} = render(<BaseIcon icon={mockPath} boxW={32} boxH={16} fill="rgb(255, 0, 0)" />);
    const svgElement = container.querySelector('[data-qa="base-icon"]');

    expect(svgElement?.getAttribute('viewBox')).toBe('0 0 32 16');
    expect(svgElement?.getAttribute('fill')).toBe('rgb(255, 0, 0)');
  });

  it('triggers onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const {container} = render(<BaseIcon icon={mockPath} onClick={handleClick} />);

    const svgElement = container.querySelector('[data-qa="base-icon"]');
    if (svgElement) fireEvent.click(svgElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
  });

  it('matches snapshot', () => {
    const {container} = render(<BaseIcon icon={mockPath} boxW="100" boxH="100" fill="#fff" />);
    expect(container).toMatchSnapshot();
  });
});
