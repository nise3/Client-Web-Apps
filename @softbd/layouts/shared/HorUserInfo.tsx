import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import {useDispatch} from 'react-redux';
import {signOut} from '../../../redux/actions';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import {orange} from '@mui/material/colors';
import {Fonts} from '../../../shared/constants/AppEnums';
import Hidden from '@mui/material/Hidden';

const PREFIX = 'HorUserInfo';

const classes = {
  userRoot: `${PREFIX}-userRoot`,
  avatar: `${PREFIX}-avatar`,
  userInfo: `${PREFIX}-userInfo`,
  pointer: `${PREFIX}-pointer`,
  userName: `${PREFIX}-userName`,
};

const StyledBox = styled(Box)(({theme}) => {
  return {
    [`& .${classes.userRoot}`]: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      justifyContent: 'center',
    },
    [`& .${classes.avatar}`]: {
      fontSize: '1.5rem',
      backgroundColor: orange[500],
    },
    [`& .${classes.userInfo}`]: {
      width: 'calc(100% - 75px)',
    },
    [`& .${classes.pointer}`]: {
      cursor: 'pointer',
    },
    [`& .${classes.userName}`]: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontSize: '1rem',
      fontWeight: Fonts.MEDIUM,
      color: theme.palette.primary.contrastText,
    },
  };
});

interface HorUserInfoProps {
  bgType?: string;
}

const HorUserInfo: FC<HorUserInfoProps> = () => {
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

  return (
    <StyledBox py={2} pl={{xs: 2, sm: 3, md: 5}}>
      <Box className={classes.userRoot} display='flex' onClick={handleClick}>
        {user && user.photoURL ? (
          <Avatar className={classes.avatar} src={user.photoURL} />
        ) : (
          <Avatar className={classes.avatar}>{getUserAvatar()}</Avatar>
        )}
        <Hidden xlDown>
          <Box ml={3} className={classes.userName}>
            {user && (user.displayName ? user.displayName : user.email)}
            <Box fontSize='0.8rem' fontWeight={Fonts.LIGHT}>
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
          <MenuItem onClick={() => dispatch(signOut())}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </StyledBox>
  );
};

export default HorUserInfo;
