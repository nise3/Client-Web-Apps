import React from 'react';
import {styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import notification, {
  NotificationData,
} from '../../services/db/notifications/notification';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {Popover} from '@mui/material';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Scrollbar from '../Scrollbar';
import IntlMessages from '../../utility/IntlMessages';
import Hidden from '@mui/material/Hidden';
import clsx from 'clsx';
import NotificationItem from './NotificationItem';
import {Fonts} from '../../../shared/constants/AppEnums';

const PREFIX = 'Notifications';

const classes = {
  btnPopover: `${PREFIX}-btnPopover`,
  notiIcon: `${PREFIX}-notiIcon`,
  list: `${PREFIX}-list`,
  badge: `${PREFIX}-badge`,
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
    borderLeftColor: theme.palette.grey[200],
    color: theme.palette.grey[400],
    '&:hover, &:focus': {
      color: theme.palette.text.primary,
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

  [`& .${classes.notiIcon}`]: {
    fontSize: 22,
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('xl')]: {
      fontSize: 30,
    },
  },

  [`& .${classes.badge}`]: {
    marginRight: 8,
  },
}));

const StyledPopOver = styled(Popover)(({theme}) => ({
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

  [`& .${classes.list}`]: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = () => {
  const [anchorNotification, setAnchorNotification] =
    React.useState<HTMLButtonElement | null>(null);

  const onClickNotificationButton = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorNotification(event.currentTarget);
  };

  return (
    <>
      <StyledIconButton
        aria-label='show 17 new notifications'
        color='inherit'
        onClick={onClickNotificationButton}
        size='large'>
        <Badge
          className={classes.badge}
          badgeContent={notification.length}
          color='secondary'>
          <NotificationsActiveIcon
            className={clsx(classes.notiIcon, 'notiIcon')}
          />
        </Badge>
        <Hidden mdUp>
          <Box ml={4} fontSize={16} fontWeight={Fonts.REGULAR} component='span'>
            <IntlMessages id='common.notifications' />
          </Box>
        </Hidden>
      </StyledIconButton>
      <StyledPopOver
        anchorEl={anchorNotification}
        id='language-switcher'
        keepMounted
        open={Boolean(anchorNotification)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => setAnchorNotification(null)}>
        <Box>
          <Box px={5} py={3}>
            <Box component='h5' fontSize={16}>
              <IntlMessages id='common.notifications' />({notification.length})
            </Box>
          </Box>
          <Scrollbar className='scroll-submenu'>
            <List
              className={classes.list}
              onClick={() => {
                setAnchorNotification(null);
              }}>
              {notification.map((item: NotificationData, index) => (
                <NotificationItem key={item.id} item={item} />
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
      </StyledPopOver>
    </>
  );
};

export default Notifications;
