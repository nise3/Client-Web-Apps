import React from 'react';
import AppHeader from './AppHeader';
import Box from '@mui/material/Box';
import {classes, StyledBox} from './index.style';
import ContentView from '../../../../@crema/core/ContentView';
import clsx from 'clsx';
import Footer from './Footer';

interface HorLightNavProps {
  props?: any;
}

const LayoutLayout: React.FC<HorLightNavProps> = (props) => {
  return (
    <StyledBox className={clsx(classes.appMain, 'appMainHor')}>
      <AppHeader />
      <Box className={classes.mainContent}>
        <Box className={classes.mainContainer}>
          <ContentView>{props.children}</ContentView>
        </Box>
      </Box>
      <Footer />
    </StyledBox>
  );
};

export default LayoutLayout;
