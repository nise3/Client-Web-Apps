import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Typography} from '@mui/material';
import {useIntl} from 'react-intl';

const PREFIX = 'ImmigrantsUnderlinedHeading';

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

  [`& .${classes.lineOne}`]: {
    background: '#33c2a7',
    width: 70,
    height: 3,
  },

  [`& .${classes.lineTwo}`]: {
    background: '#f5a000',
    width: 60,
    height: 3,
  },
}));

const ImmigrantsUnderlinedHeading = () => {
  const {messages} = useIntl();
  return (
    <>
      <Typography
        variant='h5'
        sx={{
          fontSize: '1.875rem',
          color: 'primary.main',
          textAlign: 'center',
          marginBottom: '5px',
        }}
        gutterBottom={true}
        fontWeight='fontWeightBold'>
        {messages['migration_portal.immigrant']}
      </Typography>
      <Typography
        variant='h5'
        sx={{
          fontSize: '1.875rem',
          color: 'primary.main',
          textAlign: 'center',
          marginBottom: '5px',
        }}
        gutterBottom={true}
        fontWeight='fontWeightBold'>
        {messages['migration_portal.lifecycle']}
      </Typography>
      <StyledBoxLine>
        <Box className={classes.lineOne} />
        <Box className={classes.lineTwo} />
      </StyledBoxLine>
    </>
  );
};

export default ImmigrantsUnderlinedHeading;
