import React from 'react';
import useStyles from './NoticeBoard.style';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

const NoticeCard = () => {
  const classes = useStyles();
  return (
    <Card style={{padding: '10px'}}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={3} md={3}>
            <Box className={classes.avatar}>
              <Avatar
                src={'images/creativeIt.png'}
                className={classes.avatarImage}
              />
            </Box>
          </Grid>
          <Grid item xs={9} md={9}>
            <Typography style={{fontWeight: 'bold'}}>
              CreativeIt give 20% waver based on result notice
            </Typography>
            <Typography className={classes.creativaItText}>
              CreativeIt Institute
            </Typography>

            <Box>
              <Button variant='outlined' className={classes.btn}>
                2021-03-12
              </Button>
              <Button color={'primary'}>Download</Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NoticeCard;
