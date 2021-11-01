import {Box, Button, Card, Container, Grid, Typography} from '@mui/material';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {AccessTime, ArrowRightAlt, Info} from '@mui/icons-material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React, {useState} from 'react';
import Image from 'next/image';
import {useFetchCourseList} from '../../services/youthManagement/hooks';
import {courseDuration, getModulePath} from '../../@softbd/utilities/helpers';
import {useIntl} from 'react-intl';
import {Link} from '../../@softbd/elements/common';
import {useRouter} from 'next/router';

const useStyles = makeStyles(() =>
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

const PopularCourse = () => {
  const classes = useStyles();
  const {messages} = useIntl();

  const router = useRouter();

  const [courseFilters] = useState<any>({page_size: 10});
  const pathValue = 'popular';
  const {data: courseList} = useFetchCourseList(pathValue, courseFilters);

  const cardItem = (course: any, key: number) => {
    return (
      <Box mr={1} key={key}>
        <Card className={classes.courseItem}>
          <Typography>
            <Box
              component={'span'}
              fontWeight='fontWeightBold'
              className={classes.priceDetails}>
              {course?.course_fee}
            </Box>
          </Typography>
          <Box>
            <Image
              className={classes.image}
              src={'/images/popular-course3.png'}
              alt='crema-logo'
              height={50}
              width={'100%'}
              layout={'responsive'}
            />
          </Box>
          <Box p={2}>
            <Typography variant='subtitle2' gutterBottom={true}>
              <Box component={'span'} fontWeight='fontWeightBold'>
                {course.title}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box
                component={'span'}
                fontWeight='fontWeightBold'
                className={classes.timeDetails}>
                <AccessTime /> {courseDuration(course?.duration)}
              </Box>
            </Typography>
            <Typography gutterBottom={true}>
              <Box
                component={'span'}
                fontWeight='fontWeightBold'
                className={classes.timeDetails}>
                <Info /> {course?.total_enroll}
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
            <Box fontWeight='fontWeightBold'>
              {messages['common.popular_courses']}
            </Box>
          </Box>
        </Typography>
        <Box mb={2}>
          {courseList && courseList.length > 0 ? (
            <CustomCarousel>
              {courseList.map((course: any, key: number) => (
                <Link
                  key={key}
                  href={
                    getModulePath(router.asPath) +
                    `/course-details/${course.id}`
                  }>
                  {cardItem(course, key)}
                </Link>
              ))}
            </CustomCarousel>
          ) : (
            <Grid container sx={{justifyContent: 'center'}}>
              <Typography variant={'h6'}>
                {messages['common.no_data_found']}
              </Typography>
            </Grid>
          )}
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
