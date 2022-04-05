import {Box, Container, Grid, Skeleton, Stack} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';
import RecentActivityCardView from './RecentActivityCardView';
import RecentActivityMasonryGroupView from './RecentActivityMasonryGroupView';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {Pagination} from '@mui/lab';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import {H1, H2} from '../../../@softbd/elements/common';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import {useFetchPublicRecentActivities} from '../../../services/cmsManagement/hooks';

let defaultImage = '/images/recent_activity_blank.avif';

const PREFIX = 'RecentActivities';

const classes = {
  titleTypography: `${PREFIX}-titleTypography`,
  pagination: `${PREFIX}-pagination`,
  image: `${PREFIX}-image`,
  paginationBox: `${PREFIX}-paginationBox`,
};

const StyledContainer = styled(Container)(({theme}) => {
  return {
    [`& .${classes.titleTypography}`]: {
      color: theme.palette.primary.dark,
      fontSize: '1.640625rem',
      fontWeight: 'bold',
    },
    [`& .${classes.pagination}`]: {
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    [`& .${classes.image}`]: {
      overflow: 'hidden',
    },

    [`& .${classes.paginationBox}`]: {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'center',
    },
  };
});

const RecentActivities = () => {
  const {messages} = useIntl();

  const [recentActivityFilter, setRecentActivityFilter] = useState<any>({
    page: 1,
    page_size: PageSizes.EIGHT,
    row_status: RowStatus.ACTIVE,
  });
  const [recentActivityMasonryFilter] = useState<any>({});

  const [recentActivitiesMasonryList, setRecentActivitiesMasonryList] =
    useState<any>([]);
  const [recentActivitiesList, setRecentActivitiesList] = useState<any>([]);

  const page = useRef<any>(1);

  const {
    data: recentActivitiesFetchedData,
    metaData,
    isLoading: isLoadingRecentActivitiesFetchedData,
  } = useFetchPublicRecentActivities(recentActivityFilter);

  const {
    data: recentActivitiesFetchedMasonryData,
    isLoading: isLoadingRecentActivitiesFetchedMasonryData,
  } = useFetchPublicRecentActivities(recentActivityMasonryFilter);

  useEffect(() => {
    let data = recentActivitiesFetchedData?.filter((item: any) => {
      return item.collage_position === null;
    });

    setRecentActivitiesList(data);
  }, [recentActivitiesFetchedData]);

  useEffect(() => {
    let data = recentActivitiesFetchedMasonryData?.filter((item: any) => {
      return item.collage_position !== null;
    });
    let final = [];
    for (let i = 0; i < 4; i++) {
      final.push({
        collage_position: i + 1,
        collage_image_path: defaultImage,
      });
    }
    if (data) {
      for (let item of data) {
        let index = item.collage_position - 1;
        final[index] = {...item};
      }
    }

    setRecentActivitiesMasonryList(final);
  }, [recentActivitiesFetchedMasonryData]);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setRecentActivityFilter((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);

  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid container my={5}>
        <Grid item md={12}>
          <H1 className={classes.titleTypography} gutterBottom>
            {messages['recent_activities.label']}
          </H1>
          {isLoadingRecentActivitiesFetchedMasonryData ? (
            <Skeleton variant={'rectangular'} width={1150} height={400} />
          ) : recentActivitiesMasonryList &&
            recentActivitiesMasonryList.length > 0 ? (
            <RecentActivityMasonryGroupView
              items={recentActivitiesMasonryList}
            />
          ) : (
            <NoDataFoundComponent
              messageType={messages['recent_activities.label']}
              messageTextType={'h6'}
            />
          )}
        </Grid>
        <Grid item mt={8} xs={12}>
          <H2 className={classes.titleTypography} gutterBottom>
            {messages['all_activities.institute']}
          </H2>
          {isLoadingRecentActivitiesFetchedData ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  marginTop: '20px',
                  justifyContent: 'space-around',
                }}>
                <Skeleton variant='rectangular' width={250} height={150} />
                <Skeleton variant='rectangular' width={250} height={150} />
                <Skeleton variant='rectangular' width={250} height={150} />
                <Skeleton variant='rectangular' width={250} height={150} />
              </Box>
            </>
          ) : recentActivitiesList && recentActivitiesList?.length > 0 ? (
            <Grid container spacing={3}>
              {recentActivitiesList?.map((data: any) => (
                <Grid item xs={12} md={3} mt={3} key={data.id}>
                  <RecentActivityCardView activity={data} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <NoDataFoundComponent
              messageType={messages['recent_activities.label']}
              messageTextType={'h6'}
            />
          )}
        </Grid>
      </Grid>
      {metaData && metaData.total_page && metaData.total_page > 1 && (
        <Box className={classes.paginationBox}>
          <Stack spacing={2}>
            <Pagination
              page={page.current}
              count={metaData.total_page}
              color={'primary'}
              shape='rounded'
              onChange={onPaginationChange}
            />
          </Stack>
        </Box>
      )}
    </StyledContainer>
  );
};

export default RecentActivities;
