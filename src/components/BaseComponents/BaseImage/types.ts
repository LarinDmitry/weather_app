import {ComponentPropsWithoutRef} from 'react';

export interface BaseImageProps extends Omit<ComponentPropsWithoutRef<'img'>, 'src'> {
  src?: string;
  alt?: string;
}
