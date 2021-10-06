import React from 'react';
import {Box} from '@mui/material';

type VerticalLineProps = {
  lineHeight?: string;
  lineWidth?: string;
  marginLeft?: number;
  marginRight?: number;
  color?: string;
};

const VerticalLine = ({
  lineHeight,
  lineWidth,
  marginLeft,
  marginRight,
  color,
}: VerticalLineProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Box
        ml={marginLeft ? marginLeft : 0}
        mr={marginRight ? marginRight : 0}
        sx={{
          height: lineHeight,
          width: lineWidth,
          bgcolor: color ? color : '#eee',
        }}
      />
    </Box>
  );
};

export default VerticalLine;
