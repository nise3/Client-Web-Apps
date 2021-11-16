import React from 'react';
import clsx from 'clsx';
import UserInfo from '../../../../shared/components/UserInfo';
import Navigation from '../../../../@crema/core/Navigation/VerticleNav';
import {toggleNavCollapsed} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import {classes, StyledBox, StyledDrawer} from './AppSidebar.style';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import {AppState} from '../../../../redux/store';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Theme} from '@mui/system';

interface AppSidebarProps {
  position?: 'left' | 'bottom' | 'right' | 'top';
  variant?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  position = 'left',
  variant = '',
}) => {
  const dispatch = useDispatch();
  const {navCollapsed} = useSelector<AppState, AppState['settings']>(
    ({settings}) => settings,
  );

  const handleToggleDrawer = () => {
    dispatch(toggleNavCollapsed());
  };

  let sidebarClasses = classes.sidebarStandard;

  const breakpointMDUp = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  );

  return (
    <>
      {breakpointMDUp ? (
        <StyledBox
          height='100%'
          className={clsx(classes.container, 'app-sidebar')}>
          <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
            <UserInfo />
            <Scrollbar className={classes.scrollAppSidebar}>
              <Navigation />
            </Scrollbar>
          </Box>
        </StyledBox>
      ) : (
        <StyledDrawer
          anchor={position}
          open={navCollapsed}
          onClose={() => handleToggleDrawer()}
          classes={{
            root: clsx(variant),
            paper: clsx(variant),
          }}
          style={{position: 'absolute'}}>
          <Box height='100%' className={classes.container}>
            <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
              <UserInfo />
              <Scrollbar className={classes.drawerScrollAppSidebar}>
                <Navigation />
              </Scrollbar>
            </Box>
          </Box>
        </StyledDrawer>
      )}
    </>
  );
};

export default AppSidebar;
