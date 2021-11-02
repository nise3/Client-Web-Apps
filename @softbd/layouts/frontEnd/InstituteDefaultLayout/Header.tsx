import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import {Login, LocalPhone, Send} from '@mui/icons-material';
import LogoCustomizable from '../../../elements/common/LogoCustomizable';
import {H6, NavLink as Link} from '../../../elements/common';
import {
  LINK_FRONTEND_INSTITUTE_ROOT,
  LINK_FRONTEND_INSTITUTE_COURSES,
  LINK_FRONTEND_INSTITUTE_VIDEOS,
  LINK_FRONTEND_INSTITUTE_FEEDBACK,
  LINK_FRONTEND_INSTITUTE_FAQ,
  LINK_FRONTEND_INSTITUTE_CONTACT,
  LINK_SIGNUP,
} from '../../../common/appLinks';
import useStyles from './Header.style';
import {useIntl} from 'react-intl';
import {Container} from '@mui/material';
// import {getSSOLoginUrl} from '../../../common/SSOConfig';
import LanguageSwitcher from '../../../../@crema/core/LanguageSwitcher';
import GotoDashboardButton from '../../../elements/button/GotoDashboardButton/GotoDashboardButton';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';

interface AppHeaderProps {}

const Header: React.FC<AppHeaderProps> = () => {
  const authUser = useAuthUser();
  const classes = useStyles();
  const {messages} = useIntl();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  // const redirectToSSO = useCallback(() => {
  //   window.location.href = getSSOLoginUrl();
  // }, []);

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
        <Link href={LINK_FRONTEND_INSTITUTE_ROOT}>
          {messages['menu.first_page']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INSTITUTE_COURSES}>
          {messages['menu.courses']}
        </Link>
      </MenuItem>
      {/* <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INSTITUTE_TRAINING_CALENDAR}>
          {messages['menu.training_calender']}
        </Link>
      </MenuItem> */}
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INSTITUTE_VIDEOS}>
          {messages['menu.videos']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INSTITUTE_FEEDBACK}>
          {messages['menu.feedback']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INSTITUTE_FAQ}>{messages['menu.faq']}</Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INSTITUTE_CONTACT}>
          {messages['menu.contact']}
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box className={classes.header}>
        <Container
          maxWidth='lg'
          sx={{margin: 'auto', display: 'flex'}}
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
              <Send
                className={classes.menuIcons}
                sx={{transform: 'rotate( 320deg)'}}
              />{' '}
              support@bitac.gov.bd
            </H6>
            <H6>
              <LocalPhone className={classes.menuIcons} /> ০১৯১২৩৪৫৬৭৮,
              ০১৮১২৩৪৫৬৭৮
            </H6>
          </Box>
        </Container>
      </Box>

      <AppBar
        position='relative'
        color={'inherit'}
        className={clsx(classes.appBar, 'app-bar')}>
        <Toolbar
          className={clsx(classes.headerMain, classes.headerFixedHeight)}>
          <Container
            maxWidth={'lg'}
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
                    className={classes.firstMenuItem}>
                    {messages['menu.first_page']}
                  </Link>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_COURSES}
                    className={classes.menuItem}>
                    {messages['menu.courses']}
                  </Link>
                  {/*<Link*/}
                  {/*  href={LINK_FRONTEND_INSTITUTE_TRAINING_CALENDAR}*/}
                  {/*  className={classes.menuItem}>*/}
                  {/*  {messages['menu.training_calender']}*/}
                  {/*</Link>*/}
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_VIDEOS}
                    className={classes.menuItem}>
                    {messages['menu.videos']}
                  </Link>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_FEEDBACK}
                    className={classes.menuItem}>
                    {messages['menu.feedback']}
                  </Link>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_FAQ}
                    className={classes.menuItem}>
                    {messages['menu.faq']}
                  </Link>
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_CONTACT}
                    className={classes.menuItem}>
                    {messages['menu.contact']}
                  </Link>
                </Box>
              </Box>
            </Box>

            <Box className={classes.headerMenuGroup}>
              <Box sx={{height: '100%'}} className={classes.languageSwitcher}>
                <LanguageSwitcher />
              </Box>
              {authUser ? (
                <GotoDashboardButton />
              ) : (
                <Link href={LINK_SIGNUP} className={classes.menuItemRegOrLogin}>
                  <Login className={classes.menuIcons} />
                  {messages['common.registration_login']}
                </Link>
              )}
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
          </Container>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
    </>
  );
};
export default Header;
