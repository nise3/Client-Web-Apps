import {Box, Button, Container, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import {ArrowRightAlt} from '@mui/icons-material';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import CourseCardComponent from '../../@softbd/elements/CourseCardComponent';
import {Link} from '../../@softbd/elements/common';
import PageSizes from '../../@softbd/utilities/PageSizes';
import {useFetchCourseList} from '../../services/instituteManagement/hooks';
import SectionTitle from './SectionTitle';
import {
  LINK_FRONTEND_COURSE_DETAILS,
  LINK_FRONTEND_COURSE_LIST,
} from '../../@softbd/common/appLinks';
import BoxCardsSkeleton from "../institute/Components/BoxCardsSkeleton";

const PREFIX = 'PopularCourse';

const classes = {
  title: `${PREFIX}-title`,
  seeMore: `${PREFIX}-seeMore`,
};

const StyledGrid = styled(Grid)(() => ({
  marginTop: '60px',
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
  const {data: courseList, isLoading:isLoadingCourses} = useFetchCourseList(pathValue, courseFilters);

  return (
    <StyledGrid container xl={12}>
      <Container maxWidth='lg'>
        <SectionTitle
          title={messages['common.popular_courses'] as string}
          center={true}
        />
        <Box mb={2} sx={{marginTop: '-16px'}}>{isLoadingCourses ? (
            <BoxCardsSkeleton />
          ):
          courseList && courseList.length > 0 ? (
            <CustomCarousel>
              {courseList.map((course: any, key: number) => (
                <Link
                  passHref
                  key={key}
                  href={`${LINK_FRONTEND_COURSE_DETAILS}${course.id}`}>
                  <Box mr={1} ml={1} height={'100%'}>
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
              href={`${LINK_FRONTEND_COURSE_LIST}/${pathValue}`}
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
