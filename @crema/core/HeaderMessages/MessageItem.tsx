import React from 'react';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import makeStyles from '@mui/styles/makeStyles';
import {Fonts} from '../../../shared/constants/AppEnums';
import clsx from 'clsx';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {MessageData} from '../../services/db/messages/messages';

const useStyles = makeStyles((theme: CremaTheme) => ({
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

interface MessageItemProps {
  item: MessageData;
}

const MessageItem: React.FC<MessageItemProps> = ({item}) => {
  const classes = useStyles();

  return (
    <ListItem className={clsx(classes.listItemRoot, 'item-hover')}>
      <Box mr={4}>
        <ListItemAvatar className={classes.minWidth0}>
          <Avatar className={classes.avatar} src={item.image} />
        </ListItemAvatar>
      </Box>
      <Box className={classes.textBase}>
        <Box mb={0.5} component='p' fontWeight={Fonts.MEDIUM} fontSize={14}>
          {item.name}
        </Box>
        <Box component='p' color='text.secondary'>
          {item.message}
        </Box>
      </Box>
    </ListItem>
  );
};

export default MessageItem;
