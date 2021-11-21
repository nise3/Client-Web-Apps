import {Box, Container, Grid, Stack, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useFetchInstitutesRecentActivity} from '../../../services/instituteManagement/hooks';
import {useIntl} from 'react-intl';
import RecentActivityCardView from './RecentActivityCardView';
import RecentActivityMasonryGroupView from './RecentActivityMasonryGroupView';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {getShowInTypeFromPath} from '../../../@softbd/utilities/helpers';
import {useRouter} from 'next/router';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import {Pagination} from '@mui/lab';
import {useVendor} from '../../../@crema/utility/AppHooks';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';

let defaultImage =
  'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80';

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
  const vendor = useVendor();
  const router = useRouter();
  const showInType = getShowInTypeFromPath(router.asPath);

  const [recentActivityFilter, setRecentActivityFilter] = useState<any>({
    page: 1,
    page_size: 8,
    row_status: RowStatus.ACTIVE,
  });
  const [recentActivityMasonryFilter, setRecentActivityMasonryFilter] =
    useState<any>({});

  const [recentActivitiesMasonryList, setRecentActivitiesMasonryList] =
    useState<any>([]);
  const [recentActivitiesList, setRecentActivitiesList] = useState<any>([]);

  const page = useRef<any>(1);

  const {data: recentActivitiesFetchedData, metaData} =
    useFetchInstitutesRecentActivity(recentActivityFilter);
  const {data: recentActivitiesFetchedMasonryData} =
    useFetchInstitutesRecentActivity(recentActivityMasonryFilter);

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

  useEffect(() => {
    if (showInType) {
      let params: any = {
        show_in: showInType,
      };

      if (showInType == ShowInTypes.TSP) {
        params.institute_id = vendor?.id;
      }
      setRecentActivityFilter((prev: any) => {
        return {...prev, ...params};
      });
    }
  }, [showInType]);

  useEffect(() => {
    if (showInType) {
      let params: any = {
        show_in: showInType,
      };

      if (showInType == ShowInTypes.TSP) {
        //params.institute_id = 1;
      }
      setRecentActivityMasonryFilter((prev: any) => {
        return {...prev, ...params};
      });
    }
  }, [showInType]);

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
          <Typography
            className={classes.titleTypography}
            gutterBottom
            variant='h4'
            component='div'
            display={'flex'}>
            {messages['recent_activities.label']}
          </Typography>
          {recentActivitiesMasonryList &&
            recentActivitiesMasonryList.length > 0 && (
              <RecentActivityMasonryGroupView
                items={recentActivitiesMasonryList}
              />
            )}
        </Grid>
        <Grid item mt={8} xs={12}>
          <Typography
            className={classes.titleTypography}
            gutterBottom
            variant='h4'
            component='div'
            display={'flex'}>
            {messages['all_activities.institute']}
          </Typography>
          {recentActivitiesList && recentActivitiesList?.length > 0 ? (
            <Grid container spacing={5}>
              {recentActivitiesList?.map((data: any) => (
                <Grid item xs={12} md={3} mt={3} key={data.id}>
                  <RecentActivityCardView activity={data} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <NoDataFoundComponent />
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
