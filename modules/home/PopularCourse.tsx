import {Box, Button, Container, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {ArrowRightAlt} from '@mui/icons-material';
import React, {useState} from 'react';
import {useFetchCourseList} from '../../services/youthManagement/hooks';
import {getModulePath} from '../../@softbd/utilities/helpers';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import CourseCardComponent from '../../@softbd/elements/CourseCardComponent';
import {H3, Link} from '../../@softbd/elements/common';
import VerticalBar from './components/VerticalBar';

const PREFIX = 'PopularCourse';

const classes = {
  title: `${PREFIX}-title`,
};

const StyledGrid = styled(Grid)(() => ({
  marginTop: '50px',
  backgroundColor: '#fff',

  [`& .${classes.title}`]: {
    color: '#682988',
    display: 'flex',
    alignItems: 'center',
  },

  '& .react-multi-carousel-list': {
    padding: '16px 0px',
  },
}));

const PopularCourse = () => {
  const {messages} = useIntl();

  const router = useRouter();

  const [courseFilters] = useState<any>({page_size: 10});
  const pathValue = 'popular';
  const {data: courseList} = useFetchCourseList(pathValue, courseFilters);

  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg'>
        <H3 style={{fontSize: '33px', fontWeight: 'bold'}}>
          <Box
            style={{marginBottom: '50px', marginTop: '50px'}}
            className={classes.title}
            justifyContent={'center'}>
            <VerticalBar />
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
                  passHref
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
        {courseList && courseList?.length > 0 && (
          <Grid item container justifyContent='center' spacing={2}>
            <Link href={'/course-list/popular'} passHref>
              <Button
                variant='outlined'
                color='primary'
                endIcon={<ArrowRightAlt />}
                style={{
                  marginTop: '15px',
                  marginBottom: '15px',
                  borderRadius: '10px',
                }}>
                {messages['common.see_more']}
              </Button>
            </Link>
          </Grid>
        )}
      </Container>
    </StyledGrid>
  );
};

export default PopularCourse;
