import React from 'react';
import useStyles from './NoticeBoard.style';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

const NoticeCard = () => {
  const classes = useStyles();
  return (
    <Container>
      <Paper>
        <Box style={{padding: '20px'}}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Box className={classes.avatar}>
                <Avatar
                  src={'images/creativeIt.png'}
                  className={classes.avatarImage}
                />
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Typography style={{fontWeight: 'bold'}}>
                CreativeIt give 20% waver based on result notice
              </Typography>
              <Typography className={classes.creativaItText}>
                CreativeIt Institute
              </Typography>

              <Box>
                <Button variant='outlined' style={{marginRight: '20px'}}>
                  2021-03-12
                </Button>
                <Button variant='contained'>Download</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default NoticeCard;
