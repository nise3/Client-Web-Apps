import React, {useContext} from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import {ContentView, ThemeSetting} from '../../../../@crema';
import Box from '@mui/material/Box';
import {classes, StyledBox} from './index.style';
import clsx from 'clsx';
import AppContext from '../../../../@crema/utility/AppContext';
import AppFixedFooter from './AppFixedFooter';
import {LayoutType} from '../../../../shared/constants/AppEnums';
import AppContextPropsType from '../../../../redux/types/AppContextPropsType';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Theme} from '@mui/system';

interface StandardLayoutProps {
  props?: any;
}

const StandardLayout: React.FC<StandardLayoutProps> = (props) => {
  const {footer, layoutType, footerType} =
    useContext<AppContextPropsType>(AppContext);

  const breakpointMDUp = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  );

  return (
    <StyledBox
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
        {breakpointMDUp ? (
          <Box className={classes.mainContainer}>
            <AppHeader />
            <ContentView>{props.children}</ContentView>
            <AppFixedFooter />
          </Box>
        ) : (
          <Box className={classes.mainContainerFull}>
            <AppHeader />
            <ContentView>{props.children}</ContentView>
            <AppFixedFooter />
          </Box>
        )}
      </Box>
      <ThemeSetting />
    </StyledBox>
  );
};

export default StandardLayout;
