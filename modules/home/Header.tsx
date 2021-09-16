import React, {useCallback} from 'react';
import {alpha, createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Slide,
  useScrollTrigger,
} from '@material-ui/core';
import {CastForEducation, ExitToApp, Home} from '@material-ui/icons';
import WorkIcon from '@material-ui/icons/Work';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {SSO_LOGIN_URL} from '../../@softbd/common/SSOConfig';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    logo: {
      width: '100px',
      height: '100px',
      marginTop: '-12px',
    },
    appBar: {
      color: '#14496b',
      backgroundColor: '#fff !important',
      boxShadow: 'none',
      padding: theme.spacing(0, 20),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    signinButton: {
      width: '160px',
      color: '#fff',
      background: '#682988',
    },
    menuItem: {
      color: '#000',
    },
    desktopMenu: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    menuIcons: {
      height: '0.6em',
    },
  }),
);

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const {children, window} = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({target: window ? window() : undefined});
  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const redirectToSSO = useCallback(() => {
    window.location.href = SSO_LOGIN_URL;
  }, []);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose} className={classes.menuItem}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'>
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box className={classes.grow}>
      <Container maxWidth='xl'>
        <CssBaseline />
        <HideOnScroll>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <img
                src='/images/logo-with-name.png'
                className={classes.logo}
                alt='logo'
              />

              <Box component='span' m={1} p={1} className={classes.desktopMenu}>
                <Home className={classes.menuIcons} /> হোম
              </Box>
              <Box component='span' m={1} p={1} className={classes.desktopMenu}>
                <CastForEducation className={classes.menuIcons} /> প্রশিক্ষণ
              </Box>
              <Box component='span' m={1} p={1} className={classes.desktopMenu}>
                <WorkIcon className={classes.menuIcons} />
                চাকরি
              </Box>
              <Box component='span' m={1} p={1} className={classes.desktopMenu}>
                <ListAltIcon className={classes.menuIcons} />
                নোটিশ
              </Box>
              <Box component='span' m={1} p={1} className={classes.desktopMenu}>
                <LocalActivityIcon className={classes.menuIcons} /> সাম্প্রতিক
                কার্যক্রম
              </Box>
              <Box className={classes.grow} />
              <Box className={classes.sectionDesktop}>
                <Button
                  variant='contained'
                  onClick={redirectToSSO}
                  className={classes.signinButton}
                  endIcon={<ExitToApp />}>
                  প্রবেশ করুন
                </Button>

                {/*<IconButton aria-label='show 4 new mails' color='inherit'>*/}
                {/*  <Badge badgeContent={4} color='secondary'>*/}
                {/*    <MailIcon />*/}
                {/*  </Badge>*/}
                {/*</IconButton>*/}
                {/*<IconButton*/}
                {/*  aria-label='show 17 new notifications'*/}
                {/*  color='inherit'>*/}
                {/*  <Badge badgeContent={17} color='secondary'>*/}
                {/*    <NotificationsIcon />*/}
                {/*  </Badge>*/}
                {/*</IconButton>*/}
                {/*<IconButton*/}
                {/*  edge='end'*/}
                {/*  aria-label='account of current user'*/}
                {/*  aria-controls={menuId}*/}
                {/*  aria-haspopup='true'*/}
                {/*  onClick={handleProfileMenuOpen}*/}
                {/*  color='inherit'>*/}
                {/*  <AccountCircle />*/}
                {/*</IconButton>*/}
              </Box>
              <Box className={classes.sectionMobile}>
                <IconButton
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'>
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </Container>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
