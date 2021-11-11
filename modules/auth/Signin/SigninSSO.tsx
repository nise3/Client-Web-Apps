import React, {useCallback} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../shared/constants/AppEnums';
import Button from '@mui/material/Button';
import {getSSOLoginUrl} from '../../../@softbd/common/SSOConfig';

const PREFIX = 'SigninSSO';

const classes = {
  btnRoot: `${PREFIX}-btnRoot`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.btnRoot}`]: {
    // @ts-ignore
    borderRadius: theme.components.MuiCard.styleOverrides.root.borderRadius, // TODO: css issue - CRITICAL
    width: '10rem',
    fontWeight: Fonts.REGULAR,
    fontSize: 16,
    textTransform: 'capitalize',
  },
}));

interface UserSigninProps {}

const SigninSSO: React.FC<UserSigninProps> = (props) => {
  const redirectToSSO = useCallback(() => {
    window.location.href = getSSOLoginUrl();
  }, []);

  return (
    <StyledBox
      mb={6}
      display='flex'
      alignItems={{sm: 'center'}}
      justifyContent={{sm: 'center'}}>
      <Button
        onClick={redirectToSSO}
        variant='contained'
        color='secondary'
        type='submit'
        className={classes.btnRoot}>
        <IntlMessages id='common.login' />
      </Button>
    </StyledBox>
  );
};

export default SigninSSO;
