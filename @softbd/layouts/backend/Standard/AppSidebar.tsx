import React, {useContext} from 'react';
import Drawer from '@mui/material/Drawer';
import clsx from 'clsx';
import UserInfo from '../../../../shared/components/UserInfo';
import Navigation from '../../../../@crema/core/Navigation/VerticleNav';
import {toggleNavCollapsed} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import useStyles from './AppSidebar.style';
import Scrollbar from '../../../../@crema/core/Scrollbar';
import AppContext from '../../../../@crema/utility/AppContext';
import {AppState} from '../../../../redux/store';
import AppContextPropsType from '../../../../types/AppContextPropsType';
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
  const {themeMode} = useContext<AppContextPropsType>(AppContext);

  const handleToggleDrawer = () => {
    dispatch(toggleNavCollapsed());
  };
  const classes = useStyles({themeMode});
  let sidebarClasses = classes.sidebarStandard;

  const breakpointMDUp = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  );

  return (
    <>
      {breakpointMDUp ? (
        <Box height='100%' className={clsx(classes.container, 'app-sidebar')}>
          <Box className={clsx(classes.sidebarBg, sidebarClasses)}>
            <UserInfo />
            <Scrollbar className={classes.scrollAppSidebar}>
              <Navigation />
            </Scrollbar>
          </Box>
        </Box>
      ) : (
        <Drawer
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
        </Drawer>
      )}
    </>
  );
};

export default AppSidebar;
