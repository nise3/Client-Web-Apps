import React from 'react';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Button, Container, Grid, Typography} from '@mui/material';
import {Fade} from 'react-awesome-reveal';
import {H4, Link} from '../../@softbd/elements/common';
import {ArrowRight} from '@mui/icons-material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '50px',
      background: '#682988',
      color: '#fff',
      [theme.breakpoints.up('sm')]: {
        marginTop: '200px',
      },
      [theme.breakpoints.down('xl')]: {
        marginTop: '30px',
      },
    },
    assessmentImage: {
      height: '340px',
    },
    youtubePlayerMobileView: {
      height: '300px',
      borderRadius: '15px',
      bottom: '80px',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    youtubePlayer: {
      position: 'absolute',
      height: '300px',
      borderRadius: '15px',
      bottom: '120px',
      width: '20rem',
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  }),
);

const Nise3WorkProcess = () => {
  const classes = useStyles();
  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='lg' style={{position: 'relative'}}>
        <Grid container justifyContent='space-between'>
          <Grid item xs={12} md={6} py={{xs: 3, md: 5}}>
            <Fade direction='down'>
              <H4>নাইস-থ্রি কিভাবে কাজ করে?</H4>
              <Typography variant='subtitle1' my={{xs: 4}}>
                যুবকদের স্কিলিং এবং চাকরির সুযোগ করার জন্য আমাদের সম্মিলিত
                প্রয়াসে নাইস-থ্রি পোর্টাল যথেষ্ট গুরুত্ব দেয়।
              </Typography>
              <Link href={'/sc/how-nise3-works'}>
                <Button variant='contained' color={'info'}>
                  বিস্তারিত পড়ুন <ArrowRight />
                </Button>
              </Link>
            </Fade>
          </Grid>

          <Grid item xs={12} md={4}>
            <iframe
              className={classes.youtubePlayerMobileView}
              src='https://www.youtube.com/embed/PWkOvVkI09k'></iframe>

            <iframe
              className={classes.youtubePlayer}
              src='https://www.youtube.com/embed/PWkOvVkI09k'></iframe>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Nise3WorkProcess;
