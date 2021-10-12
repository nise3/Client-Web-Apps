import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import clsx from 'clsx';
import Box from '@mui/material/Box';
// import AppLogo from '../../shared/components/AppLogo';
import {Person, Login, LocalPhone, Send} from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import {CremaTheme} from '../../../../types/AppContextPropsType';
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
} from '../../../common/appLinks';

interface AppHeaderProps {}

const headerFixedHeight = {
  height: 60,
  minHeight: 60,
};

const useStyles = makeStyles((theme: CremaTheme) => ({
  appBar: {
    // boxShadow: '4px 3px 4px 0px rgba(0,0,0,0.12)',
    boxShadow: 'none',
  },
  logoArea: {
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  header: {
    width: '100%',
    minHeight: 80,
    margin: '0px auto',
  },
  headerHalf: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      // width: '50%',
      justifyContent: 'unset',
    },
  },
  headerMain: {
    minHeight: 56,
    paddingRight: 0,
    paddingLeft: 0,
    [theme.breakpoints.up('sm')]: {
      minHeight: 70,
    },
    backgroundColor: theme.palette.primary.main,
    // maxWidth: theme.breakpoints.values.xl,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
  },
  headerMainFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerFixedHeight: {
    ...headerFixedHeight,
  },
  headerMenu: {
    width: '100%',
    maxWidth: theme.breakpoints.values.xl,
    justifyContent: 'space-between',
    display: 'flex',
  },
  headerMenuGroup: {
    ...headerFixedHeight,
    justifyContent: 'center',
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    width: '100%',
    maxWidth: theme.breakpoints.values.xl,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mobileMenuButton: {
    color: theme.palette.primary.contrastText,
  },
  menuIcons: {
    height: '0.6em',
  },
  menuItem: {
    ...headerFixedHeight,
    padding: '20px 10px',
    color: theme.palette.primary.contrastText,
  },
  menuItemActive: {
    backgroundColor: theme.palette.primary.light,
  },
  menuItemAction: {
    backgroundColor: theme.palette.warning.main,
  },
  menuItemMobile: {
    padding: '18px 20px 18px 12px',
  },
  headerNav: {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.grey[800],
    '& .navbarNav': {
      display: 'flex',
      padding: 0,
      marginLeft: -16,
      marginRight: -16,
      [theme.breakpoints.up('lg')]: {
        marginLeft: -20,
        marginRight: -20,
      },
    },
    '& .navItem': {
      width: 'auto',
      cursor: 'pointer',
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 20,
        paddingRight: 20,
      },
      '&.active': {
        color: theme.palette.secondary.main,
        '& .navLinkIcon': {
          color: theme.palette.secondary.main,
        },
      },
    },
    '& .navLinkIcon': {
      marginRight: 10,
      color: theme.palette.grey[800],
      fontSize: 20,
    },
  },
  pointer: {
    cursor: 'pointer',
  },
}));

const Header: React.FC<AppHeaderProps> = () => {
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
      {/*<MenuItem component='span' className={classes.menuItemMobile}>*/}
      {/*  <Note className={classes.menuIcons} /> অনলাইন আবেদন*/}
      {/*</MenuItem>*/}
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Person className={classes.menuIcons} /> ইউথ লগইন
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Login className={classes.menuIcons} /> রেজিস্ট্রেশন
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
                  {/*<Link*/}
                  {/*  href={LINK_FRONTEND_INSTITUTE_ROOT}*/}
                  {/*  className={classes.menuItem}>*/}
                  {/*  <Note className={classes.menuIcons} /> অনলাইন আবেদন*/}
                  {/*</Link>*/}
                  <Link
                    href={LINK_FRONTEND_INSTITUTE_ROOT}
                    className={classes.menuItem}>
                    <Person className={classes.menuIcons} /> ইউথ লগইন
                  </Link>
                  <Link
                    href='/'
                    className={clsx(classes.menuItem, classes.menuItemAction)}>
                    <Login className={classes.menuIcons} /> রেজিস্ট্রেশন
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
