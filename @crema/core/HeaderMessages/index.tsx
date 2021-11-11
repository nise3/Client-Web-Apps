import React from 'react';
import {styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import SmsIcon from '@mui/icons-material/Sms';
import messages, {MessageData} from '../../services/db/messages/messages';
import MessageItem from './MessageItem';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Scrollbar from '../Scrollbar';
import IntlMessages from '../../utility/IntlMessages';
import Hidden from '@mui/material/Hidden';
import clsx from 'clsx';
import {Fonts} from '../../../shared/constants/AppEnums';

const PREFIX = 'HeaderMessages';

const classes = {
  crPopover: `${PREFIX}-crPopover`,
  btnPopover: `${PREFIX}-btnPopover`,
  notiBtn: `${PREFIX}-notiBtn`,
  listStyle: `${PREFIX}-listStyle`,
  badgeStyle: `${PREFIX}-badgeStyle`,
  smsIcon: `${PREFIX}-smsIcon`,
  listRoot: `${PREFIX}-listRoot`,
};
const StyledIconButton = styled(IconButton)(({theme}) => ({
  justifyContent: 'flex-start',
  width: '100%',
  height: 56,
  fontSize: 16,
  borderRadius: 0,
  paddingLeft: '1rem',
  paddingRight: '1rem',
  color: theme.palette.grey[800],
  '&:hover, &:focus': {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
  },
  [theme.breakpoints.up('sm')]: {
    height: 70,
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'center',
    width: 'auto',
    borderLeft: 'solid 1px',
    borderColor: theme.palette.grey[200],
    color: theme.palette.grey[400],
    '&:hover, &:focus': {
      color: theme.palette.text.primary,
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },
  [theme.breakpoints.up('xl')]: {
    paddingLeft: '2.5rem',
    paddingRight: '2.5rem',
  },
  [`& .${classes.badgeStyle}`]: {
    marginRight: 8,
  },

  [`& .${classes.smsIcon}`]: {
    fontSize: 22,
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('xl')]: {
      fontSize: 30,
    },
  },
}));

const StyledPopover = styled(Popover)(({theme}) => ({
  '& .MuiPopover-paper': {
    width: 260,
    [theme.breakpoints.up('sm')]: {
      width: 300,
    },
    [theme.breakpoints.up('xl')]: {
      width: 380,
    },
  },
  '& .scroll-submenu': {
    maxHeight: 200,
    [theme.breakpoints.up('xl')]: {
      maxHeight: 380,
    },
  },

  [`& .${classes.btnPopover}`]: {
    borderRadius: 0,
    width: '100%',
    textTransform: 'capitalize',
  },

  [`& .${classes.listStyle}`]: {
    paddingLeft: 20,
    paddingRight: 20,
  },

  [`& .${classes.listRoot}`]: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

interface HeaderMessagesProps {}

const HeaderMessages: React.FC<HeaderMessagesProps> = () => {
  const [anchorMessages, setAnchorMessages] =
    React.useState<HTMLButtonElement | null>(null);

  const onClickMessagesButton = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorMessages(event.currentTarget);
  };

  return (
    <>
      <StyledIconButton
        aria-label='show 4 new mails'
        color='inherit'
        onClick={onClickMessagesButton}
        size='large'>
        <Badge
          className={classes.badgeStyle}
          badgeContent={messages.length}
          color='secondary'>
          <SmsIcon className={clsx(classes.smsIcon, 'smsIcon')} />
        </Badge>
        <Hidden mdUp>
          <Box
            ml={4}
            fontSize={16}
            fontFamily='Poppins'
            fontWeight={Fonts.REGULAR}
            component='span'>
            <IntlMessages id='dashboard.messages' />
          </Box>
        </Hidden>
      </StyledIconButton>
      <StyledPopover
        anchorEl={anchorMessages}
        id='app-message'
        open={Boolean(anchorMessages)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => setAnchorMessages(null)}>
        <Box>
          <Box px={5} py={3}>
            <Box component='h5' fontWeight={Fonts.MEDIUM}>
              <IntlMessages id='dashboard.messages' />({messages.length})
            </Box>
          </Box>
          <Scrollbar className='scroll-submenu'>
            <List
              className={classes.listRoot}
              onClick={() => {
                setAnchorMessages(null);
              }}>
              {messages.map((item: MessageData, index) => (
                <MessageItem key={item.id} item={item} />
              ))}
            </List>
          </Scrollbar>
          <Box mt={2}>
            <Button
              className={classes.btnPopover}
              variant='contained'
              color='primary'>
              <IntlMessages id='common.viewAll' />
            </Button>
          </Box>
        </Box>
      </StyledPopover>
    </>
  );
};

export default HeaderMessages;
