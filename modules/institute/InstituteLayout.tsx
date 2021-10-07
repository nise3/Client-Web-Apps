import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {ContentView} from '../../@crema';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appMain: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      // alignItems: 'center',
    },
    mainContent: {
      flex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    mainContainer: {
      flex: 1,
      width: '100%',
      color: theme.palette.text.primary,
      // maxWidth: theme.breakpoints.values.xl,
      marginRight: 'auto',
      marginLeft: 'auto',
    },
  }),
);

interface TSPLayoutHOCProps {
  props?: any;
}

const TSPLayoutHOC: React.FC<TSPLayoutHOCProps> = (props) => {
  const classes = useStyles(props);
  return (
    <Box className={clsx(classes.appMain, 'appMainHor')}>
      <Header />
      <Box className={classes.mainContent}>
        <Box className={classes.mainContainer}>
          <ContentView>{props.children}</ContentView>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default TSPLayoutHOC;
