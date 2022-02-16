import React, {useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import {classes, StyledAppBar} from './AppHeader.style';
import {CalendarViewMonth, LocalActivityOutlined} from '@mui/icons-material';
// import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import {Container, useMediaQuery} from '@mui/material';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
// import {getSSOLoginUrl} from '../../../common/SSOConfig';
// import Notifications from '../../../../@crema/core/Notifications';
import LanguageSwitcher from '../../../../@crema/core/LanguageSwitcher';
import AppLogo from '../../../../shared/components/AppLogo';
import {NavLink as Link} from '../../../elements/common';
import {
  LINK_FRONTEND_JOBS,
  LINK_FRONTEND_NISE_CALENDAR,
  LINK_FRONTEND_NISE_NOTICE_BOARD,
  LINK_FRONTEND_NISE_RECENT_ACTIVITIES,
  LINK_FRONTEND_NISE_ROOT,
  LINK_FRONTEND_NISE_TRAINING,
} from '../../../common/appLinks';
import {Theme} from '@mui/system';
import {useIntl} from 'react-intl';
import Hidden from '../../../elements/Hidden';
import GotoDashboardButton from '../../../elements/button/GotoDashboardButton/GotoDashboardButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import WorkIcon from '@mui/icons-material/Work';
import GotoSignInOrUpButton from '../../../elements/button/GotoSigninOrUpButton/GotoSignInOrUpButton';

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const authUser = useAuthUser();
  const isMDDown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  const {messages} = useIntl();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  /*const redirectToSSO = useCallback(() => {
      window.location.href = getSSOLoginUrl();
    }, []);*/

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
        <Link href={LINK_FRONTEND_NISE_ROOT}>
          <HomeOutlinedIcon className={classes.menuIcons} />{' '}
          {messages['menu.home']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_NISE_TRAINING}>
          <CastForEducationOutlinedIcon className={classes.menuIcons} />{' '}
          {messages['menu.training']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_JOBS}>
          <WorkIcon className={classes.menuIcons} /> {messages['menu.jobs']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_NISE_NOTICE_BOARD}>
          <ContentPasteOutlinedIcon className={classes.menuIcons} />{' '}
          {messages['menu.notice']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_NISE_RECENT_ACTIVITIES}>
          <LocalActivityOutlined className={classes.menuIcons} />
          {messages['menu.recent_activity']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_NISE_CALENDAR}>
          <CalendarViewMonth className={classes.menuIcons} />
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
              <Link href={LINK_FRONTEND_NISE_ROOT}>
                <AppLogo height={isMDDown ? 40 : 60} />
              </Link>
              <Box className={classes.grow} />
              <Box className={clsx(classes.sectionDesktop)}>
                <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_NISE_ROOT}>
                    <HomeOutlinedIcon
                      className={classes.menuIcons}
                      sx={{fontSize: '2.6rem'}}
                    />{' '}
                    {messages['menu.home']}
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_NISE_TRAINING}>
                    <CastForEducationOutlinedIcon
                      className={classes.menuIcons}
                      sx={{fontSize: '2.6rem'}}
                    />{' '}
                    {messages['menu.training']}
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_JOBS}>
                    <WorkIcon
                      className={classes.menuIcons}
                      sx={{fontSize: '2.6rem'}}
                    />{' '}
                    {messages['menu.jobs']}
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_NISE_NOTICE_BOARD}>
                    <ContentPasteOutlinedIcon
                      className={classes.menuIcons}
                      sx={{fontSize: '2.6rem'}}
                    />{' '}
                    {messages['menu.notice']}
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_NISE_RECENT_ACTIVITIES}>
                    <LocalActivityOutlined
                      className={classes.menuIcons}
                      sx={{fontSize: '2.6rem'}}
                    />{' '}
                    {messages['menu.recent_activity']}
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_NISE_CALENDAR}>
                    <CalendarViewMonth
                      className={classes.menuIcons}
                      sx={{fontSize: '2.6rem'}}
                    />{' '}
                    {messages['menu.calendar']}
                  </Link>
                </Box>
                {/*<Notifications />*/}
                <LanguageSwitcher />
              </Box>

              {authUser ? <GotoDashboardButton /> : <GotoSignInOrUpButton />}
              <Hidden mdUp>
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
              </Hidden>
            </Box>
          </Container>
        </Toolbar>
      </StyledAppBar>
      {renderMobileMenu}
    </>
  );
};
export default AppHeader;
