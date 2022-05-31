import React, {useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import {NavLink as Link} from '../../../elements/common';
import {
  LINK_FRONTEND_MIGRATION_PORTAL_ROOT,
  LINK_FRONTEND_MIGRATION_PORTAL_EXPATRIATE_WORKER_MONITORING,
  LINK_FRONTEND_MIGRATION_PORTAL_COMPLAINTS,
  LINK_FRONTEND_MIGRATION_PORTAL_NOTICE,
  LINK_FRONTEND_MIGRATION_PORTAL_CONTACT,
} from '../../../common/appLinks';
import {classes, StyledAppBar, StyledBox} from './Header.style';
import {useIntl} from 'react-intl';
import {Container, Grid} from '@mui/material';
import LanguageSwitcher from '../../../../@crema/core/LanguageSwitcher';
import GotoDashboardButton from '../../../elements/button/GotoDashboardButton/GotoDashboardButton';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import GotoSignInOrUpButton from '../../../elements/button/GotoSigninOrUpButton/GotoSignInOrUpButton';
import CardMediaImageView from '../../../elements/display/ImageView/CardMediaImageView';

interface AppHeaderProps {}

const Header: React.FC<AppHeaderProps> = () => {
  const authUser = useAuthUser();

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
        <Link href={LINK_FRONTEND_MIGRATION_PORTAL_ROOT}>
          {messages['menu.first_page']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link
          href={LINK_FRONTEND_MIGRATION_PORTAL_EXPATRIATE_WORKER_MONITORING}>
          {messages['migration_portal.expatriate_worker_monitoring']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_MIGRATION_PORTAL_COMPLAINTS}>
          {messages['migration_portal.complaints']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_MIGRATION_PORTAL_NOTICE}>
          {messages['menu.notice']}
        </Link>
      </MenuItem>
      <MenuItem component='span' className={classes.menuItemMobile}>
        <Link href={LINK_FRONTEND_MIGRATION_PORTAL_CONTACT}>
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
            href={LINK_FRONTEND_MIGRATION_PORTAL_ROOT}
            className={classes.headerHalfLogo}>
              <Box>
                <CardMediaImageView
                  className={classes.logoInstitute}
                  image={''}
                  defaultImage='/images/migration-portal-top-logo.png'
                  alt='migration portal logo'
                />
              </Box>
          </Link>

          {/*<Grid item md={4} className={classes.instituteName}>
            <Text
              fontWeight={'bold'}
              style={{color: '#6C91C5', fontWeight: '700'}}>
              {migrationPortal?.title}
            </Text>
          </Grid>*/}

          <Grid item md={4} className={classes.headerHalf} mr={5}>
            <img
              className={classes.logoInstitute}
              src='/images/NISE-SSP3.png'
              alt='migration portal logo'
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
                    href={LINK_FRONTEND_MIGRATION_PORTAL_ROOT}
                    className={classes.firstMenuItem}>
                    {messages['menu.first_page']}
                  </Link>
                  <Link
                    href={
                      LINK_FRONTEND_MIGRATION_PORTAL_EXPATRIATE_WORKER_MONITORING
                    }
                    className={classes.firstMenuItem}>
                    {messages['migration_portal.expatriate_worker_monitoring']}
                  </Link>
                  <Link
                    href={LINK_FRONTEND_MIGRATION_PORTAL_COMPLAINTS}
                    className={classes.firstMenuItem}>
                    {messages['migration_portal.complaints']}
                  </Link>
                  <Link
                    href={LINK_FRONTEND_MIGRATION_PORTAL_NOTICE}
                    className={classes.firstMenuItem}>
                    {messages['menu.notice']}
                  </Link>
                  <Link
                    href={LINK_FRONTEND_MIGRATION_PORTAL_CONTACT}
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
