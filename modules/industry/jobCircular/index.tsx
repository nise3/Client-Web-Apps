import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Container, Grid, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import {H6} from '../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import PostLoadingSkeleton from '../../youth/common/PostLoadingSkeleton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useFetchPublicJobs} from '../../../services/IndustryManagement/hooks';
import JobCardComponent from '../../../@softbd/elements/JobCardComponent';
import JobListSearchSection from './JobListSearchSection';
import {
  getFilteredQueryParams,
  objectFilter,
} from '../../../@softbd/utilities/helpers';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import {ListAlt, Window} from '@mui/icons-material';
import {FilterItem} from '../../../shared/Interface/common.interface';
import CustomPaginationWithPageNumber from '../../youth/training/components/CustomPaginationWithPageNumber';
import {useRouter} from 'next/router';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';

const PREFIX = 'JobCircular';

const classes = {
  titleStyle: `${PREFIX}-titleStyle`,
  chipStyle: `${PREFIX}-chipStyle`,
  selectStyle: `${PREFIX}-selectStyle`,
  activeStyle: `${PREFIX}-activeStyle`,
  viewIcon: `${PREFIX}-viewIcon`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.titleStyle}`]: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },

  [`& .${classes.chipStyle}`]: {
    color: theme.palette.primary.light,
    padding: '3px 7px',
    marginLeft: '10px',
  },

  [`& .${classes.activeStyle}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: '2px',
    borderRadius: '3px',
    cursor: 'pointer',
  },

  [`& .${classes.viewIcon}`]: {
    cursor: 'pointer',
  },

  [`& .${classes.selectStyle}`]: {
    minWidth: '220px',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
}));

const JobCircular = () => {
  const {messages, formatNumber} = useIntl();
  const [jobFilters, setJobFilters] = useState({
    page_size: PageSizes.EIGHT,
  });
  const router = useRouter();
  const [viewType, setViewType] = useState(0); //viewType 1== grid view
  const page = useRef<any>(1);
  const authUser = useAuthUser<YouthAuthUser>();

  const {
    data: jobCircularList,
    isLoading: isLoadingJobCirculars,
    metaData: jobsMetaData,
    mutate: mutateJobs,
  } = useFetchPublicJobs(jobFilters);

  const urlParamsUpdate = useCallback((params: any) => {
    router.push(
      {
        pathname: router.pathname,
        query: params,
      },
      undefined,
      {shallow: true},
    );
  }, []);

  useEffect(() => {
    if (
      Number(router.query?.page) &&
      jobsMetaData &&
      jobsMetaData.total > 0 &&
      jobsMetaData.total_page < Number(router.query.page)
    ) {
      page.current = 1;
      setJobFilters((prev: any) => ({
        ...prev,
        page: page.current,
      }));
      urlParamsUpdate({...router.query, page: page.current});
    }
  }, [jobsMetaData, router.query]);

  useEffect(() => {
    let params: any = {
      page_size: PageSizes.EIGHT,
    };

    let modifiedParams = getFilteredQueryParams(
      router.query,
      PageSizes.EIGHT,
      page.current,
    );

    if (Object.keys(modifiedParams).length > 0) urlParamsUpdate(modifiedParams);
    params = {
      ...params,
      ...modifiedParams,
    };
    if (modifiedParams.page) {
      page.current = modifiedParams.page;
    }

    setJobFilters(objectFilter(params));
  }, [authUser]);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setJobFilters((params: any) => {
      return {...params, ...{page: currentPage}};
    });
    urlParamsUpdate({...router.query, page: currentPage});
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setJobFilters((prev: any) => ({
        ...prev,
        page_size: event.target.value ? event.target.value : PageSizes.EIGHT,
      }));
      urlParamsUpdate({...router.query, page_size: event.target.value});
    },
    [router.query],
  );

  const onPopupClose = () => {
    mutateJobs();
  };
  const filterJobList = useCallback((filterKey: any, filterValue: any) => {
    const newFilter: any = {};
    newFilter[filterKey] = filterValue;

    setJobFilters((prev: any) => {
      return objectFilter({...prev, ...newFilter});
    });
  }, []);

  const filterJobListByRouteParams = useCallback(
    (filters: Array<FilterItem>) => {
      const newFilter: any = {};
      filters.map((item) => {
        newFilter[item.filterKey] = item.filterValue;
      });

      setJobFilters((prev: any) => {
        return objectFilter({...prev, ...newFilter});
      });
    },
    [],
  );

  return (
    <>
      <JobListSearchSection
        addFilterKey={filterJobList}
        routeParamsFilters={filterJobListByRouteParams}
      />
      <StyledContainer maxWidth='lg' sx={{marginBottom: '25px'}}>
        <Grid container mt={4} justifyContent={'center'}>
          <Grid item md={12} mt={{xs: 4, md: 5}}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Grid container justifyContent={'space-between'}>
                  <Grid item>
                    {!isLoadingJobCirculars &&
                      jobCircularList &&
                      jobCircularList?.length > 0 && (
                        <H6 className={classes.titleStyle}>
                          <IntlMessages
                            id={'common.total_job_number'}
                            values={{
                              subject: formatNumber(jobCircularList.length),
                            }}
                          />
                        </H6>
                      )}
                  </Grid>

                  <Grid item>
                    <ListAlt
                      color={'primary'}
                      fontSize={'medium'}
                      className={
                        viewType == 0 ? classes.activeStyle : classes.viewIcon
                      }
                      onClick={() => {
                        setViewType(0);
                      }}
                    />
                    <Window
                      color={'primary'}
                      fontSize={'medium'}
                      onClick={() => {
                        setViewType(1);
                      }}
                      className={
                        viewType == 1 ? classes.activeStyle : classes.viewIcon
                      }
                      sx={{marginLeft: '10px'}}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {isLoadingJobCirculars ? (
                <PostLoadingSkeleton />
              ) : jobCircularList && jobCircularList?.length > 0 ? (
                jobCircularList?.map((jobCircular: any) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={viewType == 1 ? 6 : 12}
                      md={viewType == 1 ? 3 : 12}
                      key={jobCircular.id}>
                      <JobCardComponent
                        onPopupClose={onPopupClose}
                        job={jobCircular}
                        isGridView={viewType == 1}
                      />
                    </Grid>
                  );
                })
              ) : (
                <NoDataFoundComponent
                  messageType={messages['menu.job_circular']}
                />
              )}
              {jobsMetaData?.total_page > 1 && (
                <Grid
                  item
                  md={12}
                  mt={4}
                  display={'flex'}
                  justifyContent={'center'}>
                  <Stack spacing={2}>
                    <CustomPaginationWithPageNumber
                      count={jobsMetaData.total_page}
                      currentPage={1}
                      queryPageNumber={page.current}
                      onPaginationChange={onPaginationChange}
                      rowsPerPage={Number(router.query.page_size)}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Stack>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
};

export default JobCircular;
