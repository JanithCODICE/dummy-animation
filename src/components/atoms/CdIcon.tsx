import React from 'react';
import Svg, { SvgProps } from 'react-native-svg';

interface CdIconProps extends SvgProps {
  size?: number;
  color?: string;
  children: React.ReactNode;
}

export const CdIcon: React.FC<CdIconProps> = ({
  size = 24,
  color = '#000000',
  children,
  ...props
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none" {...props}>
      {children}
    </Svg>
  );
};

export default CdIcon;

