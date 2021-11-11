import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ListItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {Fonts} from '../../../shared/constants/AppEnums';
import clsx from 'clsx';
import {NotificationData} from '../../services/db/notifications/notification';

const PREFIX = 'NotificationItem';

const classes = {
  textBase: `${PREFIX}-textBase`,
  avatar: `${PREFIX}-avatar`,
  minWidth0: `${PREFIX}-minWidth0`,
  listItemRoot: `${PREFIX}-listItemRoot`
};

const StyledListItem = styled(ListItem)(() => ({
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

  [`&.${classes.listItemRoot}`]: {
    padding: '8px 20px',
  }
}));

interface NotificationItemProps {
  item: NotificationData;
}

const NotificationItem: React.FC<NotificationItemProps> = ({item}) => {

  return (
    <StyledListItem className={clsx(classes.listItemRoot, 'item-hover')}>
      <Box mr={4}>
        <ListItemAvatar className={classes.minWidth0}>
          <Avatar
            className={classes.avatar}
            alt='Remy Sharp'
            src={item.image}
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
    </StyledListItem>
  );
};

export default NotificationItem;
