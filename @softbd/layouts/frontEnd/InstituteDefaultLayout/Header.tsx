import React, {useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import {NavLink as Link, Text} from '../../../elements/common';
import {
  LINK_FRONTEND_INSTITUTE_CALENDAR,
  LINK_FRONTEND_INSTITUTE_CONTACT,
  LINK_FRONTEND_INSTITUTE_COURSES,
  LINK_FRONTEND_INSTITUTE_FAQ,
  LINK_FRONTEND_INSTITUTE_FEEDBACK,
  LINK_FRONTEND_INSTITUTE_ROOT,
  LINK_FRONTEND_INSTITUTE_VIDEOS,
} from '../../../common/appLinks';
import {classes, StyledAppBar, StyledBox} from './Header.style';
import {useIntl} from 'react-intl';
import {Container, Grid} from '@mui/material';
import LanguageSwitcher from '../../../../@crema/core/LanguageSwitcher';
import GotoDashboardButton from '../../../elements/button/GotoDashboardButton/GotoDashboardButton';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {useFetchPublicInstituteDetails} from '../../../../services/instituteManagement/hooks';
import GotoSignInOrUpButton from '../../../elements/button/GotoSigninOrUpButton/GotoSignInOrUpButton';
import CardMediaImageView from '../../../elements/display/ImageView/CardMediaImageView';

interface AppHeaderProps {}

const Header: React.FC<AppHeaderProps> = () => {
  const authUser = useAuthUser();

  const {messages} = useIntl();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const {data: institute} = useFetchPublicInstituteDetails();

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
        <Link href={LINK_FRONTEND_INSTITUTE_CALENDAR}>
          {messages['menu.calendar']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INSTITUTE_CONTACT}>
          {messages['menu.contact']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <LanguageSwitcher />
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <StyledBox>
        <Container
          maxWidth='lg'
          sx={{margin: 'auto', display: 'flex'}}
          className={classes.logoArea}
          style={{marginTop: '16px'}}>
          <Link
            href={LINK_FRONTEND_INSTITUTE_ROOT}
            className={classes.headerHalfLogo}>
            {/*<LogoCustomizable
              instituteName='Bangladesh Industrial Technical Assistance Centre'
              instituteLogo='/images/Logo-Nise-Bitac-Gov.png'
            />*/}
            {institute?.logo && (
              <Box>
                <CardMediaImageView
                  className={classes.logoInstitute}
                  image={institute?.logo}
                  alt='institute logo'
                />
              </Box>
            )}
          </Link>

          <Grid item md={4} className={classes.instituteName}>
            <Text
              fontWeight={'bold'}
              style={{color: '#6C91C5', fontWeight: '700'}}>
              {institute?.title}
            </Text>
          </Grid>

          <Grid item md={4} className={classes.headerHalf} mr={5}>
            <img
              className={classes.logoInstitute}
              src='/images/NISE-SSP3.png'
              alt='institute logo'
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
                    href={LINK_FRONTEND_INSTITUTE_CALENDAR}
                    className={classes.menuItem}>
                    {messages['menu.calendar']}
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
              {authUser ? <GotoDashboardButton /> : <GotoSignInOrUpButton />}
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
      </StyledAppBar>
      {renderMobileMenu}
    </>
  );
};
export default Header;
