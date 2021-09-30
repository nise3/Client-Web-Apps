import React, {useContext} from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import {ContentView, ThemeSetting} from '../../../index';
import Box from '@mui/material/Box';
import useStyles from './index.style';
import clsx from 'clsx';
import AppContext from '../../../utility/AppContext';
import AppFixedFooter from './AppFixedFooter';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../../types/AppContextPropsType';

interface StandardLayoutProps {
  props?: any;
}

const StandardLayout: React.FC<StandardLayoutProps> = (props) => {
  const {footer, themeStyle, layoutType, footerType} =
    useContext<AppContextPropsType>(AppContext);
  const classes = useStyles({footer, themeStyle});
  console.log('StandardLayout');

  return (
    <Box
      className={clsx(
        classes.appMain,
        layoutType === LayoutType.BOXED ? classes.boxedLayout : '',
        {
          appMainFooter: footer && footerType === 'fluid',
          appMainFixedFooter: footer && footerType === 'fixed',
        },
      )}>
      <AppSidebar />

      <Box className={classes.mainContent}>
        {/*<Hidden xlDown>*/}
        {/*  <Box className={classes.mainContainer}>*/}
        {/*    <AppHeader />*/}
        {/*    <ContentView>{props.children}</ContentView>*/}
        {/*    <AppFixedFooter />*/}
        {/*  </Box>*/}
        {/*</Hidden>*/}

        {/*<Hidden lgUp>*/}
        {/*  <Box className={classes.mainContainerFull}>*/}
        {/*    <AppHeader />*/}
        {/*    <ContentView>{props.children}</ContentView>*/}
        {/*    <AppFixedFooter />*/}
        {/*  </Box>*/}
        {/*</Hidden>*/}
        <Box className={classes.mainContainer}>
          <AppHeader />
          <ContentView>{props.children}</ContentView>
          <AppFixedFooter />
        </Box>
      </Box>
      <ThemeSetting />
    </Box>
  );
};

export default StandardLayout;
