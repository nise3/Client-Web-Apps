import React from 'react';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Card, Container, Grid} from '@mui/material';
import {Fade} from 'react-awesome-reveal';
import {Assignment, HomeWork, People, PeopleAlt} from '@mui/icons-material';
import UnderlinedHeading from './UnderlinedHeading';
import {H4, H5} from '../../@softbd/elements/common';

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
      padding: theme.spacing(3),
      height: 250,
      borderRadius: 4 * parseInt(theme.shape.borderRadius.toString()),
      // color: '#000',
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(1.25),
      },
    },
    icon: {
      fontSize: '72px',
      color: theme.palette.primary.main,
    },
    desc: {
      color: theme.palette.secondary.main,
    },

    rootMobileView: {
      [theme.breakpoints.down('xl')]: {
        marginTop: '80px',
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
          <H5 gutterBottom={true} className={classes.subheading}>
            কোর্স ম্যানেজমেন্ট সিস্টেমের পরিসংখ্যান
          </H5>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.boxItem}>
                <Assignment className={classes.icon} />
                <H4 gutterBottom={true} fontWeight='fontWeightBold'>
                  ১০ টি
                </H4>
                <H5 gutterBottom={true} className={classes.desc}>
                  বিষয়ে প্রশিক্ষণ প্রদান
                </H5>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.boxItem}>
                <PeopleAlt className={classes.icon} />
                <H4 gutterBottom={true} fontWeight='fontWeightBold'>
                  ১০ জন
                </H4>
                <H5 gutterBottom={true} className={classes.desc}>
                  যুবক প্রশিক্ষণ গ্রহন করেছেন
                </H5>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.boxItem}>
                <HomeWork className={classes.icon} />
                <H4 gutterBottom={true} fontWeight='fontWeightBold'>
                  ১০ টি
                </H4>
                <H5 gutterBottom={true} className={classes.desc}>
                  প্রশিক্ষণ কেন্দ্র
                </H5>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.boxItem}>
                <People className={classes.icon} />
                <H4 gutterBottom={true} fontWeight='fontWeightBold'>
                  ১০ জন
                </H4>
                <H5 gutterBottom={true} className={classes.desc}>
                  দক্ষ প্রশিক্ষক
                </H5>
              </Card>
            </Grid>
          </Grid>
        </Fade>
      </Container>
    </Grid>
  );
};
export default InfoCardSection;
