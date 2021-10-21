import React, {FC} from 'react';
import Avatar from '@mui/material/Avatar';
import {useDispatch} from 'react-redux';
import {onJWTAuthSignout} from '../../../redux/actions';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import makeStyles from '@mui/styles/makeStyles';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import {orange} from '@mui/material/colors';
import {Fonts} from '../../../shared/constants/AppEnums';
import Hidden from '@mui/material/Hidden';

const useStyles = makeStyles((theme) => {
  return {
    userRoot: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      justifyContent: 'center',
    },
    avatar: {
      fontSize: 24,
      backgroundColor: orange[500],
    },
    userInfo: {
      width: 'calc(100% - 75px)',
    },
    pointer: {
      cursor: 'pointer',
    },
    userName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontSize: 15,
      fontWeight: Fonts.MEDIUM,
      color: (props: {bgType: string}) =>
        props.bgType === 'colored' ? 'white' : theme.palette.text.primary,
    },
  };
});

interface HorUserInfoProps {
  bgType?: string;
}

const HorUserInfo: FC<HorUserInfoProps> = ({bgType = 'colored'}) => {
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
  const classes = useStyles({bgType});

  return (
    <Box py={2} pl={{xs: 2, sm: 3, md: 5}}>
      <Box className={classes.userRoot} display='flex' onClick={handleClick}>
        {user && user.photoURL ? (
          <Avatar className={classes.avatar} src={user.photoURL} />
        ) : (
          <Avatar className={classes.avatar}>{getUserAvatar()}</Avatar>
        )}
        <Hidden xlDown>
          <Box ml={3} className={classes.userName}>
            {user && (user.displayName ? user.displayName : user.email)}
            <Box fontSize={13} fontWeight={Fonts.LIGHT}>
              System Manager
            </Box>
          </Box>
        </Hidden>
      </Box>
      <Box className={classes.userInfo}>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={() => dispatch(onJWTAuthSignout())}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default HorUserInfo;
