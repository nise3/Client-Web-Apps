import React from 'react';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {ListItem} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {Fonts} from '../../shared/constants/AppEnums';
import clsx from 'clsx';
import {NotificationData} from '../../@crema/services/db/notifications/notification';

const useStyles = makeStyles(() => ({
  textBase: {
    fontSize: 14,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  minWidth0: {
    minWidth: 0,
  },
  listItemRoot: {
    padding: '8px 20px',
  },
}));

interface NotificationItemProps {
  item: NotificationData;
}

const NotificationItem: React.FC<NotificationItemProps> = ({item}) => {
  const classes = useStyles();
  return (
    <ListItem className={clsx(classes.listItemRoot, 'item-hover')}>
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
    </ListItem>
  );
};

export default NotificationItem;
