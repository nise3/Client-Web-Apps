import React from 'react';
import {styled} from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import {ContentView} from '../../../../@crema';
import Box from '@mui/material/Box';
import AccessibilityToolbar from '../../../components/accessibility/AccessibilityToolbar';

const PREFIX = 'IndustryDefaultLayout';

const classes = {
  mainContent: `${PREFIX}-mainContent`,
  mainContainer: `${PREFIX}-mainContainer`,
};

const StyledBox = styled(Box)(({theme}) => ({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  // alignItems: 'center',

  [`& .${classes.mainContent}`]: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  [`& .${classes.mainContainer}`]: {
    flex: 1,
    width: '100%',
    color: theme.palette.text.primary,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
}));

interface IndustryDefaultLayoutProps {
  props?: any;
}

const IndustryDefaultLayout: React.FC<IndustryDefaultLayoutProps> = (props) => {
  return (
    <StyledBox className={'appMainHor'}>
      <AccessibilityToolbar />
      <Header />
      <Box className={classes.mainContent}>
        <Box className={classes.mainContainer}>
          <ContentView>{props.children}</ContentView>
        </Box>
      </Box>
      <Footer />
    </StyledBox>
  );
};

export default IndustryDefaultLayout;
