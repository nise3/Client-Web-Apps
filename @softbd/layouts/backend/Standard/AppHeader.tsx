import React, {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LanguageSwitcher from '../../../../@crema/core/LanguageSwitcher';
import {toggleNavCollapsed} from '../../../../redux/actions';
import {useDispatch} from 'react-redux';
import Box from '@mui/material/Box';
import SearchBar from '../../../../@crema/core/SearchBar';
import {classes, StyledAppBar, StyledToolbar} from './AppHeader.style';
import HeaderMessages from '../../../../@crema/core/HeaderMessages';
import Notifications from '../../../../@crema/core/Notifications';
import AppLogo from '../../../../shared/components/AppLogo';
import clsx from 'clsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Theme} from '@mui/system';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {useIntl} from 'react-intl';
import {Body1} from '../../../elements/common';
import {Link} from '../../../elements/common';
import {Button} from '@mui/material';
import {CommonAuthUser} from '../../../../redux/types/models/CommonAuthUser';

interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const dispatch = useDispatch();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const authUser = useAuthUser<CommonAuthUser>();
  const {messages} = useIntl();
  const [paymentURL, setPaymentURL] = useState<string | null>(null);

  const homePageUrl = `${window?.location?.protocol}//${
    authUser?.domain ? authUser?.domain : ''
  }`;

  useEffect(() => {
    if (
      authUser &&
      authUser?.organization &&
      authUser.organization?.additional_information
    ) {
      setPaymentURL(
        authUser.organization.additional_information.payment_page_url,
      );
    }
  }, [authUser]);

  const breakpointMDUp = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  );

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
      <MenuItem className={classes.menuItemRoot}>
        <HeaderMessages />
      </MenuItem>
      <MenuItem className={classes.menuItemRoot}>
        <Notifications />
      </MenuItem>
      <LanguageSwitcher />
    </Menu>
  );

  return (
    <>
      <StyledAppBar color='inherit' className={clsx(classes.appBar, 'app-bar')}>
        <StyledToolbar className={classes.appToolbar}>
          {!breakpointMDUp && (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='open drawer'
              onClick={() => dispatch(toggleNavCollapsed())}
              size='large'>
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
          )}
          {/* <AppNavLink to='http://nise.asm'>
            <AppLogo />
          </AppNavLink> */}
          <Link href={homePageUrl}>
            <AppLogo />
          </Link>
          <Box className={classes.grow} />
          <SearchBar borderLight placeholder='Search…' />
          <Box className={classes.sectionDesktop}>
            <LanguageSwitcher />
            {/*   <HeaderMessages />
            <Notifications />*/}
          </Box>
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

          {paymentURL && (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  background: 'red',
                  padding: '3px',
                  width: '500px',
                  border: '1px solid red',
                  color: '#fff',
                  top: '10px',
                  left: 'calc(50vw - 250px)',
                  zIndex: '1101',
                  textAlign: 'center',
                  borderRadius: '5px',
                }}>
                <Body1 centered={true}>
                  {messages['payment.incomplete_text']}
                </Body1>
                <Button variant={'contained'} color={'primary'}>
                  <Link href={paymentURL} passHref={true}>
                    {messages['common.pay_now']}
                  </Link>
                </Button>
              </Box>
            </>
          )}
        </StyledToolbar>
      </StyledAppBar>
      {renderMobileMenu}
    </>
  );
};
export default AppHeader;
