import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box, Button, Container, Grid, Typography} from '@material-ui/core';

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
    assessmentImage: {
      height: '340px',
    },
    youtubePlayer: {
      height: '300px',
      borderRadius: '15px',
      bottom: '80px',
      position: 'absolute',
    },
  }),
);

const Nise3WorkProcess = () => {
  const classes = useStyles();
  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='md' disableGutters>
        <Grid
          container
          spacing={4}
          justifyContent='flex-start'
          alignItems='center'>
          <Grid item xs={8}>
            <Typography variant='h4' gutterBottom={true}>
              <Box fontWeight='fontWeightBold' mb={6}>
                নাইস-থ্রি কিভাবে কাজ করে ?
              </Box>
            </Typography>
            <Typography variant='subtitle1' gutterBottom={true}>
              <Grid item xs={8}>
                <Box mb={8}>
                  যুবকদের স্কিলিং এবং চাকরির সুযোগ করার জন্য আমাদের সম্মিলিত
                  প্রয়াসে নাইস-থ্রি পোর্টাল যথেষ্ট গুরুত্ব দেয়।
                </Box>
              </Grid>
            </Typography>
            <Button variant='contained' className={classes.detailsButton}>
              বিস্তারিত পড়ুন
            </Button>
          </Grid>
          <Grid item xs={4}>
            <iframe
              className={classes.youtubePlayer}
              src='https://www.youtube.com/embed/tgbNymZ7vqY'></iframe>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Nise3WorkProcess;
