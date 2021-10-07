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
import {Person, Login, Note} from '@mui/icons-material';
import makeStyles from '@mui/styles/makeStyles';
import {CremaTheme} from '../../types/AppContextPropsType';
import LogoCustomizable from './LogoCustomizable';

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
    width: '100%',
    minHeight: 80,
    margin: '0px auto',
  },
  signinButton: {
    width: '160px',
    color: '#fff',
    background: '#682988',
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
  headerContainer: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
    [theme.breakpoints.up('lg')]: {
      maxWidth: 1140,
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: 1720,
    },
    display: 'flex',
    justifyContent: 'center',
  },
  headerFixedHeight: {
    ...headerFixedHeight,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
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
  menuIcons: {
    height: '0.6em',
  },
  menuItem: {
    ...headerFixedHeight,
    padding: '20px 20px',
    color: theme.palette.primary.contrastText,
  },
  menuItemActive: {
    backgroundColor: theme.palette.primary.dark,
  },
  menuItemAction: {
    backgroundColor: theme.palette.secondary.dark,
  },
  menuItemMobile: {
    padding: '18px 20px 18px 12px',
  },
  desktopMenu: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
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
  menuItemRoot: {
    padding: 0,
  },
  pointer: {
    cursor: 'pointer',
  },
  menuIconRoot: {
    width: '2.5rem',
    height: '2.5rem',
  },
  logoRoot: {
    height: 30,
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
        প্রথম পাতা
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        কোর্স সমূহ
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        প্রশিক্ষণ বর্ষপঞ্জি
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        ভিডিও সমূহ
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        পরামর্শ
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        সাধারণ জিজ্ঞাসা
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        যোগাযোগ
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Note className={classes.menuIcons} /> অনলাইন আবেদন
      </MenuItem>
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
      <Box className={classes.logoArea}>
        <Box maxWidth='xl' margin='auto'>
          <LogoCustomizable
            instituteName='Bangladesh Industrial Technical Assistance Centre'
            instituteLogo='/images/bitac-logo.jpg'
          />
          <Box></Box>
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
              <Box
                component='span'
                className={clsx(classes.menuItem, classes.menuItemActive)}>
                প্রথম পাতা
              </Box>
              <Box component='span' className={classes.menuItem}>
                কোর্স সমূহ
              </Box>
              <Box component='span' className={classes.menuItem}>
                প্রশিক্ষণ বর্ষপঞ্জি
              </Box>
              <Box component='span' className={classes.menuItem}>
                ভিডিও সমূহ
              </Box>
              <Box component='span' className={classes.menuItem}>
                পরামর্শ
              </Box>
              <Box component='span' className={classes.menuItem}>
                সাধারণ জিজ্ঞাসা
              </Box>
              <Box component='span' className={classes.menuItem}>
                যোগাযোগ
              </Box>
              <Box component='span' className={classes.menuItem}>
                <Note className={classes.menuIcons} /> অনলাইন আবেদন
              </Box>
              <Box component='span' className={classes.menuItem}>
                <Person className={classes.menuIcons} /> ইউথ লগইন
              </Box>
              <Box
                component='span'
                className={clsx(classes.menuItem, classes.menuItemAction)}>
                <Login className={classes.menuIcons} /> রেজিস্ট্রেশন
              </Box>
            </Box>
            <Box ml={1} className={classes.sectionMobile}>
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
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};
export default Header;
