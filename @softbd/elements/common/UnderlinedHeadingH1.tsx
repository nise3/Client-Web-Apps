import React, {ReactNode} from 'react';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';
import {H1} from './index';
import {useCustomStyle} from '../../hooks/useCustomStyle';

const PREFIX = 'UnderlinedHeading';

const classes = {
  heading: `${PREFIX}-heading`,
  line: `${PREFIX}-line`,
  lineOne: `${PREFIX}-lineOne`,
  lineTwo: `${PREFIX}-lineTwo`,
};

const StyledBoxLine = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 48,

  [`& .${classes.lineOne}`]: {
    background: '#33c2a7',
    width: 120,
    height: 3,
  },

  [`& .${classes.lineTwo}`]: {
    background: '#f5a000',
    width: 100,
    height: 3,
  },
}));

type Props = {
  children?: ReactNode;
};

const UnderlinedHeading = ({children}: Props) => {
  const result = useCustomStyle();
  return (
    <>
      <H1
        sx={{
          ...result.h2,
          fontSize: '1.875rem',
          color: 'primary.main',
          textAlign: 'center',
          marginBottom: '20px',
          fontWeight: 'bold',
        }}
        gutterBottom={true}
        fontWeight='fontWeightBold'>
        {children}
      </H1>
      <StyledBoxLine mb={12}>
        <Box className={classes.lineOne} />
        <Box className={classes.lineTwo} />
      </StyledBoxLine>
    </>
  );
};

export default UnderlinedHeading;
