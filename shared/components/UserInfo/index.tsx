import React, {useCallback, useContext, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import {useDispatch} from 'react-redux';
import {onJWTAuthSignout} from '../../../redux/actions';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import AppContext from '../../../@crema/utility/AppContext';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import {orange} from '@mui/material/colors';
import {Fonts, ThemeMode} from '../../constants/AppEnums';
import AppContextPropsType from '../../../types/AppContextPropsType';
import {CommonAuthUser} from '../../../types/models/CommonAuthUser';
import UserInfoDetailsPopup from './UserInfoDetailsPopup';
import UserInfoEditPopup from './UserInfoEditPopup';

const useStyles = makeStyles((theme) => {
  return {
    crUserInfo: {
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
    },
    profilePic: {
      fontSize: 24,
      backgroundColor: orange[500],
    },
    userInfo: {
      width: 'calc(100% - 75px)',
    },
    userName: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: 16,
      fontWeight: Fonts.MEDIUM,
      color: (props: {themeMode: ThemeMode}) =>
        props.themeMode === ThemeMode.LIGHT ? '#313541' : 'white',
    },
    designation: {
      marginTop: -2,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: theme.palette.text.secondary,
    },
    pointer: {
      cursor: 'pointer',
    },
  };
});

const UserInfo: React.FC<{}> = () => {
  const {themeMode} = useContext<AppContextPropsType>(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const dispatch = useDispatch();
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

  const classes = useStyles({themeMode});

  return (
    <Box
      px={{xs: 4, xl: 7}}
      className={clsx(classes.crUserInfo, 'cr-user-info')}>
      <Box display='flex' alignItems='center'>
        {user && user.photoURL ? (
          <Avatar className={classes.profilePic} src={user.photoURL} />
        ) : (
          <Avatar className={classes.profilePic}>{getUserAvatar()}</Avatar>
        )}
        <Box ml={4} className={clsx(classes.userInfo, 'user-info')}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'>
            <Box mb={0} className={clsx(classes.userName)}>
              {user && (user.displayName ? user.displayName : 'Admin User ')}
            </Box>
            <Box
              ml={3}
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
                <MenuItem onClick={() => dispatch(onJWTAuthSignout())}>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Box className={classes.designation}>System Manager</Box>
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
    </Box>
  );
};

export default UserInfo;
