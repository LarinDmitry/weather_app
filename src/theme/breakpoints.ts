interface Sizes {
  xs: string;
  sm: string;
  tb: string;
  md: string;
  lt: string;
  ltg: string;
  lg: string;
  xl: string;
}

const size: Sizes = {
  xs: '375px',
  sm: '600px',
  tb: '768px',
  md: '900px',
  lt: '1024px',
  ltg: '1280px',
  lg: '1366px',
  xl: '1536px',
};

export default {
  maxXs: `(max-width: ${size.xs})`,
  maxSm: `(max-width: ${size.sm})`,
  maxTb: `(max-width: ${size.tb})`,
  maxMd: `(max-width: ${size.md})`,
  maxLt: `(max-width: ${size.lt})`,
  maxLtg: `(max-width: ${size.ltg})`,
  maxLg: `(max-width: ${size.lg})`,
  maxXl: `(max-width: ${size.xl})`,
  minXs: `(min-width: ${size.xs})`,
  minSm: `(min-width: ${size.sm})`,
  minTb: `(min-width: ${size.tb})`,
  minMd: `(min-width: ${size.md})`,
  minLt: `(min-width: ${size.lt})`,
  minLtg: `(min-width: ${size.ltg})`,
  minLg: `(min-width: ${size.lg})`,
  minXl: `(min-width: ${size.xl})`,
};
