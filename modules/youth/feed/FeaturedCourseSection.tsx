import React, {useState} from 'react';
import {Box, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import CourseInfoBlock from './components/CourseInfoBlock';
import {useIntl} from 'react-intl';
import {useFetchCourseList} from '../../../services/youthManagement/hooks';

const useStyle = makeStyles((theme: CremaTheme) => ({
  featuredCourseSectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
}));

const FeaturedCourseSection = () => {
  const classes = useStyle();
  const {messages} = useIntl();
  const [courseFilter] = useState({});
  const {data: courseList} = useFetchCourseList('', courseFilter);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12} md={12}>
        <Box className={classes.featuredCourseSectionTitle}>
          {messages['youth_feed.recent_post']}
        </Box>
      </Grid>

      {courseList &&
        courseList.map((course: any) => {
          return (
            <Grid item xs={12} key={course.id}>
              {<CourseInfoBlock key={course.id} course={course} />}
            </Grid>
          );
        })}
    </Grid>
  );
};

export default FeaturedCourseSection;
