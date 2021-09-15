import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box, Button, Container, Grid, Typography} from '@material-ui/core';
import {Fade} from 'react-awesome-reveal';
import ReactPlayer from 'react-player/youtube';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      marginTop: '170px',
      padding: '50px',
      background: '#682988',
      color: '#fff',
    },
    detailsButton: {
      background: '#fff',
      color: '#682988',
    },
    youtubePlayer: {
      position: 'absolute',
      width: '5rem',
      height: '10rem',
      borderRadius: '15px',
      bottom: '15px',
      zIndex: 999,
    },
    responsiveIframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%',
      border: 'none',
    },
  }),
);

const Nise3WorkProcess = () => {
  const classes = useStyles();

  return (
    <Typography
      component='div'
      variant='body1'
      style={{
        height: '20rem',
        width: '100%',
        position: 'relative',
      }}>
      <Box
        bgcolor='grey.700'
        color='white'
        p={2}
        position='absolute'
        top={40}
        left={0}
        zIndex='modal'>
        <Fade direction='down'>
          <Typography variant='h4' gutterBottom={true}>
            <Box fontWeight='fontWeightBold' mb={6}>
              নাইস-থ্রি কিভাবে কাজ করে ?
            </Box>
          </Typography>
        </Fade>

        <Fade direction='up'>
          <Typography variant='subtitle1' gutterBottom={true}>
            <Grid item xs={8}>
              <Box mb={8}>
                যুবকদের স্কিলিং এবং চাকরির সুযোগ করার জন্য আমাদের সম্মিলিত
                প্রয়াসে নাইস-থ্রি পোর্টাল যথেষ্ট গুরুত্ব দেয়।
              </Box>
            </Grid>
          </Typography>
        </Fade>
      </Box>
      <Box
        bgcolor='background.paper'
        color='text.primary'
        p={2}
        position='absolute'
        top={0}
        left='70%'
        zIndex='tooltip'>
        <iframe
          className={classes.responsiveIframe}
          src='https://www.youtube.com/watch?v=ysz5S6PUM-U'></iframe>
        {/*<ReactPlayer*/}
        {/*  className={classes.responsiveIframe}*/}
        {/*  url='https://www.youtube.com/watch?v=ysz5S6PUM-U'*/}
        {/*/>*/}
      </Box>
    </Typography>
  );
};

export default Nise3WorkProcess;
