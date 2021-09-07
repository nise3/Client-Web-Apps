import React from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {CremaTheme} from '../../types/AppContextPropsType';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../@crema/utility/IntlMessages';
import Link from 'next/link';
import {LINK_LOGIN, LINK_SIGNUP} from '../../@softbd/common/constants';

const useStyles = makeStyles((theme: CremaTheme) => ({
  imgRoot: {
    cursor: 'pointer',
    display: 'inline-block',
    width: 140,
  },
  titleWrapper: {
    fontSize: '40px',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 600,
    boxShadow: '6px 7px 8px 10px #1895de',
    padding: '30px',
  },
  loginButton: {
    background: '#155d96',
    color: '#fff',
    fontWeight: 600,
    boxShadow: '6px 7px 8px 10px #1895de',
    margin: '10px',
  },
  signupButton: {
    background: '#4caf50',
    color: '#fff',
    fontWeight: 600,
    boxShadow: '6px 7px 8px 10px #1895de',
    margin: '10px',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 'calc(100vh - 80px)',
  },
}));

const Home: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <>
      <Box flex={1}>
        <Box display='flex' justifyContent='flex-end'>
          <Link href={LINK_LOGIN}>
            <Button
              variant='contained'
              color='primary'
              className={classes.loginButton}>
              <IntlMessages id='common.login' />
            </Button>
          </Link>
          <Link href={LINK_SIGNUP}>
            <Button
              variant='contained'
              color='primary'
              className={classes.signupButton}>
              <IntlMessages id='common.signup' />
            </Button>
          </Link>
        </Box>
        <Box className={classes.contentWrapper}>
          <Box mb={{xs: 6, md: 8, xl: 18}} textAlign='center'>
            <img
              className={classes.imgRoot}
              src='/images/logo-white-with-name.png'
              alt='crema-logo'
            />
          </Box>

          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            className={classes.titleWrapper}>
            National Intelligence for Skills, Education, Employment and
            Entrepreneurship
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
