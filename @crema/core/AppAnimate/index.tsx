import React, {ReactNode} from 'react';
import {Box} from '@material-ui/core';

interface AppAnimationProps {
  children: ReactNode | any;
  animation?: string;
  delay?: number;

  [x: string]: any;
}

const AppAnimation: React.FC<AppAnimationProps> = ({
  children,
  animation,
  delay,
}) => {
  return <Box>{children}</Box>;
};

export default AppAnimation;
