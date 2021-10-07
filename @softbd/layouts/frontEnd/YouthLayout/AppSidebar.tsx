import React, {useContext} from 'react';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import clsx from 'clsx';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import useStyles from './AppSidebar.style';
import {AppState} from '../../../../redux/store';
import AppContextPropsType from '../../../../types/AppContextPropsType';
import {AppContext, Scrollbar} from '../../../../@crema';
import {toggleNavCollapsed} from '../../../../redux/actions';
import UserInfo from '../../../../shared/components/UserInfo';
import Navigation from '../../../../@crema/core/Navigation/VerticleNav';

interface AppSidebarProps {
  variant?: string;
  position?: 'left' | 'top' | 'right' | 'bottom';
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  position = 'left',
  variant,
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
  return (
    <Hidden lgUp>
      <Drawer
        anchor={position}
        open={navCollapsed}
        onClose={(ev) => handleToggleDrawer()}
        classes={{
          root: clsx(variant),
          paper: clsx(variant),
        }}
        style={{position: 'absolute'}}>
        <Box height='100%' className={classes.drawerContainer}>
          <Box
            height='100%'
            width='100%'
            color='primary.contrastText'
            className={classes.sidebarBg}>
            <UserInfo />
            <Scrollbar className={classes.drawerScrollAppSidebar}>
              <Navigation />
            </Scrollbar>
          </Box>
        </Box>
      </Drawer>
    </Hidden>
  );
};

export default AppSidebar;
