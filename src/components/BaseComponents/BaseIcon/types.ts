import type {ChangeEvent, ReactNode} from 'react';

export interface BaseIconProps {
  icon: ReactNode;
  fill?: string;
  boxW?: number | string;
  boxH?: number | string;
  onClick?: (e: ChangeEvent<unknown>) => void;
}
