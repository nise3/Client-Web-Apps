import React from 'react';
import AppHeader from './AppHeader';
import Box from '@mui/material/Box';
import useStyles from './index.style';
import clsx from 'clsx';
import ContentView from '../../../../@crema/core/ContentView';
import Footer from '../../../../modules/home/Footer';

interface HorLightNavProps {
  props?: any;
}

const NiseLayout: React.FC<HorLightNavProps> = (props) => {
  const classes = useStyles(props);
  return (
    <Box className={clsx(classes.appMain, 'appMainHor')}>
      <AppHeader />
      <Box className={classes.mainContent}>
        <Box className={classes.mainContainer}>
          <ContentView>{props.children}</ContentView>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default NiseLayout;
