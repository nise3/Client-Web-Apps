import React from 'react';
import {styled} from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

const StyledLinearProgress = styled(LinearProgress)({
  height: 5,
  borderRadius: 10,
  backgroundColor: '#d6d6d6',
});

interface CustomLinearProgressProps {
  pathColor: string;
  activeColor: string;
  borderRadius: number;
  thickness: number;

  [x: string]: any;
}

const CustomLinearProgress: React.FC<CustomLinearProgressProps> = ({
  pathColor,
  activeColor,
  thickness,
  borderRadius,
  ...rest
}) => {
  return <StyledLinearProgress {...rest} />;
};

interface AppLinearProgressProps {
  pathColor?: string;
  borderRadius?: number;
  activeColor?: string;
  thickness?: number;
  variant?: 'buffer' | 'determinate' | 'indeterminate' | 'query';

  [x: string]: any;
}

const AppLinearProgress: React.FC<AppLinearProgressProps> = ({
  thickness = 5,
  borderRadius = 10,
  pathColor = '#d6d6d6',
  activeColor = '#1a90ff',
  variant = 'determinate',
  ...rest
}) => {
  return (
    <CustomLinearProgress
      pathColor={pathColor}
      thickness={thickness}
      borderRadius={borderRadius}
      activeColor={activeColor}
      variant={variant}
      {...rest}
    />
  );
};
export default AppLinearProgress;
