import {FC, ComponentPropsWithoutRef} from 'react';

interface Props extends Omit<ComponentPropsWithoutRef<'img'>, 'src'> {
  src?: string;
  alt?: string;
}

const BaseImage: FC<Props> = ({src, alt, ...other}) => <img src={src} alt={alt} data-qa="base-image" {...other} />;

export default BaseImage;
