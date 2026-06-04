import {render} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import BaseLoader from './BaseLoader';

describe('BaseLoader', () => {
  it('renders successfully with inner elements', () => {
    const {container} = render(<BaseLoader />);

    const loaderElement = container.querySelector('[data-qa="base-loader"]');
    const points = container.querySelectorAll('span');

    expect(loaderElement).not.toBeNull();
    expect(points.length).toBe(3);
  });

  it('contains initial loader class alongside styled-components classes', () => {
    const {container} = render(<BaseLoader />);
    const loaderElement = container.querySelector('[data-qa="base-loader"]');

    expect(loaderElement?.getAttribute('class')).toContain('loader');
  });

  it('forwards additional div props via ...props', () => {
    const {container} = render(<BaseLoader id="global-loader" style={{marginTop: '20px'}} />);
    const loaderElement = container.querySelector('[data-qa="base-loader"]');

    expect(loaderElement?.getAttribute('id')).toBe('global-loader');
    expect(loaderElement?.getAttribute('style')).toContain('margin-top: 20px;');
  });

  it('matches snapshot', () => {
    const {container} = render(<BaseLoader className="custom-loader" />);
    expect(container).toMatchSnapshot();
  });
});
