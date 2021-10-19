import {Box, Button, Card, Container, Grid, Typography} from '@mui/material';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {AccessTime, ArrowRightAlt, Info} from '@mui/icons-material';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
    },
    title: {
      color: '#682988',
      display: 'flex',
      alignItems: 'center',
    },
    vBar: {
      height: '40px',
      width: '5px',
      background: 'linear-gradient(45deg, #ec5c17,#5affab)',
      marginRight: '10px',
    },
    courseItem: {
      position: 'relative',
      boxShadow: '2px 8px 7px #ddd',
      border: '1px solid #ddd',
    },
    image: {
      width: '100%',
      height: '125px',
    },
    timeDetails: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

let items = [
  {
    img: '/images/skill-matching-job1.jpg',
    title: 'ডাটা ইঞ্জিনিয়ারিং',
    experience: '২-৩ বছর অভিজ্ঞতা',
    location: 'তেজগাওঁ ঢাকা',
  },
  {
    img: '/images/skill-matching-job2.jpg',
    title: 'গ্রাফিক্স ডিজাইন',
    experience: '২-৩ বছর অভিজ্ঞতা',
    location: 'তেজগাওঁ ঢাকা',
  },
  {
    img: '/images/skill-matching-job1.jpg',
    title: 'ডাটা ইঞ্জিনিয়ারিং',
    experience: '২-৩ বছর অভিজ্ঞতা',
    location: 'তেজগাওঁ ঢাকা',
  },
  {
    img: '/images/skill-matching-job2.jpg',
    title: 'গ্রাফিক্স ডিজাইন',
    experience: '২-৩ বছর অভিজ্ঞতা',
    location: 'তেজগাওঁ ঢাকা',
  },
];

const SkillMatchingJobs = () => {
  const classes = useStyles();
  const cardItem = (item: any, key: number) => {
    return (
      <Box mr={6} key={key}>
        <Card className={classes.courseItem}>
          <Box>
            <img className={classes.image} src={item.img} alt='crema-logo' />
          </Box>
          <Box p={2}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                {item.title}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box
                component={'span'}
                fontWeight='fontWeightBold'
                className={classes.timeDetails}>
                <AccessTime /> {item.experience}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box
                component={'span'}
                fontWeight='fontWeightBold'
                className={classes.timeDetails}>
                <Info /> {item.location}
              </Box>
            </Typography>
          </Box>
        </Card>
      </Box>
    );
  };
  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='md' disableGutters>
        <Typography variant='h5'>
          <Box
            style={{marginBottom: '50px', marginTop: '10px'}}
            className={classes.title}
            justifyContent={'center'}>
            <Box className={classes.vBar}></Box>
            <Box fontWeight='fontWeightBold'>স্কিল ম্যাচিং জব</Box>
          </Box>
        </Typography>
        <Box mb={2}>
          <CustomCarousel>
            {items.map((item: any, key: number) => cardItem(item, key))}
          </CustomCarousel>
        </Box>
        <Grid item container justifyContent='center'>
          <Button
            variant='outlined'
            color='primary'
            endIcon={<ArrowRightAlt />}>
            আরো দেখুন
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
};

export default SkillMatchingJobs;
