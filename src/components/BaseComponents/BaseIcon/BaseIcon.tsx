import type {FC} from 'react';
import styled from 'styled-components';
import SvgIcon from '@mui/material/SvgIcon';
import {BaseIconProps} from './types';

const BaseIcon: FC<BaseIconProps> = ({icon, onClick, fill = 'rgb(0, 0, 0)', boxW = 24, boxH = 24, ...other}) => (
  <Wrapper fill={fill} viewBox={`0 0 ${boxW} ${boxH}`} onClick={onClick} data-qa="base-icon" {...other}>
    {icon}
  </Wrapper>
);

const Wrapper = styled(SvgIcon)`
  &.MuiSvgIcon-root {
    fill: ${({fill}) => fill};
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default BaseIcon;
