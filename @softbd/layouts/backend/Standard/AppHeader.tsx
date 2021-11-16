import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LanguageSwitcher from '../../../../@crema/core/LanguageSwitcher';
import {toggleNavCollapsed} from '../../../../redux/actions';
import {useDispatch} from 'react-redux';
import Box from '@mui/material/Box';
import SearchBar from '../../../../@crema/core/SearchBar';
import {classes, StyledAppBar, StyledToolbar} from './AppHeader.style';
import HeaderMessages from '../../../../@crema/core/HeaderMessages';
import Notifications from '../../../../@crema/core/Notifications';
import AppLogo from '../../../../shared/components/AppLogo';
import clsx from 'clsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Theme} from '@mui/system';

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const dispatch = useDispatch();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const breakpointMDUp = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  );

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

  return (
    <>
      <StyledAppBar color='inherit' className={clsx(classes.appBar, 'app-bar')}>
        <StyledToolbar className={classes.appToolbar}>
          {!breakpointMDUp && (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
              onClick={() => dispatch(toggleNavCollapsed())}
              size='large'>
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
          )}
          <AppLogo />
          <Box className={classes.grow} />
          <SearchBar borderLight placeholder='Search…' />
          <Box className={classes.sectionDesktop}>
            <LanguageSwitcher />
            <HeaderMessages />
            <Notifications />
          </Box>
          <Box className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
              size='large'>
              <MoreIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </StyledAppBar>
      {renderMobileMenu}
    </>
  );
};
export default AppHeader;
