import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {AccessTime, ArrowRightAlt, Info} from '@material-ui/icons';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React from 'react';
import SectionTitle from './SectionTitle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
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
  const cardItem = (item: any) => {
    return (
      <Box mr={6}>
        <Card className={classes.courseItem}>
          <Box>
            <img className={classes.image} src={item.img} alt='crema-logo' />
          </Box>
          <Box p={2}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box fontWeight='fontWeightBold'>{item.title}</Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box fontWeight='fontWeightBold' className={classes.timeDetails}>
                <AccessTime /> {item.experience}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box fontWeight='fontWeightBold' className={classes.timeDetails}>
                <Info /> {item.location}
              </Box>
            </Typography>
          </Box>
        </Card>
      </Box>
    );
  };
  return (
    <Container maxWidth='md' disableGutters className={classes.root}>
      <SectionTitle title='স্কিল ম্যাচিং জব' center={true}></SectionTitle>
      <Box mb={2}>
        <CustomCarousel>
          {items.map((item: any) => cardItem(item))}
        </CustomCarousel>
      </Box>
      <Grid container justifyContent='center'>
        <Button variant='outlined' color='primary' endIcon={<ArrowRightAlt />}>
          আরো দেখুন
        </Button>
      </Grid>
    </Container>
  );
};

export default SkillMatchingJobs;
