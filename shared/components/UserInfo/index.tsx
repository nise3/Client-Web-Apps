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
import {checkPermission} from '../../../@crema/utility/authorizations';
import {useIntl} from 'react-intl';
import AvatarImageView from '../../../@softbd/elements/display/ImageView/AvatarImageView';

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
      fontSize: '1.5rem',
      backgroundColor: orange[500],
    },
    [`& .${classes.userName}`]: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '1rem',
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
  const {messages} = useIntl();

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

  const getUserTypeName = () => {
    if (user?.isSystemUser) {
      return messages['user.type.system'];
    } else if (user?.isTrainingCenterUser) {
      return messages['common.training_center'];
    } else if (user?.isInstituteUser) {
      return messages['user.type.institute'];
    } else if (user?.isOrganizationUser) {
      return messages['user.type.organization'];
    } else if (user?.isIndustryAssociationUser) {
      return messages['user.type.industry_association'];
    }
    return '';
  };

  return (
    <StyledBox>
      <Box display='flex' alignItems='center'>
        {user && user?.profile_pic ? (
          <AvatarImageView
            className={classes.profilePic}
            src={user?.profile_pic}
          />
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
                <MenuItem onClick={openDetailsModal}>
                  {messages['my_account.label']}
                </MenuItem>
                {user?.isIndustryAssociationUser &&
                  checkPermission(user, ['view_any_association_profile']) && (
                    <MenuItem>
                      <Link href='/association-profile'>
                        {messages['association.association_profile']}
                      </Link>
                    </MenuItem>
                  )}
                {user?.isInstituteUser &&
                  checkPermission(user, ['view_institute_profile']) && (
                    <MenuItem>
                      <Link href='/institute-profile'>
                        {messages['institute_profile.label']}
                      </Link>
                    </MenuItem>
                  )}
                {user?.isOrganizationUser &&
                  checkPermission(user, ['view_organization_profile']) && (
                    <MenuItem>
                      <Link href='/organization-profile'>
                        {messages['common.profile']}
                      </Link>
                    </MenuItem>
                  )}
                <MenuItem>
                  <Link href={getSSOLogoutUrl()}>
                    {messages['common.logout']}
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Box className={classes.designation}>
            {getUserTypeName()} {messages['user.label']}
          </Box>
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
