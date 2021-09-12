import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Box, Button, Container, Grid, Typography} from '@material-ui/core';
import {Fade} from 'react-awesome-reveal';

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
            <Fade direction='down'>
              <Button variant='contained' className={classes.detailsButton}>
                বিস্তারিত পড়ুন
              </Button>
            </Fade>
          </Grid>
          <Grid item xs={4}>
            {/*<Slide direction='right'>*/}
            <iframe
              className={classes.youtubePlayer}
              src='https://www.youtube.com/embed/tgbNymZ7vqY'></iframe>
            {/*</Slide>*/}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Nise3WorkProcess;
