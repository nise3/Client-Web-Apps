import React, {useContext} from 'react';
import {Box} from '@mui/material';
import {ThemeMode} from '../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../types/AppContextPropsType';
import AppContext from '../../../@crema/utility/AppContext';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((/*theme*/) => ({
  logoRoot: {
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  logo: {
    height: 48,
    marginRight: 10,
  },
  texts: {
    maxWidth: 256,
    textAlign: 'center',
  },
  textTop: {
    fontSize: 12,
    fontWeight: 600,
    marginTop: 3,
  },
  textBottom: {
    fontSize: 9,
    color: '#6f95ca', //theme.palette.primary.main,
  },
  logoLast: {
    marginLeft: 10,
    width: 48,
  },
  logoInstitute: {
    width: '100%',
    height: 48,
    objectFit: 'contain',
  },
}));

type Prop = {
  instituteName: string;
  instituteLogo: string;
  className?: any;
};

const LogoCustomizable = ({instituteName, instituteLogo, className}: Prop) => {
  const {themeMode} = useContext<AppContextPropsType>(AppContext);
  const classes = useStyles();
  return (
    <Box className={className}>
      <Box className={classes.logoRoot}>
        <Box sx={{display: {md: 'none', sm: 'block'}}}>
          <img
            className={classes.logo}
            src={
              themeMode === ThemeMode.DARK
                ? '/images/logo-white.png'
                : '/images/logo.png'
            }
            alt='crema-logo'
          />
        </Box>
        <Box sx={{display: {xs: 'none', md: 'block'}}}>
          <img
            className={classes.logo}
            src={
              themeMode === ThemeMode.DARK
                ? '/images/logo-white-with-name.png'
                : '/images/logo-with-name.png'
            }
            alt='crema-logo'
          />
        </Box>
        <Box className={classes.texts}>
          <Box className={classes.textTop}>
            National Intelligence for Skills Education, Employment and
            Entrepreneurship
          </Box>
          <Box className={classes.textBottom}>{instituteName}</Box>
        </Box>
        <Box className={classes.logoLast}>
          <img
            className={classes.logoInstitute}
            src={instituteLogo}
            alt='crema-logo'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LogoCustomizable;
