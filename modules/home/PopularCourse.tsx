import {Box, Button, Container, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {ArrowRightAlt} from '@mui/icons-material';
import React, {useState} from 'react';
import {useFetchCourseList} from '../../services/youthManagement/hooks';
import {useIntl} from 'react-intl';
import CourseCardComponent from '../../@softbd/elements/CourseCardComponent';
import {H2, Link} from '../../@softbd/elements/common';
import VerticalBar from './components/VerticalBar';
import PageSizes from '../../@softbd/utilities/PageSizes';

const PREFIX = 'PopularCourse';

const classes = {
  title: `${PREFIX}-title`,
  seeMore: `${PREFIX}-seeMore`,
};

const StyledGrid = styled(Grid)(() => ({
  marginTop: '50px',
  backgroundColor: '#fff',

  [`& .${classes.title}`]: {
    color: '#682988',
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.seeMore}`]: {
    marginTop: '15px',
    marginBottom: '15px',
  },

  '& .react-multi-carousel-list': {
    padding: '16px 0px',
  },
}));

const PopularCourse = () => {
  const {messages} = useIntl();

  const [courseFilters] = useState<any>({page_size: PageSizes.TEN});
  const pathValue = 'popular';
  const {data: courseList} = useFetchCourseList(pathValue, courseFilters);

  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg'>
        <Box
          style={{marginBottom: '50px', marginTop: '50px'}}
          className={classes.title}
          justifyContent={'center'}>
          <VerticalBar />
          <H2 style={{fontSize: '2rem', fontWeight: 'bold'}}>
            {messages['common.popular_courses']}
          </H2>
        </Box>
        <Box mb={2}>
          {courseList && courseList.length > 0 ? (
            <CustomCarousel>
              {courseList.map((course: any, key: number) => (
                <Link passHref key={key} href={`/course-details/${course.id}`}>
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
            <Link
              href={'/course-list/popular'}
              passHref
              className={classes.seeMore}>
              <Button
                variant='outlined'
                color='primary'
                endIcon={<ArrowRightAlt />}
                style={{
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
