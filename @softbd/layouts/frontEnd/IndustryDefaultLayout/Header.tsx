import React, {useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import {Login} from '@mui/icons-material';
import {NavLink as Link} from '../../../elements/common';
import {
  LINK_FRONTEND_INDUSTRY_ABOUT_US,
  LINK_FRONTEND_INDUSTRY_CONTACT,
  LINK_FRONTEND_INDUSTRY_MEMBER_LIST,
  LINK_FRONTEND_INDUSTRY_PUBLICATION,
  LINK_FRONTEND_INDUSTRY_ROOT,
  LINK_FRONTEND_JOBS,
  LINK_SIGNUP,
} from '../../../common/appLinks';
import {classes, StyledAppBar, StyledBox} from './Header.style';
import {useIntl} from 'react-intl';
import {Container, Grid} from '@mui/material';
import LanguageSwitcher from '../../../../@crema/core/LanguageSwitcher';
import GotoDashboardButton from '../../../elements/button/GotoDashboardButton/GotoDashboardButton';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {gotoLoginSignUpPage} from '../../../common/constants';
import LogoCustomizable from '../../../elements/common/LogoCustomizable';
import {useFetchPublicIndustryAssocDetails} from '../../../../services/IndustryManagement/hooks';

interface AppHeaderProps {}

const Header: React.FC<AppHeaderProps> = () => {
  const authUser = useAuthUser();

  const {data: industryAssociationDetails} =
    useFetchPublicIndustryAssocDetails();

  const {messages} = useIntl();
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
        <Link href={LINK_FRONTEND_INDUSTRY_ROOT}>{messages['menu.home']}</Link>
      </MenuItem>

      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INDUSTRY_ABOUT_US}>
          {/*{messages['menu.about_us']}*/}
          About us
        </Link>
      </MenuItem>

      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INDUSTRY_PUBLICATION}>
          {messages['menu.publication']}
        </Link>
      </MenuItem>

      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INDUSTRY_CONTACT}>
          {messages['menu.industry_contact']}
        </Link>
      </MenuItem>

      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_JOBS}>{messages['menu.job_circular']}</Link>
      </MenuItem>

      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INDUSTRY_MEMBER_LIST}>
          {messages['menu.member_list']}
        </Link>
      </MenuItem>

      <MenuItem component='span' className={classes.menuItemMobile}>
        <LanguageSwitcher />
      </MenuItem>

      <MenuItem component='span' className={classes.menuItemMobile}>
        {authUser ? (
          <GotoDashboardButton />
        ) : (
          <Link href={gotoLoginSignUpPage(LINK_SIGNUP)}>
            <Login className={classes.menuIcons} />
            {messages['common.registration_login']}
          </Link>
        )}
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <StyledBox>
        <Container
          maxWidth='lg'
          sx={{margin: 'auto', display: 'flex'}}
          style={{marginBottom: '10px', padding: '0'}}
          className={classes.logoArea}>
          <Link
            href={LINK_FRONTEND_INDUSTRY_ROOT}
            className={classes.headerHalfLogo}>
            <LogoCustomizable
              instituteName={industryAssociationDetails?.title ?? 'industry'}
              instituteLogo={
                industryAssociationDetails?.logo ?? '/images/mcci-logo.png'
              }
            />
            <LogoCustomizable
              instituteName='Industry'
              instituteLogo='/images/gov-logo.png'
            />
          </Link>
          <Grid item md={4} className={classes.headerHalf}>
            <img
              className={classes.logoInstitute}
              src='/images/NISE-SSP34.png'
              alt='NISECube'
            />
          </Grid>
        </Container>
      </StyledBox>

      <StyledAppBar
        position='relative'
        color={'inherit'}
        className={clsx(classes.appBar, 'app-bar')}>
        <Toolbar
          className={clsx(classes.headerMain, classes.headerFixedHeight)}>
          <Container
            maxWidth={'lg'}
            className={clsx(classes.headerMainFlex, classes.headerFixedHeight)}>
            <Box
              className={clsx(
                classes.sectionDesktop,
                classes.headerFixedHeight,
              )}>
              <Box className={classes.headerMenu}>
                <Box className={classes.headerMenuGroup}>
                  <Link
                    href={LINK_FRONTEND_INDUSTRY_ROOT}
                    className={classes.firstMenuItem}>
                    {messages['menu.home']}
                  </Link>

                  <Link
                    href={LINK_FRONTEND_INDUSTRY_ABOUT_US}
                    className={classes.menuItem}>
                    {messages['footer.about_us']}
                  </Link>

                  <Link
                    href={LINK_FRONTEND_INDUSTRY_PUBLICATION}
                    className={classes.menuItem}>
                    {messages['menu.publication']}
                  </Link>

                  <Link
                    href={LINK_FRONTEND_INDUSTRY_CONTACT}
                    className={classes.menuItem}>
                    {messages['menu.industry_contact']}
                  </Link>

                  <Link href={LINK_FRONTEND_JOBS} className={classes.menuItem}>
                    {messages['menu.job_circular']}
                  </Link>

                  <Link
                    href={LINK_FRONTEND_INDUSTRY_MEMBER_LIST}
                    className={classes.menuItem}>
                    {messages['menu.member_list']}
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
                <Link
                  href={gotoLoginSignUpPage(LINK_SIGNUP)}
                  className={classes.menuItemRegOrLogin}>
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
                className={classes.mobileMenuButton}
                size='large'>
                <MoreIcon />
              </IconButton>
            </Box>
          </Container>
        </Toolbar>
      </StyledAppBar>
      {renderMobileMenu}
    </>
  );
};
export default Header;
