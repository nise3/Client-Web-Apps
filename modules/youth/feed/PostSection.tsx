import React, {useEffect, useState} from 'react';
import {Box, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import CourseInfoBlock from './components/CourseInfoBlock';
import {useIntl} from 'react-intl';
import {
  useFetchAllCourseList,
  useFetchCourseList,
} from '../../../services/youthManagement/hooks';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import BoxContentSkeleton from '../profile/component/BoxContentSkeleton';
import ContentWithImageSkeleton from '../profile/component/ContentWithImageSkeleton';

const useStyle = makeStyles((theme: CremaTheme) => ({
  featuredCourseSectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
}));

interface PostSectionProps {
  filters?: any;
}
const PostSection = ({filters}: PostSectionProps) => {
  const classes = useStyle();
  const {messages} = useIntl();
  const [courseFilters, setCourseFilters] = useState({});
  const {data: courseList, isLoading: isLoadingCourses} =
    useFetchAllCourseList(courseFilters);

  useEffect(() => {
    setCourseFilters(objectFilter({...courseFilters, ...filters}));
  }, [filters]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12} md={12}>
        <Box className={classes.featuredCourseSectionTitle}>
          {messages['youth_feed.recent_post']}
        </Box>
      </Grid>

      {isLoadingCourses ? (
        <Grid item xs={12}>
          <ContentWithImageSkeleton />
        </Grid>
      ) : (
        courseList &&
        courseList.map((course: any) => {
          return (
            <Grid item xs={12} key={course.id}>
              {<CourseInfoBlock course={course} />}
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default PostSection;
