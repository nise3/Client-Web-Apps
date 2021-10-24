import {Box, Button, Card, Container, Grid, Typography} from '@mui/material';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {AccessTime, ArrowRightAlt, Info} from '@mui/icons-material';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
      backgroundColor: '#fff',
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
  const cardItem = (item: any, key: number) => {
    return (
      <Box mr={1} key={key}>
        <Card className={classes.courseItem}>
          <Typography>
            <Box
              component={'span'}
              fontWeight='fontWeightBold'
              className={classes.priceDetails}>
              {item.price}
            </Box>
          </Typography>
          <Box>
            <Image
              className={classes.image}
              src={item.img}
              alt='crema-logo'
              height={50}
              width={'100%'}
              layout={'responsive'}
            />
            {/*<img className={classes.image} src={item.img} alt='crema-logo' />*/}
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
                <AccessTime /> {item.duration}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box
                component={'span'}
                fontWeight='fontWeightBold'
                className={classes.timeDetails}>
                <Info /> {item.enrolls}
              </Box>
            </Typography>
          </Box>
        </Card>
      </Box>
    );
  };
  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='lg'>
        <Typography variant='h5'>
          <Box
            style={{marginBottom: '50px', marginTop: '50px'}}
            className={classes.title}
            justifyContent={'center'}>
            <Box className={classes.vBar} />
            <Box fontWeight='fontWeightBold'>জনপ্রিয় কোর্স</Box>
          </Box>
        </Typography>
        <Box mb={2}>
          <CustomCarousel>
            {items.map((item: any, key: number) => cardItem(item, key))}
          </CustomCarousel>
        </Box>
        <Grid item container justifyContent='center' spacing={2}>
          <Button
            variant='outlined'
            color='primary'
            endIcon={<ArrowRightAlt />}
            style={{marginTop: '15px', marginBottom: '15px'}}>
            আরো দেখুন
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
};

export default PopularCourse;
