import React from 'react';
import AppHeader from './AppHeader';
import Box from '@mui/material/Box';
import {classes, StyledBox} from './index.style';
import clsx from 'clsx';
import ContentView from '../../../../@crema/core/ContentView';
import Footer from '../../../../modules/home/Footer';
import AccessibilityToolbar from '../../../components/accessibility/AccessibilityToolbar';

interface HorLightNavProps {
  props?: any;
}

const NiseLayout: React.FC<HorLightNavProps> = (props) => {
  return (
    <StyledBox className={clsx(classes.appMain, 'appMainHor')}>
      <AppHeader />
      <Box className={classes.mainContent}>
        <Box className={classes.mainContainer}>
          <ContentView>{props.children}</ContentView>
        </Box>
      </Box>
      <Footer />
      <AccessibilityToolbar />
    </StyledBox>
  );
};

export default NiseLayout;
