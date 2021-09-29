import React from 'react';
import AppHeader from './AppHeader';
import {ContentView} from '../../../../index';
import Box from '@material-ui/core/Box';
import useStyles from './index.style';
import clsx from 'clsx';

interface HorLightNavProps {
  props?: any;
}

const HorLightNav: React.FC<HorLightNavProps> = (props) => {
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

export default HorLightNav;
