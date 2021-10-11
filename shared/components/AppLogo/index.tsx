import React, {useContext} from 'react';
import {Box} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import AppContext from '../../../@crema/utility/AppContext';
import {ThemeMode} from '../../constants/AppEnums';
import AppContextPropsType from '../../../types/AppContextPropsType';

const useStyles = makeStyles(() => ({
  logoRoot: {
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
    alignItems: 'center',
  },
}));

const AppLogo = ({height = 40}) => {
  const {themeMode} = useContext<AppContextPropsType>(AppContext);
  const classes = useStyles();
  return (
    <Box className={classes.logoRoot}>
      <Box sx={{display: {md: 'none', sm: 'block'}}}>
        <img
          style={{height}}
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
          style={{height}}
          src={
            themeMode === ThemeMode.DARK
              ? '/images/logo-white-with-name.png'
              : '/images/logo-with-name.png'
          }
          alt='crema-logo'
        />
      </Box>
    </Box>
  );
};

export default AppLogo;
