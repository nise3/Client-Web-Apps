import React, {useContext} from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import {ContentView, ThemeSetting} from '../../../index';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import useStyles from './index.style';
import clsx from 'clsx';
import AppContext from '../../../utility/AppContext';
import AppFixedFooter from './AppFixedFooter';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../../types/AppContextPropsType';
interface HeaderUserLayoutProps {
  props?: any;
}

const HeaderUserLayout: React.FC<HeaderUserLayoutProps> = props => {
  const {footer, themeStyle, layoutType, footerType} = useContext<
    AppContextPropsType
  >(AppContext);
  const classes = useStyles({footer, themeStyle});

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
      <AppHeader />

      <Box className={classes.mainContent}>
        <AppSidebar />
        <Hidden xlDown>
          <Box className={classes.mainContainer}>
            <ContentView>{props.children}</ContentView>
            <AppFixedFooter/>
          </Box>
        </Hidden>

        <Hidden lgUp>
          <Box className={classes.mainContainerFull}>
            <ContentView>{props.children}</ContentView>
            <AppFixedFooter/>
          </Box>
        </Hidden>
      </Box>
      <ThemeSetting />
    </Box>
  );
};

export default HeaderUserLayout;
