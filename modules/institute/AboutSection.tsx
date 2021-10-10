import React from 'react';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Container, Grid} from '@mui/material';
import {Fade} from 'react-awesome-reveal';
import {H3, H4, S1} from '../../@softbd/elements/common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      padding: '50px',
      background: theme.palette.grey[200],
      color: theme.palette.text.primary,
      [theme.breakpoints.up('md')]: {
        marginTop: '120px',
      },
      [theme.breakpoints.down('xl')]: {
        // marginTop: '120px',
      },
    },
    heading: {
      color: theme.palette.primary.main,
    },
    desc: {
      color: theme.palette.text.primary,
    },
    detailsButton: {
      background: '#fff',
      color: '#682988',
    },
    assessmentImage: {
      height: '340px',
    },
    youtubePlayerBox: {
      [theme.breakpoints.up('md')]: {
        transform: 'translate(0px, -100px)',
      },
    },
    youtubePlayerMobileView: {
      height: '360px',
      borderRadius: '15px',
      border: 'none',
      bottom: '80px',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    youtubePlayer: {
      // position: 'absolute',
      height: '420px',
      borderRadius: '15px',
      border: 'none',
      bottom: '120px',
      width: '100%',
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  }),
);

const AboutSection = () => {
  const classes = useStyles();
  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='lg' disableGutters>
        <Grid
          container
          spacing={4}
          justifyContent='space-around'
          alignItems='center'>
          <Grid item xs={12} md={7}>
            <Fade direction='down'>
              <H3
                gutterBottom={true}
                className={classes.heading}
                fontWeight='fontWeightBold'>
                Lorem Ipsum Dolor
              </H3>
              <S1 gutterBottom={true} className={classes.desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </S1>
              <H4
                gutterBottom={true}
                className={classes.heading}
                fontWeight='fontWeightBold'>
                Lorem Ipsum Dolor Sit Amet
              </H4>
              <S1 gutterBottom={true} className={classes.desc}>
                <ul>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
                  <li>et dolore magna aliqua. Ut enim ad minim veniam</li>
                  <li>aliquip ex ea commodo consequat. Duis aute irure</li>
                  <li>cillum dolore eu fugiat nulla pariatur. Excepteur</li>
                  <li>sunt in culpa qui officia deserunt mollit anim</li>
                </ul>
              </S1>
            </Fade>
          </Grid>
          <Grid item xs={12} md={5} className={classes.youtubePlayerBox}>
            <iframe
              className={classes.youtubePlayerMobileView}
              src='https://www.youtube.com/embed/PWkOvVkI09k'
            />
            <iframe
              className={classes.youtubePlayer}
              src='https://www.youtube.com/embed/PWkOvVkI09k'
            />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default AboutSection;
