import React, {useCallback, useState} from 'react';
import LockResetIcon from '@mui/icons-material/LockReset';
import {
  Avatar,
  Button,
  Card,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@mui/material';
import {Link} from '../../../elements/common';
import {
  LINK_FRONTEND_YOUTH_FREELANCE_CORNER,
  LINK_FRONTEND_YOUTH_MY_COURSES,
  LINK_FRONTEND_YOUTH_MY_CV,
  LINK_FRONTEND_YOUTH_MY_JOBS,
  LINK_FRONTEND_YOUTH_ROOT,
  LINK_FRONTEND_YOUTH_UPDATE_PASSWORD,
} from '../../../common/appLinks';
import {
  AdminPanelSettings,
  DesktopMac,
  KeyboardArrowDown,
  Logout,
  Person,
  Receipt,
  Score,
  Settings,
  Work,
} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {getSSOLogoutUrl} from '../../../common/SSOConfig';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {loadAuthenticateUser} from '../../../../redux/actions/AuthUserLoad';
import {useDispatch} from 'react-redux';
import {
  getBrowserCookie,
  removeBrowserCookie,
} from '../../../libs/cookieInstance';
import {
  CDAPUSER_NONCE,
  COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
  COOKIE_KEY_AUTH_ID_TOKEN,
  COOKIE_KEY_CDAP_SESSION_STATE,
} from '../../../../shared/constants/AppConst';
import {signOut} from '../../../../redux/actions';
import {useRouter} from 'next/router';
import {niseDomain} from '../../../common/constants';
import Divider from '../../../components/Divider/Divider';
import {
  getMyGovLoginUrl,
  MYGOV_LOGIN_URL_USING_NISE,
} from '../../../common/CDAPConfig';

const YouthProfileMenu = () => {
  const {messages} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();
  const dispatch = useDispatch();
  const router = useRouter();

  const onGotoAdminClick = useCallback(async () => {
    try {
      await loadAuthenticateUser(dispatch, false);
    } catch (error) {
      console.log('user load failed: ', error);
    }
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onCDAPLogout = useCallback(async () => {
    try {
      removeBrowserCookie(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
      removeBrowserCookie(COOKIE_KEY_AUTH_ID_TOKEN);
      removeBrowserCookie(COOKIE_KEY_CDAP_SESSION_STATE);
      removeBrowserCookie(CDAPUSER_NONCE);
      await dispatch(signOut());
      router.push(niseDomain());
    } catch (error) {}
  }, []);

  let isCDAPUser =
    authUser?.youth_auth_source && Number(authUser.youth_auth_source) == 1;
  let nonce = getBrowserCookie(CDAPUSER_NONCE);
  let authTokenData = getBrowserCookie(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);

  let access_token: any = null;
  let isMyGovLogin = false;
  if (isCDAPUser && authTokenData && nonce) {
    access_token = authTokenData.access_token;
    if (access_token) {
      isMyGovLogin = true;
    }
  }

  const getSwitchToMyGovUrl = () => {
    if (isMyGovLogin) {
      return getMyGovLoginUrl(access_token, nonce);
    } else {
      return MYGOV_LOGIN_URL_USING_NISE;
    }
  };

  return (
    <div>
      <Button
        id='my-profile-button'
        aria-controls='my-profile-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}>
        {messages['youth_feed_menu.my_profile']}
      </Button>

      {open && (
        <Card
          id='my-profile-menu'
          sx={{
            position: 'absolute',
            marginTop: '10px',
            boxShadow:
              '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
            zIndex: 9999999,
          }}>
          <div
            style={{
              background: 'none',
              padding: 0,
              margin: 0,
              border: 0,
              outline: 0,
              appearance: 'none',
              textAlign: 'unset',
            }}>
            <Link href={LINK_FRONTEND_YOUTH_ROOT}>
              <MenuItem>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText>
                  {messages['youth_feed_menu.my_profile']}
                </ListItemText>
              </MenuItem>
            </Link>

            {authUser?.admin_access_type &&
              authUser?.admin_access_type.length > 0 && <Divider />}
            {authUser?.admin_access_type &&
              authUser?.admin_access_type.length > 0 && (
                <Link>
                  <MenuItem onClick={onGotoAdminClick}>
                    <ListItemIcon>
                      <AdminPanelSettings />
                    </ListItemIcon>
                    <ListItemText>{messages['common.goto_admin']}</ListItemText>
                  </MenuItem>
                </Link>
              )}

            <Divider sx={{margin: '0 !important'}} />
            <Link href={LINK_FRONTEND_YOUTH_MY_CV}>
              <MenuItem>
                <ListItemIcon>
                  <Receipt />
                </ListItemIcon>
                <ListItemText>{messages['youth_feed_menu.my_cv']}</ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            <Link href={LINK_FRONTEND_YOUTH_MY_COURSES}>
              <MenuItem>
                <ListItemIcon>
                  <DesktopMac />
                </ListItemIcon>
                <ListItemText>
                  {messages['youth_feed_menu.my_courses']}
                </ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            <Link href={LINK_FRONTEND_YOUTH_MY_JOBS}>
              <MenuItem>
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                <ListItemText>
                  {messages['youth_feed_menu.my_jobs']}
                </ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            <Link href={LINK_FRONTEND_YOUTH_FREELANCE_CORNER}>
              <MenuItem>
                <ListItemIcon>
                  <Score />
                </ListItemIcon>
                <ListItemText>
                  {messages['youth_feed_menu.freelance_corner']}
                </ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            <Link href={LINK_FRONTEND_YOUTH_ROOT}>
              <MenuItem>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText>
                  {messages['youth_feed_menu.settings']}
                </ListItemText>
              </MenuItem>
            </Link>
            {!isCDAPUser && <Divider />}
            {!isCDAPUser && (
              <Link href={LINK_FRONTEND_YOUTH_UPDATE_PASSWORD}>
                <MenuItem>
                  <ListItemIcon>
                    <LockResetIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {messages['update_password.label']}
                  </ListItemText>
                </MenuItem>
              </Link>
            )}
            <Divider />
            <Link href={getSwitchToMyGovUrl()} target={'_blank'}>
              <MenuItem>
                <ListItemIcon>
                  <Avatar
                    src={'./images/mygov_logo.png'}
                    sx={{
                      width: '1.2em',
                      height: '1em',
                      '& img': {
                        objectFit: 'contain',
                      },
                    }}
                  />
                </ListItemIcon>
                <ListItemText>{messages['youth.my_gov_login']}</ListItemText>
              </MenuItem>
            </Link>
            <Divider />
            {isCDAPUser ? (
              <MenuItem onClick={onCDAPLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText>{messages['common.logout']}</ListItemText>
              </MenuItem>
            ) : (
              <Link href={getSSOLogoutUrl()}>
                <MenuItem>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText>{messages['common.logout']}</ListItemText>
                </MenuItem>
              </Link>
            )}
          </div>
        </Card>
      )}
      {open && (
        <div
          title={'click to close menu'}
          style={{
            background: '#8880',
            position: 'fixed',
            zIndex: 999999,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onClick={() => handleClose()}
          onWheel={() => handleClose()}>
          {''}
        </div>
      )}
    </div>
  );
};

export default YouthProfileMenu;
