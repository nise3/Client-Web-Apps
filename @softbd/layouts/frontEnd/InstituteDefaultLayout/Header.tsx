import React, {useCallback, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import {Person, Login, LocalPhone, Send} from '@mui/icons-material';
import LogoCustomizable from '../../../elements/common/LogoCustomizable';
import {H6, Link} from '../../../elements/common';
import {
  LINK_FRONTEND_INSTITUTE_ROOT,
  LINK_FRONTEND_INSTITUTE_COURSES,
  LINK_FRONTEND_INSTITUTE_VIDEOS,
  LINK_FRONTEND_INSTITUTE_FEEDBACK,
  LINK_FRONTEND_INSTITUTE_FAQ,
  LINK_FRONTEND_INSTITUTE_CONTACT,
  LINK_FRONTEND_INSTITUTE_TRAINING_CALENDAR,
  LINK_SIGNUP,
} from '../../../common/appLinks';
import useStyles from './Header.style';
import {useIntl} from 'react-intl';
import {Button} from '@mui/material';
import {getSSOLoginUrl} from '../../../common/SSOConfig';

interface AppHeaderProps {}

const Header: React.FC<AppHeaderProps> = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  const redirectToSSO = useCallback(() => {
    window.location.href = getSSOLoginUrl();
  }, []);

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
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INSTITUTE_ROOT}>প্রথম পাতা</Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INSTITUTE_COURSES}>কোর্স সমূহ</Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        প্রশিক্ষণ বর্ষপঞ্জি
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INSTITUTE_VIDEOS}>ভিডিও সমূহ</Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INSTITUTE_FEEDBACK}>পরামর্শ</Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INSTITUTE_FAQ}>সাধারণ জিজ্ঞাসা</Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INSTITUTE_CONTACT}>যোগাযোগ</Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link onClick={redirectToSSO}>
          <Person className={classes.menuIcons} />
          {messages['institute.youth_login']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_SIGNUP}>
          <Login className={classes.menuIcons} />
          {messages['common.registration_login']}
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box className={classes.header}>
        <Box
          maxWidth='xl'
          margin='auto'
          display='flex'
          className={classes.logoArea}>
          <Link href='/' className={classes.headerHalf}>
            <LogoCustomizable
              instituteName='Bangladesh Industrial Technical Assistance Centre'
              instituteLogo='/images/bitac-logo.jpg'
            />
          </Link>
          <Box
            className={classes.headerHalf}
            justifyContent='flex-end'
            alignItems='center'>
            <H6 p={2}>
              <Send className={classes.menuIcons} /> support@bitac.gov.bd
            </H6>
            <H6 p={2}>
              <LocalPhone className={classes.menuIcons} /> ০১৯১২৩৪৫৬৭৮,
              ০১৮১২৩৪৫৬৭৮
            </H6>
          </Box>
        </Box>
      </Box>
      <AppBar
        position='relative'
        color={'inherit'}
        className={clsx(classes.appBar, 'app-bar')}>
        <Toolbar
          className={clsx(classes.headerMain, classes.headerFixedHeight)}>
          <Box
            className={clsx(classes.headerMainFlex, classes.headerFixedHeight)}>
            {/*<Box className={classes.grow} />*/}
            <Box
              className={clsx(
                classes.sectionDesktop,
                classes.headerFixedHeight,
              )}>
              <Box className={classes.headerMenu}>
                <Box className={classes.headerMenuGroup}>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_ROOT}
                    className={classes.menuItem}>
                    প্রথম পাতা
                  </Link>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_COURSES}
                    className={classes.menuItem}>
                    কোর্স সমূহ
                  </Link>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_TRAINING_CALENDAR}
                    className={classes.menuItem}>
                    প্রশিক্ষণ বর্ষপঞ্জি
                  </Link>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_VIDEOS}
                    className={classes.menuItem}>
                    ভিডিও সমূহ
                  </Link>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_FEEDBACK}
                    className={classes.menuItem}>
                    পরামর্শ
                  </Link>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_FAQ}
                    className={classes.menuItem}>
                    সাধারণ জিজ্ঞাসা
                  </Link>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_CONTACT}
                    className={classes.menuItem}>
                    যোগাযোগ
                  </Link>
                </Box>
                <Box className={classes.headerMenuGroup}>
                  <Button onClick={redirectToSSO} className={classes.menuItem}>
                    <Person className={classes.menuIcons} />
                    {messages['institute.youth_login']}
                  </Button>
                  <Link
                    href={LINK_SIGNUP}
                    className={clsx(classes.menuItem, classes.menuItemAction)}>
                    <Login className={classes.menuIcons} />
                    {messages['common.registration_login']}
                  </Link>
                </Box>
              </Box>
            </Box>
            <Box ml={1} className={classes.sectionMobile}>
              <IconButton
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                // color='inherit'
                className={classes.mobileMenuButton}
                size='large'>
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};
export default Header;
