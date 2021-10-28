import useStyles from './Notification.style';
import notification, {
  NotificationData,
} from '../../../@crema/services/db/notifications/notification';
import SearchIcon from '@mui/icons-material/Search';

import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  List,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Tile from '../feed/components/Tile';
import YouthNotificationItem from './YouthNotificationItem';
import BasicInfo from '../feed/BasicInfo';
import SideMenu from '../../../@softbd/elements/YouthSideMenu';
import React from 'react';

const Notification = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth={'lg'} className={classes.container}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <BasicInfo />
              </Grid>
              <Grid item xs={12}>
                <SideMenu />
              </Grid>
            </Grid>
          </Grid>

          <Grid item sm={12} md={5}>
            <Box>
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
            <Paper className={classes.notificationBox}>
              <Box>
                <List className={classes.list}>
                  {notification.map((item: NotificationData, index) => {
                    return (
                      <>
                        <YouthNotificationItem key={item.id} item={item} />
                        <Divider />
                      </>
                    );
                  })}
                </List>
              </Box>
            </Paper>
          </Grid>

          <Grid item sm={12} md={4}>
            <Box style={{marginLeft: 10}}>
              <Box>
                <Typography>Filter By date</Typography>
              </Box>

              <Grid container className={classes.card} spacing={2}>
                <Grid item md={6} sm={6}>
                  <Tile amount='150' label='Total' backgroundColor='#dc87e9' />
                </Grid>
                <Grid item md={6} sm={6}>
                  <Tile amount='10' label='Today' backgroundColor='#5c7ef1' />
                </Grid>
                <Grid item md={6} sm={6}>
                  <Tile amount='80' label='Recet' backgroundColor='#33bd7e' />
                </Grid>
                <Grid item md={6} sm={6}>
                  <Tile amount='15' label='Unread' backgroundColor='#67e2da' />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Notification;
