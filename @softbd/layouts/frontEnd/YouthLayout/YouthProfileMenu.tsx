import React, {useCallback, useState} from 'react';
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
} from '@mui/material';
import {styled} from '@mui/styles';
import {Link} from '../../../elements/common';
import {
  LINK_FRONTEND_YOUTH_FREELANCE_CORNER,
  LINK_FRONTEND_YOUTH_MY_COURSES,
  LINK_FRONTEND_YOUTH_MY_CV,
  LINK_FRONTEND_YOUTH_ROOT,
  LINK_FRONTEND_YOUTH_SETTINGS,
} from '../../../common/appLinks';
import {
  DesktopMac,
  KeyboardArrowDown,
  Logout,
  Person,
  Receipt,
  Score,
  Settings,
} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {useDispatch} from 'react-redux';
import {onJWTAuthSignout} from '../../../../redux/actions';

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

const YouthProfileMenu = () => {
  const {messages} = useIntl();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

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
      <StyledMenu
        id='my-profile-menu'
        MenuListProps={{
          'aria-labelledby': 'my-profile-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
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

        <Divider />
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
        <Link href={LINK_FRONTEND_YOUTH_SETTINGS}>
          <MenuItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>{messages['youth_feed_menu.settings']}</ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={() => dispatch(onJWTAuthSignout())}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>{messages['common.logout']}</ListItemText>
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default YouthProfileMenu;
