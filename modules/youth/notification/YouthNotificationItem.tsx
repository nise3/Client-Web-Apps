import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {IconButton, ListItem, Menu, MenuItem, Typography} from '@mui/material';
import {Fonts} from '../../../shared/constants/AppEnums';
import clsx from 'clsx';
import {NotificationData} from '../../../@crema/services/db/notifications/notification';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AvatarImageView from '../../../@softbd/elements/display/ImageView/AvatarImageView';

const PREFIX = 'YouthNotificationItem';

const classes = {
  textBase: `${PREFIX}-textBase`,
  avatar: `${PREFIX}-avatar`,
  minWidth0: `${PREFIX}-minWidth0`,
  listItemRoot: `${PREFIX}-listItemRoot`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.textBase}`]: {
    fontSize: 14,
  },

  [`& .${classes.avatar}`]: {
    width: 48,
    height: 48,
  },

  [`& .${classes.minWidth0}`]: {
    minWidth: 0,
  },

  [`& .${classes.listItemRoot}`]: {
    padding: '8px 20px',
  },
}));

const options = ['None', 'asds'];

const ITEM_HEIGHT = 48;

interface NotificationItemProps {
  item: NotificationData;
}

const YouthNotificationItem: React.FC<NotificationItemProps> = ({item}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <StyledBox style={{position: 'relative'}}>
      <Typography
        style={{
          position: 'absolute',
          right: '20px',
          top: '5px',
          fontSize: 'small',
        }}>
        1min
      </Typography>
      <ListItem
        className={clsx(classes.listItemRoot, 'item-hover')}
        secondaryAction={
          <IconButton id='long-button' onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
        }>
        <Box mr={4}>
          <ListItemAvatar className={classes.minWidth0}>
            <AvatarImageView
              className={classes.avatar}
              alt='Remy Sharp'
              src={item?.image}
            />
          </ListItemAvatar>
        </Box>
        <Box component='p' className={classes.textBase} color='text.secondary'>
          <Box
            mr={2}
            component='span'
            display='inline-block'
            color='text.primary'
            fontWeight={Fonts.MEDIUM}>
            {item.name}
          </Box>
          {item.message}
        </Box>
      </ListItem>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}>
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === 'Pyxis'}
            onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </StyledBox>
  );
};

export default YouthNotificationItem;
