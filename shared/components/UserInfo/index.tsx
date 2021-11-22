import React, {useCallback, useContext, useState} from 'react';
import {styled} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import AppContext from '../../../@crema/utility/AppContext';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import {orange} from '@mui/material/colors';
import {Fonts, ThemeMode} from '../../constants/AppEnums';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import UserInfoDetailsPopup from './UserInfoDetailsPopup';
import UserInfoEditPopup from './UserInfoEditPopup';
import {getSSOLogoutUrl} from '../../../@softbd/common/SSOConfig';
import {Link} from '../../../@softbd/elements/common';

const PREFIX = 'UserInfo';

const classes = {
  profilePic: `${PREFIX}-profilePic`,
  userInfo: `${PREFIX}-userInfo`,
  userName: `${PREFIX}-userName`,
  designation: `${PREFIX}-designation`,
  pointer: `${PREFIX}-pointer`,
};

const StyledBox = styled(Box)(({theme}) => {
  const {themeMode} = useContext<AppContextPropsType>(AppContext);

  return {
    paddingLeft: '20px',
    paddingRight: '20px',
    backgroundColor: 'rgba(0,0,0,.08)',
    paddingTop: 9,
    paddingBottom: 9,
    minHeight: 56,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 10,
      paddingBottom: 10,
      minHeight: 70,
    },
    [`& .${classes.userInfo}`]: {
      width: 'calc(100% - 75px)',
    },
    [`& .${classes.profilePic}`]: {
      fontSize: 24,
      backgroundColor: orange[500],
    },
    [`& .${classes.userName}`]: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: 16,
      fontWeight: Fonts.MEDIUM,
      color:
        themeMode === ThemeMode.LIGHT
          ? theme.palette.grey['500']
          : theme.palette.grey['400'],
    },
    [`& .${classes.designation}`]: {
      marginTop: -2,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color:
        themeMode === ThemeMode.LIGHT
          ? theme.palette.grey['500']
          : theme.palette.grey['400'],
    },
    [`& .${classes.pointer}`]: {
      cursor: 'pointer',
    },
  };
});

const UserInfo: React.FC = () => {
  const {themeMode} = useContext<AppContextPropsType>(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const user: CommonAuthUser | null = useAuthUser();

  const closeEditModal = useCallback(() => {
    setIsOpenEditModal(false);
  }, []);

  const openEditModal = useCallback(() => {
    setIsOpenDetailsModal(false);
    setIsOpenEditModal(true);
  }, []);
  const openDetailsModal = useCallback(() => {
    setAnchorEl(null);
    setIsOpenDetailsModal(true);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const handleClick = (event: any) => {
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
    <StyledBox>
      <Box display='flex' alignItems='center'>
        {user && user.photoURL ? (
          <Avatar className={classes.profilePic} src={user.photoURL} />
        ) : (
          <Avatar className={classes.profilePic}>{getUserAvatar()}</Avatar>
        )}
        <Box ml={4} className={classes.userInfo}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'>
            <Box mb={0} className={classes.userName}>
              {user && (user.displayName ? user.displayName : 'Admin User ')}
            </Box>
            <Box
              className={classes.pointer}
              color={themeMode === 'light' ? '#313541' : 'white'}>
              <ExpandMoreIcon onClick={handleClick} />
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={openDetailsModal}>My account</MenuItem>
                <MenuItem>
                  <Link href={getSSOLogoutUrl()}>Logout</Link>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Box className={classes.designation}>{user?.userType}</Box>
        </Box>
      </Box>
      {isOpenDetailsModal && (
        <UserInfoDetailsPopup
          key={1}
          onClose={closeDetailsModal}
          openEditModal={openEditModal}
        />
      )}
      {isOpenEditModal && (
        <UserInfoEditPopup key={1} onClose={closeEditModal} />
      )}
    </StyledBox>
  );
};

export default UserInfo;
