import React, {useCallback} from 'react';
import Box from '@mui/material/Box';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import makeStyles from '@mui/styles/makeStyles';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {Fonts} from '../../../shared/constants/AppEnums';
import Button from '@mui/material/Button';
import {getSSOLoginUrl} from '../../../@softbd/common/SSOConfig';

const useStyles = makeStyles((theme: CremaTheme) => ({
  formRoot: {
    textAlign: 'left',
    [theme.breakpoints.up('xl')]: {
      marginBottom: 24,
    },
  },
  myTextFieldRoot: {
    width: '100%',
  },
  checkboxRoot: {
    marginLeft: -12,
  },
  pointer: {
    cursor: 'pointer',
  },
  btnRoot: {
    // @ts-ignore
    borderRadius: theme.overrides.MuiCard.root.borderRadius,
    width: '10rem',
    fontWeight: Fonts.REGULAR,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  btnRootFull: {
    width: '100%',
  },
  dividerRoot: {
    marginBottom: 16,
    marginLeft: -48,
    marginRight: -48,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 32,
    },
  },
  textPrimary: {
    color: theme.palette.text.primary,
  },
  colorTextPrimary: {
    color: theme.palette.primary.main,
  },
  underlineNone: {
    textDecoration: 'none',
  },
  textGrey: {
    color: theme.palette.grey[500],
  },
}));

interface UserSigninProps {}

const SigninSSO: React.FC<UserSigninProps> = (props) => {
  const classes = useStyles(props);

  const redirectToSSO = useCallback(() => {
    window.location.href = getSSOLoginUrl();
  }, []);

  return (
    <Box
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
    </Box>
  );
};

export default SigninSSO;
