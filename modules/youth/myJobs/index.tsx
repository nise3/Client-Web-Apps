import React, {useCallback, useRef, useState} from 'react';
import {useFetchMyJobs} from '../../../services/youthManagement/hooks';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import JobListSearchSection from '../../industry/jobCircular/JobListSearchSection';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import {Container, Grid, Pagination, Stack} from '@mui/material';
import {H6} from '../../../@softbd/elements/common';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {ListAlt, Window} from '@mui/icons-material';
import PostLoadingSkeleton from '../common/PostLoadingSkeleton';
import JobCardComponent from '../../../@softbd/elements/JobCardComponent';
import NoDataFoundComponent from '../common/NoDataFoundComponent';
import {styled} from '@mui/material/styles';
import {useIntl} from 'react-intl';
import {FilterItem} from '../../../shared/Interface/common.interface';

const PREFIX = 'MyJobs';

const classes = {
  titleStyle: `${PREFIX}-titleStyle`,
  activeStyle: `${PREFIX}-activeStyle`,
  viewIcon: `${PREFIX}-viewIcon`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.titleStyle}`]: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
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
}));

const MyJobsPage = () => {
  const {messages, formatNumber} = useIntl();

  const [jobFilters, setJobFilters] = useState<any>({
    page_size: PageSizes.EIGHT,
  });
  const {
    data: jobs,
    metaData: jobsMetaData,
    isLoading,
    mutate: mutateJobs,
  } = useFetchMyJobs(jobFilters);

  const [viewType, setViewType] = useState(0); //viewType 1== grid view
  const page = useRef<any>(1);

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
    <React.Fragment>
      <JobListSearchSection
        addFilterKey={filterJobList}
        routeParamsFilters={filterJobListByRouteParams}
      />
      <StyledContainer maxWidth='lg' sx={{marginBottom: '25px'}}>
        <Grid container mt={4} justifyContent={'center'}>
          <Grid item md={12} mt={{xs: 4, md: 5}}>
            <Grid container spacing={4}>
              {isLoading ? (
                <PostLoadingSkeleton />
              ) : !jobs || jobs.length == 0 ? (
                <NoDataFoundComponent messageType={messages['common.job']} />
              ) : (
                <>
                  <Grid item xs={12}>
                    <Grid container justifyContent={'space-between'}>
                      <Grid item>
                        <H6 className={classes.titleStyle}>
                          <IntlMessages
                            id={'common.total_job_number'}
                            values={{
                              subject: formatNumber(jobs.length),
                            }}
                          />
                        </H6>
                      </Grid>
                      <Grid item>
                        <ListAlt
                          color={'primary'}
                          fontSize={'medium'}
                          className={
                            viewType == 0
                              ? classes.activeStyle
                              : classes.viewIcon
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
                            viewType == 1
                              ? classes.activeStyle
                              : classes.viewIcon
                          }
                          sx={{marginLeft: '10px'}}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {jobs.map((job: any) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={viewType == 1 ? 6 : 12}
                        md={viewType == 1 ? 3 : 12}
                        key={job.id}>
                        <JobCardComponent
                          job={job}
                          onPopupClose={onPopupClose}
                          isGridView={viewType == 1}
                          isShowingInMyJobs={true}
                        />
                      </Grid>
                    );
                  })}
                </>
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
    </React.Fragment>
  );
};

export default MyJobsPage;
