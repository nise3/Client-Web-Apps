import React from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import SignupJwtAuth from './SignupJwtAuth';

const PREFIX = 'Signup';

const classes = {
  imgRoot: `${PREFIX}-imgRoot`,
  cardRoot: `${PREFIX}-cardRoot`,
  textUppercase: `${PREFIX}-textUppercase`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.imgRoot}`]: {
    cursor: 'pointer',
    display: 'inline-block',
    width: 140,
  },

  [`& .${classes.cardRoot}`]: {
    maxWidth: '36rem',
    width: '100%',
    overflow: 'hidden',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    position: 'relative',
    paddingTop: 20,
    [theme.breakpoints.up('xl')]: {
      paddingTop: 32,
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      width: 130,
      height: 9,
      borderBottomRightRadius: 80,
      borderBottomLeftRadius: 80,
      marginRight: 'auto',
      marginLeft: 'auto',
      backgroundColor: theme.palette.primary.main,
    },
  },

  [`& .${classes.textUppercase}`]: {
    textTransform: 'uppercase',
  },
}));

const Signup: React.FC<{}> = () => {
  return (
    <StyledBox
      flex={1}
      display='flex'
      flexDirection='column'
      justifyContent='center'>
      <Box mb={{xs: 6, md: 8, xl: 18}} textAlign='center'>
        <img
          className={classes.imgRoot}
          src={'/images/logo-white-with-name.png'}
          alt='crema-logo'
        />
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'>
        <Card className={classes.cardRoot}>
          <Box px={{xs: 6, sm: 10, xl: 15}}>
            <Box
              component='h2'
              mb={{xs: 3, xl: 6}}
              color='text.primary'
              fontSize={{xs: 24, xl: 30}}>
              <IntlMessages id='common.signup' />
            </Box>
          </Box>
          <SignupJwtAuth />
        </Card>
      </Box>
    </StyledBox>
  );
};

export default Signup;
