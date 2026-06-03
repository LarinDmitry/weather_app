import '@tanstack/react-query';
import {AxiosError} from 'axios';

declare module '*.jpg' {
  const path: string;
  export default path;
}

declare module '*.png' {
  const path: string;
  export default path;
}

declare module '*.webp' {
  const path: string;
  export default path;
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<{title: string; detail: string}>;
  }
}

declare global {
  interface Window {
    env?: Record<string, string>;
  }
}
