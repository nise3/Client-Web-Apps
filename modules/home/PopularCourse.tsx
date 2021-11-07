import {Box, Button, Container, Grid, Typography} from '@mui/material';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {ArrowRightAlt} from '@mui/icons-material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import React, {useState} from 'react';
import {useFetchCourseList} from '../../services/youthManagement/hooks';
import {getModulePath} from '../../@softbd/utilities/helpers';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import CourseCardComponent from '../../@softbd/elements/CourseCardComponent';
import Link from 'next/link';
import {H3} from '../../@softbd/elements/common';

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
      height: '33px',
      width: '2px',
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

  return (
    <Grid container xl={12} className={classes.root}>
      <Container maxWidth='lg'>
        <H3 style={{fontSize: '33px', fontWeight: 'bold'}}>
          <Box
            style={{marginBottom: '50px', marginTop: '50px'}}
            className={classes.title}
            justifyContent={'center'}>
            <Box className={classes.vBar} />
            <Box fontWeight='fontWeightBold'>
              {messages['common.popular_courses']}
            </Box>
          </Box>
        </H3>
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
                  <Box mr={1} ml={1}>
                    <CourseCardComponent course={course} />
                  </Box>
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
        {courseList && courseList?.length > 1 && (
          <Grid item container justifyContent='center' spacing={2}>
            <Link href={'/course-list/popular'} passHref>
              <Button
                variant='outlined'
                color='primary'
                endIcon={<ArrowRightAlt />}
                style={{marginTop: '15px', marginBottom: '15px'}}>
                {messages['common.see_more']}
              </Button>
            </Link>
          </Grid>
        )}
      </Container>
    </Grid>
  );
};

export default PopularCourse;
