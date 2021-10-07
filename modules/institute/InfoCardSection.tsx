import React from 'react';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Box, Card, Container, Grid, Typography} from '@mui/material';
import {Fade} from 'react-awesome-reveal';
import {Assignment, HomeWork, People, PeopleAlt} from '@mui/icons-material';
import UnderlinedHeading from './UnderlinedHeading';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        marginTop: '50px',
      },
      [theme.breakpoints.down('xl')]: {
        // marginTop: '200px',
      },
    },
    subheading: {
      textAlign: 'center',
      marginBottom: 48,
    },
    boxItem: {
      boxShadow: theme.shadows[4],
      background: theme.palette.background.paper,
      textAlign: 'center',
      padding: theme.spacing(5),
      height: 230,
      borderRadius: 4 * parseInt(theme.shape.borderRadius.toString()),
      // color: '#000',
    },
    icon: {
      fontSize: '72px',
      color: theme.palette.primary.main,
    },
    desc: {
      color: theme.palette.primary.dark,
    },

    rootMobileView: {
      [theme.breakpoints.down('xl')]: {
        marginTop: '235px',
      },
    },
  }),
);

const InfoCardSection = () => {
  const classes = useStyles();

  return (
    <Grid container xl={12} className={classes.root}>
      <Container
        maxWidth='lg'
        className={classes.rootMobileView}
        disableGutters>
        <Fade direction='up'>
          <UnderlinedHeading>একনজরে</UnderlinedHeading>
          <Typography
            variant='h5'
            gutterBottom={true}
            className={classes.subheading}>
            কোর্স ম্যানেজমেন্ট সিস্টেমের পরিসংখ্যান
          </Typography>
          <Grid container spacing={20}>
            <Grid item xs={12} md={3}>
              <Card className={classes.boxItem}>
                <Assignment className={classes.icon} />
                <Typography variant='h4' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'>১০ টি</Box>
                </Typography>
                <Typography
                  variant='h5'
                  gutterBottom={true}
                  className={classes.desc}>
                  বিষয়ে প্রশিক্ষণ প্রদান
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.boxItem}>
                <PeopleAlt className={classes.icon} />
                <Typography variant='h4' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'>১০ জন</Box>
                </Typography>
                <Typography
                  variant='h5'
                  gutterBottom={true}
                  className={classes.desc}>
                  যুবক প্রশিক্ষণ গ্রহন করেছেন
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.boxItem}>
                <HomeWork className={classes.icon} />
                <Typography variant='h4' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'>১০ টি</Box>
                </Typography>
                <Typography
                  variant='h5'
                  gutterBottom={true}
                  className={classes.desc}>
                  প্রশিক্ষণ কেন্দ্র
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.boxItem}>
                <People className={classes.icon} />
                <Typography variant='h4' gutterBottom={true}>
                  <Box fontWeight='fontWeightBold'>১০ জন</Box>
                </Typography>
                <Typography
                  variant='h5'
                  gutterBottom={true}
                  className={classes.desc}>
                  দক্ষ প্রশিক্ষক
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Fade>
      </Container>
    </Grid>
  );
};
export default InfoCardSection;
