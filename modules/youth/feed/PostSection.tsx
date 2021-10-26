import React, {useEffect, useState} from 'react';
import {Box, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import CourseInfoBlock from './components/CourseInfoBlock';
import {useIntl} from 'react-intl';
import {useFetchAllCourseList} from '../../../services/youthManagement/hooks';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import PostLoadingSkeleton from '../common/PostLoadingSkeleton';

const useStyle = makeStyles((theme: CremaTheme) => ({
  featuredCourseSectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
}));

interface PostSectionProps {
  filters?: any;
  pageIndex: number;
  setLoadingMainPostData: any;
}

const PostSection = ({
  filters,
  pageIndex,
  setLoadingMainPostData,
}: PostSectionProps) => {
  const classes = useStyle();
  const {messages} = useIntl();
  const [courseFilters, setCourseFilters] = useState({});
  const {
    data: courseList,
    isLoading: isLoadingCourses,
    metaData,
  } = useFetchAllCourseList(courseFilters);

  const [posts, setPosts] = useState<Array<any>>([]);

  useEffect(() => {
    console.log('metadata: ', metaData);
    if (pageIndex >= metaData?.total_page) {
      setLoadingMainPostData(true);
    } else {
      setCourseFilters(objectFilter({...courseFilters, ...filters}));
      if (courseList && courseList.length) {
        let tmpArr = posts;
        tmpArr.push(...courseList);
        setPosts(objectFilter(tmpArr));
      }
    }
  }, [filters]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12} md={12}>
        <Box className={classes.featuredCourseSectionTitle}>
          {messages['youth_feed.recent_post']}
        </Box>
      </Grid>

      {isLoadingCourses ? (
        <PostLoadingSkeleton />
      ) : (
        posts &&
        posts.length &&
        posts.map((course: any) => {
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
