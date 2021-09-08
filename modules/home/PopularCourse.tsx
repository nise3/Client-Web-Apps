import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {AccessTime, Info} from '@material-ui/icons';
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
      height: '200px',
    },
    timeDetails: {
      display: 'flex',
      alignItems: 'center',
    },
    priceDetails: {
      position: 'absolute',
      background: '#6f459b',
      color: '#fff',
      padding: '5px',
      minWidth: '70px',
      textAlign: 'center',
      borderRadius: '2px',
    },
  }),
);

let items = [
  {
    img: '/images/popular-course1.png',
    price: '৫০০০',
    title: 'লিডারশিপ স্কিল',
    duration: '১ ঘন্টা ৩০ মিনিট',
    enrolls: 'Student (16.1k)',
  },

  {
    img: '/images/popular-course2.png',
    price: '৩০০০',
    title: 'প্রফেশনাল মাস্টার ক্লাস',
    duration: '১ ঘন্টা',
    enrolls: 'Student (16.1k)',
  },
  {
    img: '/images/popular-course3.png',
    price: 'বিনামূল্যে',
    title: 'কম্পিঊটার স্কিল',
    duration: '১ ঘন্টা',
    enrolls: 'Student (16.1k)',
  },
  {
    img: '/images/popular-course4.png',
    price: '২০০০',
    title: 'সেলস ট্রেনিং',
    duration: '১ ঘন্টা',
    enrolls: 'Student (16.1k)',
  },
];

const PopularCourse = () => {
  const classes = useStyles();
  const cardItem = (item: any) => {
    return (
      <Box mr={6}>
        <Card className={classes.courseItem}>
          <Typography>
            <Box fontWeight='fontWeightBold' className={classes.priceDetails}>
              {item.price}
            </Box>
          </Typography>
          <Box>
            <img className={classes.image} src={item.img} alt='crema-logo' />
          </Box>
          <Box p={2}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box fontWeight='fontWeightBold'>{item.title}</Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box fontWeight='fontWeightBold' className={classes.timeDetails}>
                <AccessTime /> {item.duration}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box fontWeight='fontWeightBold' className={classes.timeDetails}>
                <Info /> {item.enrolls}
              </Box>
            </Typography>
          </Box>
        </Card>
      </Box>
    );
  };
  return (
    <Container maxWidth='md' disableGutters className={classes.root}>
      <SectionTitle title='জনপ্রিয় কোর্স' center={true}></SectionTitle>
      <Box mb={2}>
        <CustomCarousel>
          {items.map((item: any) => cardItem(item))}
        </CustomCarousel>
      </Box>
      <Grid container justifyContent='center' spacing={2}>
        <Button variant='outlined' color='primary'>
          আরো দেখুন
        </Button>
      </Grid>
    </Container>
  );
};

export default PopularCourse;
