import React, {useCallback, useState} from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Link} from '../../common';
import {KeyboardArrowDown, Login} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {getSSOLoginUrl} from '../../../common/SSOConfig';
import {ButtonProps} from '@mui/material/Button/Button';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({theme}) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
  },
}));

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
        aria-controls='my-profile-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}>
        {messages['common.registration_login'] as string}
      </Button>
      <StyledMenu
        id='my-profile-menu'
        MenuListProps={{
          'aria-labelledby': 'my-profile-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={onClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>{buttonText}</ListItemText>
        </MenuItem>
        <Divider sx={{margin: '0 !important'}} />
        <Link href={getSSOLoginUrl()}>
          <MenuItem>
            <ListItemIcon>
              <Login />
            </ListItemIcon>
            <ListItemText>{messages['common.login']}</ListItemText>
          </MenuItem>
        </Link>
      </StyledMenu>
    </Box>
  );
};

export default GotoSignInOrUpMenu;
