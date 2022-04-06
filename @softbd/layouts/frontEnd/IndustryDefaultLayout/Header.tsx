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
  LINK_FRONTEND_FAQ,
  LINK_FRONTEND_INDUSTRY_CONTACT,
  LINK_FRONTEND_INDUSTRY_MEMBER_LIST,
  LINK_FRONTEND_INDUSTRY_MEMBER_REGISTRATION,
  LINK_FRONTEND_INDUSTRY_PUBLICATION,
  LINK_FRONTEND_INDUSTRY_ROOT,
  LINK_FRONTEND_JOBS,
} from '../../../common/appLinks';
import {classes, StyledAppBar, StyledBox} from './Header.style';
import {useIntl} from 'react-intl';
import {Container, Grid} from '@mui/material';
import LanguageSwitcher from '../../../../@crema/core/LanguageSwitcher';
import GotoDashboardButton from '../../../elements/button/GotoDashboardButton/GotoDashboardButton';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {useFetchPublicIndustryAssocDetails} from '../../../../services/IndustryManagement/hooks';
import GotoSignInOrUpButton from '../../../elements/button/GotoSigninOrUpButton/GotoSignInOrUpButton';
import CardMediaImageView from '../../../elements/display/ImageView/CardMediaImageView';

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
        <Link href={LINK_FRONTEND_FAQ}>{messages['menu.faq']}</Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_INDUSTRY_MEMBER_REGISTRATION}>
          {messages['common.member_registration']}
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
            href={LINK_FRONTEND_INDUSTRY_ROOT}
            className={classes.headerHalfLogo}>
            {industryAssociationDetails?.logo && (
              <Box sx={{marginRight: '10px'}}>
                <CardMediaImageView
                  className={classes.logoInstitute}
                  image={industryAssociationDetails?.logo}
                  alt='industry logo'
                />
              </Box>
            )}
          </Link>
          <Grid item md={4} className={classes.instituteName}>
            <Text
              fontWeight={'bold'}
              style={{color: '#6C91C5', fontWeight: '700'}}>
              {industryAssociationDetails?.title}
            </Text>
          </Grid>
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

                  <Link href={LINK_FRONTEND_FAQ} className={classes.menuItem}>
                    {messages['menu.faq']}
                  </Link>

                  <Link
                    href={LINK_FRONTEND_INDUSTRY_MEMBER_REGISTRATION}
                    className={classes.menuItem}>
                    {messages['common.member_registration']}
                  </Link>

                  {/*<Link
                    href={LINK_FRONTEND_INDUSTRY_ENROLLMENT}
                    className={classes.menuItem}>
                    {messages['menu.enrollment']}
                  </Link>*/}
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
