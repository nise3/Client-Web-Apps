import React from 'react';
import AppHeader from './AppHeader';
import Box from '@mui/material/Box';
import useStyles from './index.style';
import ContentView from '../../../../@crema/core/ContentView';
import clsx from 'clsx';

interface HorLightNavProps {
  props?: any;
}

const LayoutLayout: React.FC<HorLightNavProps> = (props) => {
  const classes = useStyles(props);
  return (
    <Box className={clsx(classes.appMain, 'appMainHor')}>
      <AppHeader />
      <Box className={classes.mainContent}>
        <Box className={classes.mainContainer}>
          <ContentView>{props.children}</ContentView>
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutLayout;