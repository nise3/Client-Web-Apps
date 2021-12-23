import React, {useContext, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Grid, useTheme} from '@mui/material';
import CourseInfoBlock from './components/CourseInfoBlock';
import {useIntl} from 'react-intl';
import {useFetchCourseList} from '../../../services/youthManagement/hooks';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import PostLoadingSkeleton from '../common/PostLoadingSkeleton';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import AppContextPropsType from '../../../redux/types/AppContextPropsType';
import AppContext from '../../../@crema/utility/AppContext';
import AppLocale from '../../../shared/localization';
import typography from '../../../@softbd/layouts/themes/default/typography';
import {H2} from '../../../@softbd/elements/common';

const PREFIX = 'PostSection';

const classes = {
  featuredCourseSectionTitle: `${PREFIX}-featuredCourseSectionTitle`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  [`& .${classes.featuredCourseSectionTitle}`]: {
    fontWeight: 'bold',
  },
}));

interface PostSectionProps {
  filters?: any;
  pageIndex: number;
  setLoadingMainPostData: any;
  isSearching: boolean;
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
  isSearching,
}: PostSectionProps) => {
  const {messages} = useIntl();
  const theme = useTheme();
  const {locale} = useContext<AppContextPropsType>(AppContext);
  const currentAppLocale = AppLocale[locale.locale];
  const result = typography(theme, currentAppLocale.locale);

  const [courseFilters, setCourseFilters] = useState({});
  const authUser = useAuthUser<YouthAuthUser>();

  const [posts, setPosts] = useState<Array<any>>([]);

  useEffect(() => {
    if (!isSearching && pageIndex >= metaData?.total_page) {
      setLoadingMainPostData(true);
    } else {
      const params = objectFilter({...courseFilters, ...filters});
      if (authUser && authUser?.isYouthUser) {
        params.youth_id = authUser?.youthId;
      }
      setCourseFilters(params);
      setLoadingMainPostData(false);
    }
  }, [filters, authUser]);

  const {
    data: courseList,
    isLoading: isLoadingCourses,
    metaData,
  } = useFetchCourseList('recent', courseFilters);

  useEffect(() => {
    if (courseList) {
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
    <StyledGrid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <H2
          sx={{...result.body1}}
          className={classes.featuredCourseSectionTitle}>
          {messages['youth_feed.recent_post']}
        </H2>
      </Grid>

      {posts && posts.length > 0 ? (
        posts.map((course: any) => {
          return (
            <Grid item xs={12} key={course.id}>
              {<CourseInfoBlock course={course} />}
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12}>
          <Box sx={{textAlign: 'center', fontSize: 20}}>
            {messages['common.no_data_found']}
          </Box>
        </Grid>
      )}

      {isLoadingCourses && (
        <Grid item xs={12}>
          <PostLoadingSkeleton />
        </Grid>
      )}
    </StyledGrid>
  );
};

export default PostSection;
