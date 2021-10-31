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

const filterDuplicateObject = (arr: Array<any>) => {
  return arr.filter(
    (v, i: number, a) => a.findIndex((t) => t.id === v.id) === i,
  );
};

const PostSection = ({
  filters,
  pageIndex,
  setLoadingMainPostData,
}: PostSectionProps) => {
  const classes = useStyle();
  const {messages} = useIntl();
  const [courseFilters, setCourseFilters] = useState({});

  const [posts, setPosts] = useState<Array<any>>([]);

  useEffect(() => {
    if (pageIndex >= metaData?.total_page) {
      setLoadingMainPostData(true);
    } else {
      setCourseFilters(objectFilter({...courseFilters, ...filters}));
      setLoadingMainPostData(false);
    }
  }, [filters]);

  const {
    data: courseList,
    isLoading: isLoadingCourses,
    metaData,
  } = useFetchAllCourseList(courseFilters);

  useEffect(() => {
    if (courseList && courseList.length) {
      if (metaData.current_page <= 1) {
        setPosts([...courseList]);
      } else {
        setPosts((prevState) =>
          filterDuplicateObject([...prevState, ...courseList]),
        );
      }
    }
  }, [courseList]);

  return (
    <Grid container spacing={{xs: 2, md: 3}}>
      <Grid item xs={12} sm={12} md={12}>
        <Box className={classes.featuredCourseSectionTitle}>
          {messages['youth_feed.recent_post']}
        </Box>
      </Grid>

      {posts &&
        posts.length &&
        posts.map((course: any) => {
          return (
            <Grid item xs={12} key={course.id}>
              {<CourseInfoBlock course={course} />}
            </Grid>
          );
        })}

      {isLoadingCourses && (
        <Grid item xs={12}>
          <PostLoadingSkeleton />
        </Grid>
      )}
    </Grid>
  );
};

export default PostSection;
