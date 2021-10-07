import React from 'react';
import {Box, Container, Grid, Paper, Typography} from '@mui/material';
import useStyles from './index.style';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import clsx from 'clsx';
const YouthSignupPage = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={'sm'} className={classes.rootContainer}>
      <Paper style={{padding: '20px'}} className={classes.paperBox}>
        <Typography
          variant={'h6'}
          style={{fontWeight: 'bold', marginBottom: '40px'}}
          textAlign={'center'}>
          Sign-up as
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={4}>
            <Box className={clsx(classes.iconBoxYouth, classes.icon)}>
              <PeopleIcon style={{color: '#ffffff'}} />
              <Typography className={classes.text}>Youth</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className={clsx(classes.iconBoxTc, classes.icon)}>
              <BusinessIcon style={{color: '#ffffff'}} />
              <Typography className={classes.text}>Training Center</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box className={clsx(classes.iconBoxIndustry, classes.icon)}>
              <BusinessIcon style={{color: '#ffffff'}} />
              <Typography className={classes.text}>Industry</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default YouthSignupPage;
