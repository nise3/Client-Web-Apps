import React, {useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import {classes, StyledAppBar} from './AppHeader.style';
import {Badge, CastForEducation, Home} from '@mui/icons-material';
// import WorkIcon from '@mui/icons-material/Work';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import {Container, useMediaQuery} from '@mui/material';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
// import {getSSOLoginUrl} from '../../../common/SSOConfig';
// import Notifications from '../../../../@crema/core/Notifications';
import LanguageSwitcher from '../../../../@crema/core/LanguageSwitcher';
import AppLogo from '../../../../shared/components/AppLogo';
import {NavLink as Link} from '../../../elements/common';
import CalendarViewMonth from '@mui/icons-material/CalendarViewMonth';
import {
  LINK_FRONTEND_YOUTH_CALENDAR,
  LINK_FRONTEND_YOUTH_FEED,
  LINK_FRONTEND_YOUTH_NOTICE_BOARD,
  LINK_FRONTEND_YOUTH_RECENT_ACTIVITIES,
  LINK_FRONTEND_YOUTH_ROOT,
  LINK_FRONTEND_YOUTH_TRAINING,
} from '../../../common/appLinks';
import {Theme} from '@mui/system';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import YouthProfileMenu from './YouthProfileMenu';
import {useIntl} from 'react-intl';

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const authUser = useAuthUser<YouthAuthUser>();
  const isMDDown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  const {messages} = useIntl();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  // const redirectToSSO = useCallback(() => {
  //   window.location.href = getSSOLoginUrl();
  // }, []);

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
          <Home className={classes.menuIcons} /> {messages['menu.home']}{' '}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_YOUTH_FEED}>
          <Badge className={classes.menuIcons} /> {messages['menu.my_life']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_YOUTH_TRAINING}>
          <CastForEducation className={classes.menuIcons} />{' '}
          {messages['menu.training']}
        </Link>
      </MenuItem>
      {/*<MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_YOUTH_JOBS}>
          <WorkIcon className={classes.menuIcons} /> চাকরি
        </Link>
      </MenuItem>*/}
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_YOUTH_NOTICE_BOARD}>
          <ListAltIcon className={classes.menuIcons} />{' '}
          {messages['menu.notice']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_YOUTH_RECENT_ACTIVITIES}>
          <LocalActivityIcon className={classes.menuIcons} />{' '}
          {messages['menu.recent_activity']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_YOUTH_CALENDAR}>
          <CalendarViewMonth className={classes.menuIcons} />{' '}
          {messages['menu.calendar']}
        </Link>
      </MenuItem>
      {/*<MenuItem className={classes.menuItemRoot}>*/}
      {/*  <Notifications />*/}
      {/*</MenuItem>*/}
      <LanguageSwitcher />
    </Menu>
  );

  return (
    <>
      <StyledAppBar
        position='relative'
        color={'inherit'}
        className={clsx(classes.appBar, 'app-bar')}>
        <Toolbar className={classes.headerMain}>
          <Container maxWidth={'lg'}>
            <Box className={classes.headerMainFlex}>
              <Link href={'/'}>
                <AppLogo height={isMDDown ? 40 : 60} />
              </Link>

              <Box className={classes.grow} />

              <Box className={clsx(classes.sectionDesktop)}>
                <Box component='span' className={classes.menuItem}>
                  <Link
                    href={LINK_FRONTEND_YOUTH_ROOT}>
                    <Home className={classes.menuIcons} sx={{fontSize: 42}} />{' '}
                    {messages['menu.home']}
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link
                    href={LINK_FRONTEND_YOUTH_FEED}>
                    <Badge className={classes.menuIcons} sx={{fontSize: 42}} />{' '}
                    {messages['menu.my_life']}
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link
                    href={LINK_FRONTEND_YOUTH_TRAINING}>
                    <CastForEducation
                      className={classes.menuIcons}
                      sx={{fontSize: 42}}
                    />{' '}
                    {messages['menu.training']}
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link
                    href={LINK_FRONTEND_YOUTH_NOTICE_BOARD}>
                    <ListAltIcon
                      className={classes.menuIcons}
                      sx={{fontSize: 42}}
                    />{' '}
                    {messages['menu.notice']}
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link
                    href={LINK_FRONTEND_YOUTH_RECENT_ACTIVITIES}>
                    <LocalActivityIcon
                      className={classes.menuIcons}
                      sx={{fontSize: 42}}
                    />{' '}
                    {messages['menu.recent_activity']}
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_YOUTH_CALENDAR}>
                    <CalendarViewMonth
                      className={classes.menuIcons}
                      sx={{fontSize: 42}}
                    />{' '}
                    {messages['menu.calendar']}
                  </Link>
                </Box>
                {/*<Notifications />*/}
                <LanguageSwitcher />
              </Box>

              {authUser && <YouthProfileMenu />}
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
          </Container>
        </Toolbar>
      </StyledAppBar>
      {renderMobileMenu}
    </>
  );
};
export default AppHeader;
