import {LocalActivityOutlined} from '@mui/icons-material';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import WorkIcon from '@mui/icons-material/Work';
import {Button, Container, useMediaQuery} from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import {Theme} from '@mui/system';
import clsx from 'clsx';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import LanguageSwitcher from '../../../../@crema/core/LanguageSwitcher';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import AppLogo from '../../../../shared/components/AppLogo';
import {
  LINK_FRONTEND_ERPL_ROOT,
  LINK_FRONTEND_ERPL_ROOT_ASSESSMENT_CENTER,
  LINK_FRONTEND_ERPL_ROOT_OCCUPATIONS,
  LINK_FRONTEND_ERPL_ROOT_RPL_ASSESSMENT,
  RPL_FRONTEND_STATIC_CONTENT,
} from '../../../common/appLinks';
import GotoDashboardButton from '../../../elements/button/GotoDashboardButton/GotoDashboardButton';
import GotoSignInOrUpButton from '../../../elements/button/GotoSigninOrUpButton/GotoSignInOrUpButton';
import {NavLink as Link} from '../../../elements/common';
import Hidden from '../../../elements/Hidden';
import {classes, StyledAppBar} from './Header.style';
import {
  CONTENT_ID_CERTIFICATE_ADVANTAGE,
  CONTENT_ID_WHAT_IS_RPL,
} from '../../../utilities/StaticContentConfigs';

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
        <Link href={LINK_FRONTEND_ERPL_ROOT}>
          <HomeOutlinedIcon className={classes.menuIcons} />{' '}
          {messages['menu.home']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={RPL_FRONTEND_STATIC_CONTENT + CONTENT_ID_WHAT_IS_RPL}>
          <CastForEducationOutlinedIcon className={classes.menuIcons} />{' '}
          {messages['menu.whatisrpl']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link
          href={RPL_FRONTEND_STATIC_CONTENT + CONTENT_ID_CERTIFICATE_ADVANTAGE}>
          <WorkIcon className={classes.menuIcons} />
          {messages['menu.certificate_advantage']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_ERPL_ROOT_OCCUPATIONS}>
          <ContentPasteOutlinedIcon className={classes.menuIcons} />{' '}
          {messages['menu.rpl_occupations']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_ERPL_ROOT_ASSESSMENT_CENTER}>
          <LocalActivityOutlined className={classes.menuIcons} />
          {messages['menu.assessment_center']}
        </Link>
      </MenuItem>
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
              <Link href={LINK_FRONTEND_ERPL_ROOT}>
                <AppLogo height={isMDDown ? 40 : 60} />
                {/* <span style={{
                  'fontSize': '2rem',
                  'fontWeight': 700,
                  'color': '#5fcf80',
                }}>{messages['common.rpl']}</span> */}
              </Link>
              <Box className={classes.grow} />
              <Box className={clsx(classes.sectionDesktop)}>
                <Box component='span' className={classes.menuItem}>
                  <Link
                    href={RPL_FRONTEND_STATIC_CONTENT + CONTENT_ID_WHAT_IS_RPL}>
                    {messages['menu.whatisrpl']}
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link
                    href={
                      RPL_FRONTEND_STATIC_CONTENT +
                      CONTENT_ID_CERTIFICATE_ADVANTAGE
                    }>
                    <CastForEducationOutlinedIcon
                      className={classes.menuIcons}
                      sx={{fontSize: '2.6rem'}}
                    />{' '}
                    {messages['menu.certificate_advantage']}
                  </Link>
                </Box>
                <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_ERPL_ROOT_OCCUPATIONS}>
                    <WorkIcon
                      className={classes.menuIcons}
                      sx={{fontSize: '2.6rem'}}
                    />{' '}
                    {messages['menu.rpl_occupations']}
                  </Link>
                </Box>
                {/* <Box component='span' className={classes.menuItem}>
                  <Link href={LINK_FRONTEND_ERPL_ROOT_ASSESSMENT_CENTER}>
                    <ContentPasteOutlinedIcon
                      className={classes.menuIcons}
                      sx={{fontSize: '2.6rem'}}
                    />{' '}
                    {messages['menu.assessment_center']}
                  </Link>
                </Box> */}
                {/*<Notifications />*/}
                <LanguageSwitcher />
                <Link href={LINK_FRONTEND_ERPL_ROOT_RPL_ASSESSMENT}>
                  <Button
                    style={{
                      padding: '5px 10px',
                      marginRight: '10px',
                      paddingBottom: '6px'
                    }}
                    sx={{height: '100%'}}
                    id='my-self-assessment-button'
                    variant='contained'
                    size={'small'}>
                    {messages['common.self_assessment']}
                  </Button>
                </Link>
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
