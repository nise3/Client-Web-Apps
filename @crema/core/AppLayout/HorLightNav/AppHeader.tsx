import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import clsx from 'clsx';
import LanguageSwitcher from '../../LanguageSwitcher';
import {toggleNavCollapsed} from '../../../../redux/actions';
import {useDispatch} from 'react-redux';
import Hidden from '@mui/material/Hidden';
import HorizontalNav from '../../Navigation/HorizontalNav';
import Box from '@mui/material/Box';
import useStyles from './AppHeader.style';
import SearchBar from '../../SearchBar';
import NotificationBar from './NotificationBar';
import HeaderMessages from '../../HeaderMessages';
import Notifications from '../../Notifications';
import HorUserInfo from '../HorUserInfo';
import AppLogoWhite from '../../../../shared/components/AppLogoWhite';

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = useState<null | HTMLElement>(null);

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={handleMobileMenuClose}>
      <MenuItem className={classes.menuItemRoot}>
        <HeaderMessages />
      </MenuItem>
      <MenuItem className={classes.menuItemRoot}>
        <Notifications />
      </MenuItem>
      <LanguageSwitcher />
    </Menu>
  );

  return <>
    <AppBar position='relative'>
      <NotificationBar />
      <Toolbar className={classes.headerMain}>
        <Box className={classes.headerContainer}>
          <Box className={classes.headerMainFlex}>
            <Hidden lgUp>
              <IconButton
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='open drawer'
                onClick={() => dispatch(toggleNavCollapsed())}
                size="large">
                <MenuIcon className={classes.menuIconRoot} />
              </IconButton>
            </Hidden>

            <AppLogoWhite />
            <Box className={classes.grow} />
            <SearchBar />
            <Box className={clsx(classes.sectionDesktop)}>
              <LanguageSwitcher />
              <HeaderMessages />
              <Notifications />
            </Box>

            <HorUserInfo />
            <Box ml={1} className={classes.sectionMobile}>
              <IconButton
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
                size="large">
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Toolbar>
      <Hidden xlDown>
        <Box className={classes.headerNav}>
          <Box className={classes.headerContainer}>
            <HorizontalNav />
          </Box>
        </Box>
      </Hidden>
    </AppBar>
    {renderMobileMenu}
  </>;
};
export default AppHeader;
