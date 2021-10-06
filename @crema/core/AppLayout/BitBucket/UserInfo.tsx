import React, {useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import {onJWTAuthSignout} from '../../../../redux/actions';
import {useAuthUser} from '../../../utility/AppHooks';
import AppContext from '../../../utility/AppContext';
import makeStyles from '@mui/styles/makeStyles';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import {orange} from '@mui/material/colors';
import {ThemeMode} from '../../../../shared/constants/AppEnums';
import {useDispatch} from 'react-redux';
import {CremaTheme} from '../../../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) => {
  return {
    avatar: {
      height: 40,
      width: 40,
      fontSize: 24,
      backgroundColor: orange[500],
      [theme.breakpoints.up('xl')]: {
        height: 55,
        width: 55,
      },
    },
    userInfo: {
      width: 'calc(100% - 75px)',
    },
    userName: {
      color: (props: {themeMode: ThemeMode}) =>
        props.themeMode === 'light' ? '#313541' : 'white',
    },
    pointer: {
      cursor: 'pointer',
    },
  };
});

interface UserInfoProps {
  props?: any;
}

const UserInfo: React.FC<UserInfoProps> = () => {
  const {themeMode} = useContext(AppContext);
  const dispatch = useDispatch();
  const user = useAuthUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserAvatar = () => {
    if (user && user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user && user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };
  const classes = useStyles({themeMode});

  return (
    <Box py={3} pl={{xs: 2, sm: 6}}>
      <Box className={classes.pointer} onClick={handleClick}>
        {user && user.photoURL ? (
          <Avatar className={classes.avatar} src={user.photoURL}/>
        ) : (
          <Avatar className={classes.avatar}>{getUserAvatar()}</Avatar>
        )}
      </Box>
      <Box className={classes.userInfo}>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem>My account</MenuItem>
          <MenuItem
            onClick={() => dispatch(onJWTAuthSignout())}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default UserInfo;
