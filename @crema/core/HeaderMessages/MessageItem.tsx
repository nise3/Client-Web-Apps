import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import makeStyles from '@mui/styles/makeStyles';
import {Fonts} from '../../../shared/constants/AppEnums';
import clsx from 'clsx';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import {MessageData} from '../../services/db/messages/messages';

const PREFIX = 'MessageItem';

const classes = {
  textBase: `${PREFIX}-textBase`,
  avatar: `${PREFIX}-avatar`,
  minWidth0: `${PREFIX}-minWidth0`,
  listItemRoot: `${PREFIX}-listItemRoot`
};

const StyledListItem = styled(ListItem)((
  {
    theme: CremaTheme
  }
) => ({
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

interface MessageItemProps {
  item: MessageData;
}

const MessageItem: React.FC<MessageItemProps> = ({item}) => {


  return (
    <StyledListItem className={clsx(classes.listItemRoot, 'item-hover')}>
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
    </StyledListItem>
  );
};

export default MessageItem;
