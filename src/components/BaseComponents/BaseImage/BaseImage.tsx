import {FC} from 'react';
import {BaseImageProps} from 'components/BaseComponents/BaseImage/types';

const BaseImage: FC<BaseImageProps> = ({src, alt, ...other}) => (
  <img src={src} alt={alt} data-qa="base-image" {...other} />
);

export default BaseImage;
