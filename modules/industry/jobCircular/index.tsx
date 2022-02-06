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

const PREFIX = 'JobCircular';

const classes = {
  titleStyle: `${PREFIX}-titleStyle`,
  chipStyle: `${PREFIX}-chipStyle`,
  selectStyle: `${PREFIX}-selectStyle`,
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

  [`& .${classes.selectStyle}`]: {
    minWidth: '220px',
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
}));

const JobCircular = () => {
  const {messages, formatNumber} = useIntl();
  const [jobFilters, setJobFilters] = useState({});
  const page = useRef<any>(1);

  const {
    data: jobCircularList,
    isLoading: isLoadingJobCirculars,
    metaData: jobsMetaData,
  } = useFetchPublicJobs(jobFilters);

  // const onSearch = useCallback(() => {
  //   page.current = 1;
  //   setJobFilters((params: any) => {
  //     return {
  //       ...params,
  //       ...{job_title: inputFieldRef.current?.value, page: page.current},
  //     };
  //   });
  // }, []);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setJobFilters((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);

  const filterJobList = useCallback((filterKey: any, filterValue: any) => {
    const newFilter: any = {};
    newFilter[filterKey] = filterValue;

    setJobFilters((prev: any) => {
      return {...prev, ...newFilter};
    });
  }, []);

  return (
    <>
      <JobListSearchSection addFilterKey={filterJobList} />
      <StyledContainer maxWidth='lg' sx={{marginBottom: '25px'}}>
        <Grid container mt={4} justifyContent={'center'}>
          <Grid item md={12} mt={{xs: 4, md: 5}}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Grid container justifyContent={'space-between'}>
                  {!isLoadingJobCirculars &&
                    jobCircularList &&
                    jobCircularList?.length > 0 && (
                      <Grid item>
                        <H6 className={classes.titleStyle}>
                          <IntlMessages
                            id={'common.total_job_number'}
                            values={{
                              subject: formatNumber(jobCircularList.length),
                            }}
                          />
                        </H6>
                      </Grid>
                    )}
                </Grid>
              </Grid>
              {isLoadingJobCirculars ? (
                <PostLoadingSkeleton />
              ) : jobCircularList && jobCircularList?.length > 0 ? (
                jobCircularList?.map((jobCircular: any) => {
                  return (
                    <Grid item xs={12} sm={12} md={12} key={jobCircular.id}>
                      <JobCardComponent job={jobCircular} />
                    </Grid>
                  );
                })
              ) : (
                <NoDataFoundComponent
                  message={messages['common.no_data_found'] as string}
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
