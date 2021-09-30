import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import clsx from 'clsx';
import LanguageSwitcher from '../../../LanguageSwitcher';
import Box from '@mui/material/Box';
import useStyles from './AppHeader.style';
import Notifications from '../../../Notifications';
import HorUserInfo from '../../HorUserInfo';
import AppLogo from '../../../../../shared/components/AppLogo';
import {CastForEducation, Home} from '@mui/icons-material';
import WorkIcon from '@mui/icons-material/Work';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

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

  return <>
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
              <Box component='span'>
                <Home className={classes.menuIcons} /> হোম
              </Box>
              <Box component='span'>
                <CastForEducation className={classes.menuIcons} /> প্রশিক্ষণ
              </Box>
              <Box component='span'>
                <WorkIcon className={classes.menuIcons} />
                চাকরি
              </Box>
              <Box component='span'>
                <ListAltIcon className={classes.menuIcons} />
                নোটিশ
              </Box>
              <Box component='span'>
                <LocalActivityIcon className={classes.menuIcons} /> সাম্প্রতিক
                কার্যক্রম
              </Box>
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
                color='inherit'
                size="large">
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
    {renderMobileMenu}
  </>;
};
export default AppHeader;
