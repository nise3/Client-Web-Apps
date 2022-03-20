import React, {useCallback, useRef, useState} from 'react';
import {Container, Grid, Pagination, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import {H6} from '../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import PostLoadingSkeleton from '../../youth/common/PostLoadingSkeleton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useFetchPublicJobs} from '../../../services/IndustryManagement/hooks';
import JobCardComponent from '../../../@softbd/elements/JobCardComponent';
import JobListSearchSection from './JobListSearchSection';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import {ListAlt, Window} from '@mui/icons-material';
import {FilterItem} from '../../../shared/Interface/common.interface';

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
  const [viewType, setViewType] = useState(0); //viewType 1== grid view
  const page = useRef<any>(1);

  const {
    data: jobCircularList,
    isLoading: isLoadingJobCirculars,
    metaData: jobsMetaData,
    mutate: mutateJobs,
  } = useFetchPublicJobs(jobFilters);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setJobFilters((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);

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
                    <Pagination
                      page={page.current}
                      count={jobsMetaData.total_page}
                      onChange={onPaginationChange}
                      color={'primary'}
                      shape='rounded'
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
