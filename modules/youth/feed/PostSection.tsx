import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Grid} from '@mui/material';
import CourseInfoBlock from './components/CourseInfoBlock';
import {useIntl} from 'react-intl';
import PostLoadingSkeleton from '../common/PostLoadingSkeleton';
import {H1} from '../../../@softbd/elements/common';
import {useCustomStyle} from '../../../@softbd/hooks/useCustomStyle';
import {useFetchYouthFeedDataList} from '../../../services/youthManagement/hooks';
import {FeedItemTypes} from '../../../@softbd/utilities/FeedItemTypes';
import JobCardComponent from '../../../@softbd/elements/JobCardComponent';
import NoDataFoundComponent from '../common/NoDataFoundComponent';

const PREFIX = 'PostSection';

const classes = {
  recentFeedSectionTitle: `${PREFIX}-recentFeedSectionTitle`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  [`& .${classes.recentFeedSectionTitle}`]: {
    fontWeight: 'bold',
  },
}));

interface PostSectionProps {
  filters?: any;
  pageIndex: number;
  setLoadingMainPostData: any;
  isSearching: boolean;
}

const PostSection = ({
  filters,
  pageIndex,
  setLoadingMainPostData,
  isSearching,
}: PostSectionProps) => {
  const {messages} = useIntl();
  const result = useCustomStyle();
  const [feedDataFilters] = useState({});
  const [posts, setPosts] = useState<Array<any>>([]);

  const {data: feedData, isLoading} =
    useFetchYouthFeedDataList(feedDataFilters);

  useEffect(() => {
    setLoadingMainPostData(isLoading || (feedData && feedData.length == 0));
  }, [isLoading]);

  useEffect(() => {
    if (feedData && feedData.length > 0) {
      let dataLists: any = feedData;
      if (filters?.search_text) {
        dataLists = getFilteredList();
      }

      let total = pageIndex * filters.page_size;
      let start = 0;
      let end = dataLists.length;

      let total_page = Math.ceil(end / filters.page_size);

      if (total > dataLists.length) {
        start = (pageIndex - 1) * filters.page_size;
        setLoadingMainPostData(true);
      } else {
        start = (pageIndex - 1) * filters.page_size;
        end = pageIndex * filters.page_size;
        setLoadingMainPostData(false);
      }

      if (pageIndex == 1) {
        setPosts(dataLists.slice(start, end));
      } else if (pageIndex <= total_page) {
        setPosts((prevPosts: any) => {
          return [...prevPosts, ...dataLists.slice(start, end)];
        });
      }
    }
  }, [feedData, filters]);

  const getFilteredList = () => {
    const searchText = filters.search_text;
    return feedData.filter((item: any) => {
      if (
        item?.job_title?.includes(searchText) ||
        item?.job_title_en?.includes(searchText) ||
        item?.industry_association_title?.includes(searchText) ||
        item?.industry_association_title_en?.includes(searchText) ||
        item?.organization_title?.includes(searchText) ||
        item?.organization_title_en?.includes(searchText) ||
        item?.title?.includes(searchText) ||
        item?.title_en?.includes(searchText) ||
        item?.institute_title?.includes(searchText) ||
        item?.institute_title_en?.includes(searchText)
      ) {
        return true;
      } else {
        return false;
      }
    });
  };

  const getPostItem = (post: any) => {
    switch (Number(post.feed_item_type)) {
      case FeedItemTypes.COURSE:
        return <CourseInfoBlock course={post} />;
      case FeedItemTypes.JOB:
        return <JobCardComponent job={post} size={'small'} />;
      default:
        return <></>;
    }
  };

  return (
    <StyledGrid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <H1 sx={{...result.body1}} className={classes.recentFeedSectionTitle}>
          {messages['youth_feed.recent_post']}
        </H1>
      </Grid>

      {isLoading ? (
        <Grid item xs={12}>
          <PostLoadingSkeleton />
        </Grid>
      ) : posts && posts.length > 0 ? (
        posts.map((post: any, index) => {
          return (
            <Grid item xs={12} key={index}>
              {getPostItem(post)}
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12}>
          <Box sx={{textAlign: 'center', fontSize: 20}}>
            <NoDataFoundComponent
              messageType={messages['youth_feed.recent_post']}
              messageTextType={'h6'}
            />
          </Box>
        </Grid>
      )}
    </StyledGrid>
  );
};

export default PostSection;
