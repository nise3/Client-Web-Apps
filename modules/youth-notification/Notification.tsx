import React, {useState} from 'react';
import useStyles from './Notification.style';
import notification, {
  NotificationData,
} from '../../@crema/services/db/notifications/notification';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationItem from '../../@crema/core/Notifications/NotificationItem';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Tile from '../youthFeed/components/Tile';
const options = ['None'];

const ITEM_HEIGHT = 48;
const Notification = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Container maxWidth={'xl'}>
        <Grid container spacing={2}>
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
            <Paper className={classes.notificationBox}>
              <Box>
                <List className={classes.list}>
                  {notification.map((item: NotificationData, index) => {
                    return (
                      <>
                        <NotificationItem key={item.id} item={item} />

                        {/*MenuItem*/}

                        <IconButton
                          aria-label='more'
                          id='long-button'
                          aria-controls='long-menu'
                          aria-expanded={open ? 'true' : undefined}
                          aria-haspopup='true'
                          onClick={handleClick}>
                          <MoreVertIcon />
                        </IconButton>
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

                        <Divider />
                      </>
                    );
                  })}
                </List>
              </Box>
            </Paper>
          </Grid>

          <Grid item sm={12} md={4}>
            <Box style={{marginTop: 20, marginLeft: 10}}>
              <Typography>Filter By date</Typography>

              <Grid container className={classes.card} spacing={2}>
                <Grid item md={6} sm={6}>
                  <Tile amount='150' label='Total' backgroundColor='#dc87e9' />
                </Grid>
                <Grid item md={6} sm={6}>
                  <Tile amount='150' label='Total' backgroundColor='#5c7ef1' />
                </Grid>
                <Grid item md={6} sm={6}>
                  <Tile amount='150' label='Total' backgroundColor='#33bd7e' />
                </Grid>
                <Grid item md={6} sm={6}>
                  <Tile amount='150' label='Total' backgroundColor='#67e2da' />
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
