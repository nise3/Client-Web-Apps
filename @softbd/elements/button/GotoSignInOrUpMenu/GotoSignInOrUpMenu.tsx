import React, {useCallback, useState} from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  Card,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from '@mui/material';
import {Link} from '../../common';
import {KeyboardArrowDown, Login} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {getSSOLoginUrl} from '../../../common/SSOConfig';
import {ButtonProps} from '@mui/material/Button/Button';
import {getCDAPLoginUrl} from '../../../common/CDAPConfig';

interface Props extends ButtonProps {
  onClick: () => void;
  buttonText: string;
  icon: React.ReactNode;
}

const GotoSignInOrUpMenu = ({onClick, buttonText, icon, ...extra}: Props) => {
  const {messages} = useIntl();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Box sx={{whiteSpace: 'nowrap'}}>
      <Button
        sx={{height: '100%'}}
        id='my-profile-button'
        /*  aria-controls='my-profile-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}*/
        variant='contained'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}>
        {messages['common.registration_login'] as string}
      </Button>
      {open && (
        <div
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
      {open && (
        <Card
          sx={{
            position: 'absolute',
            marginTop: '10px',
            boxShadow:
              '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
            zIndex: 9999999,
          }}>
          {/** CAN NOT USE ANYTHING OTHER THAN button */}
          <button
            tabIndex={-1}
            style={{
              background: 'none',
              padding: 0,
              margin: 0,
              border: 0,
              outline: 0,
              appearance: 'none',
              textAlign: 'unset',
            }}>
            <Link>
              <MenuItem onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{buttonText}</ListItemText>
              </MenuItem>
            </Link>

            <Divider sx={{margin: '0 !important'}} />
            <Link href={getSSOLoginUrl()}>
              <MenuItem>
                <ListItemIcon>
                  <Login />
                </ListItemIcon>
                <ListItemText>{messages['common.login']}</ListItemText>
              </MenuItem>
            </Link>
            <Divider sx={{margin: '0 !important'}} />
            <Link href={getCDAPLoginUrl()}>
              <MenuItem>
                <ListItemIcon>
                  <Login />
                </ListItemIcon>
                <ListItemText>{messages['common.cdap_login']}</ListItemText>
              </MenuItem>
            </Link>
          </button>
        </Card>
      )}
    </Box>
  );
};

export default GotoSignInOrUpMenu;
