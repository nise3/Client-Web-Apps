import React, {useCallback, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import useStyles from './AppHeader.style';
import {Badge, CastForEducation, ExitToApp, Home} from '@mui/icons-material';
// import WorkIcon from '@mui/icons-material/Work';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import {Button, useMediaQuery} from '@mui/material';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {getSSOLoginUrl} from '../../../common/SSOConfig';
// import Notifications from '../../../../@crema/core/Notifications';
import LanguageSwitcher from '../../../../@crema/core/LanguageSwitcher';
import AppLogo from '../../../../shared/components/AppLogo';
import {Link} from '../../../elements/common';
import {
  LINK_FRONTEND_YOUTH_ROOT,
  LINK_FRONTEND_YOUTH_TRAINING,
  // LINK_FRONTEND_YOUTH_JOBS,
  LINK_FRONTEND_YOUTH_NOTICE_BOARD,
  LINK_FRONTEND_YOUTH_RECENT_ACTIVITIES,
  LINK_FRONTEND_YOUTH_FEED,
} from '../../../common/appLinks';
import {Theme} from '@mui/system';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import YouthProfileMenu from './YouthProfileMenu';

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const authUser = useAuthUser<YouthAuthUser>();
  const isMDDown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const redirectToSSO = useCallback(() => {
    window.location.href = getSSOLoginUrl();
  }, []);

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
        <Link href={LINK_FRONTEND_YOUTH_ROOT}>
          <Home className={classes.menuIcons} /> হোম
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_YOUTH_FEED}>
          <Badge className={classes.menuIcons} /> মাই লাইফ
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_YOUTH_TRAINING}>
          <CastForEducation className={classes.menuIcons} /> প্রশিক্ষণ
        </Link>
      </MenuItem>
      {/*<MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_YOUTH_JOBS}>
          <WorkIcon className={classes.menuIcons} /> চাকরি
        </Link>
      </MenuItem>*/}
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_YOUTH_NOTICE_BOARD}>
          <ListAltIcon className={classes.menuIcons} /> নোটিশ
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_YOUTH_RECENT_ACTIVITIES}>
          <LocalActivityIcon className={classes.menuIcons} /> সাম্প্রতিক
          কার্যক্রম
        </Link>
      </MenuItem>
      <MenuItem className={classes.menuItemRoot}>
        {/*<Notifications />*/}
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
              <AppLogo height={isMDDown ? 40 : 60} />
              <Box className={classes.grow} />

              <Box className={clsx(classes.sectionDesktop)}>
                <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_YOUTH_ROOT}>
                    <Home className={classes.menuIcons} sx={{fontSize: 42}} />{' '}
                    হোম
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_YOUTH_FEED}>
                    <Badge className={classes.menuIcons} sx={{fontSize: 42}} />{' '}
                    মাই লাইফ
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_YOUTH_TRAINING}>
                    <CastForEducation
                      className={classes.menuIcons}
                      sx={{fontSize: 42}}
                    />{' '}
                    প্রশিক্ষণ
                  </Link>
                </Box>
                {/*<Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_YOUTH_JOBS}>
                    <WorkIcon
                      className={classes.menuIcons}
                      sx={{fontSize: 42}}
                    />{' '}
                    চাকরি
                  </Link>
                </Box>*/}
                <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_YOUTH_NOTICE_BOARD}>
                    <ListAltIcon
                      className={classes.menuIcons}
                      sx={{fontSize: 42}}
                    />{' '}
                    নোটিশ
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_YOUTH_RECENT_ACTIVITIES}>
                    <LocalActivityIcon
                      className={classes.menuIcons}
                      sx={{fontSize: 42}}
                    />{' '}
                    সাম্প্রতিক কার্যক্রম
                  </Link>
                </Box>
                {/*<Notifications />*/}
                <LanguageSwitcher />
              </Box>

              {authUser ? (
                <YouthProfileMenu />
              ) : (
                <Button
                  variant='contained'
                  onClick={redirectToSSO}
                  className={classes.signinButton}
                  endIcon={<ExitToApp />}>
                  প্রবেশ করুন
                </Button>
              )}
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
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};
export default AppHeader;
