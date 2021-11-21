import React, {useContext} from 'react';
import {Box} from '@mui/material';
import AppContext from '../../../@crema/utility/AppContext';
import {ThemeMode} from '../../constants/AppEnums';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';

const AppLogo = ({height = 40}) => {
  const {themeMode} = useContext<AppContextPropsType>(AppContext);

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'center',
      }}>
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
          alt='Nise3'
        />
      </Box>
    </Box>
  );
};

export default AppLogo;
