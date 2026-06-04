import {render, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import BaseImage from './BaseImage';

describe('BaseImage', () => {
  const defaultSrc = 'https://example.com/photo.png';
  const defaultAlt = 'User photo';

  it('renders successfully with provided src and alt', () => {
    const {container} = render(<BaseImage src={defaultSrc} alt={defaultAlt} />);
    const imgElement = container.querySelector('[data-qa="base-image"]');

    expect(imgElement).not.toBeNull();
    expect(imgElement?.getAttribute('src')).toBe(defaultSrc);
    expect(imgElement?.getAttribute('alt')).toBe(defaultAlt);
  });

  it('forwards any extra html attributes to the underlying img', () => {
    const {container} = render(
      <BaseImage src="pic.jpg" alt="pic" width={320} height={180} loading="lazy" className="test-image-class" />
    );

    const imgElement = container.querySelector('[data-qa="base-image"]');

    expect(imgElement).not.toBeNull();
    expect(imgElement?.getAttribute('class')).toContain('test-image-class');
    expect(imgElement?.getAttribute('width')).toBe('320');
    expect(imgElement?.getAttribute('height')).toBe('180');
    expect(imgElement?.getAttribute('loading')).toBe('lazy');
  });

  it('fires onLoad and onError event handlers', () => {
    const handleLoad = vi.fn();
    const handleError = vi.fn();
    const {container} = render(<BaseImage src="x.png" alt="x" onLoad={handleLoad} onError={handleError} />);

    const imgElement = container.querySelector('[data-qa="base-image"]');
    expect(imgElement).not.toBeNull();

    if (imgElement) {
      fireEvent(imgElement, new Event('load'));
      expect(handleLoad).toHaveBeenCalledTimes(1);

      fireEvent(imgElement, new Event('error'));
      expect(handleError).toHaveBeenCalledTimes(1);
    }
  });

  it('renders without attributes when src and alt are omitted', () => {
    const {container} = render(<BaseImage />);
    const imgElement = container.querySelector('[data-qa="base-image"]');

    expect(imgElement).not.toBeNull();
    expect(imgElement?.getAttribute('src')).toBeNull();
    expect(imgElement?.getAttribute('alt')).toBeNull();
  });

  it('matches snapshot with properties', () => {
    const {container} = render(<BaseImage src="/a.png" alt="A" className="snapshot-class" />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot without optional properties', () => {
    const {container} = render(<BaseImage />);
    expect(container).toMatchSnapshot();
  });
});
