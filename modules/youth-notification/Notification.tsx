import React from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  Popover,
  Typography,
} from '@material-ui/core';
import useStyles from './Notification.style';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import notification, {
  NotificationData,
} from '../../@crema/services/db/notifications/notification';

import IntlMessages from '../../@crema/utility/IntlMessages';
import Scrollbar from '../../@crema/core/Scrollbar';
import List from '@material-ui/core/List';
import NotificationItem from '../../@crema/core/Notifications/NotificationItem';

const Notification = () => {
  const classes = useStyles();
  const [anchorNotification, setAnchorNotification] =
    React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Grid container>
        <Grid item sm={12} md={3}></Grid>

        <Grid item sm={12} md={5}>
          <Box className={classes.midBox}>
            <Typography variant={'h6'}>Notification</Typography>
          </Box>

          {/*SearchBox*/}
          <Card className={classes.searchBox}>
            <Grid container spacing={2}>
              <Grid item xs={9} sm={10} md={10}>
                <TextField
                  variant='outlined'
                  name='searchBox'
                  placeholder='Search'
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    className: classes.searchInputBorderHide,
                  }}
                />
              </Grid>
              <Grid item xs={3} sm={2} md={2}>
                <Button
                  variant='contained'
                  color={'primary'}
                  className={classes.searchButton}>
                  Search
                </Button>
              </Grid>
            </Grid>
          </Card>

          {/* Notification Bar*/}

          <Popover
            anchorEl={anchorNotification}
            id='language-switcher'
            className={classes.crPopover}
            keepMounted
            open={true}
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
                <Box component='h5' fontFamily='Poppins' fontSize={16}>
                  <IntlMessages id='common.notifications' />(
                  {notification.length})
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
            </Box>
          </Popover>
        </Grid>

        <Grid item sm={12} md={4}></Grid>
      </Grid>
    </>
  );
};

export default Notification;
