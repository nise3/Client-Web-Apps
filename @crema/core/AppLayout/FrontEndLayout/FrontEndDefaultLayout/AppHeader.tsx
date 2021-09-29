import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import clsx from 'clsx';
import LanguageSwitcher from '../../../LanguageSwitcher';
import Box from '@material-ui/core/Box';
import useStyles from './AppHeader.style';
import Notifications from '../../../Notifications';
import HorUserInfo from '../../HorUserInfo';
import AppLogo from '../../../../../shared/components/AppLogo';
import {ListItem} from '@material-ui/core';

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

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
        <Notifications />
      </MenuItem>
      <LanguageSwitcher />
    </Menu>
  );

  return (
    <>
      <AppBar
        position='relative'
        color={'inherit'}
        className={clsx(classes.appBar, 'app-bar')}>
        <Toolbar className={classes.headerMain}>
          <Box className={classes.headerContainer}>
            <Box className={classes.headerMainFlex}>
              <AppLogo />
              <Box className={classes.grow} />
              <Box className={clsx(classes.sectionDesktop)}>
                <ListItem>Hello</ListItem>
                <ListItem>Hello</ListItem>
                <ListItem>Hello</ListItem>
                <ListItem>Hello</ListItem>
                <ListItem>Hello</ListItem>
                <Notifications />
                <LanguageSwitcher />
              </Box>

              <HorUserInfo />
              <Box ml={1} className={classes.sectionMobile}>
                <IconButton
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'>
                  <MoreIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};
export default AppHeader;
