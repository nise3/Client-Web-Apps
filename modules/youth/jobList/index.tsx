import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Container, Grid, Pagination, Stack} from '@mui/material';
import {useIntl} from 'react-intl';
import {H6} from '../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import PostLoadingSkeleton from '../../youth/common/PostLoadingSkeleton';
import JobCardComponent from '../../../@softbd/elements/JobCardComponent';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useFetchPublicJobs} from '../../../services/IndustryManagement/hooks';
import JobCategory from '../../../@softbd/utilities/JobCategorie';
import {useRouter} from 'next/router';
import PageSizes from '../../../@softbd/utilities/PageSizes';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import JobListSearchSection from '../../industry/jobCircular/JobListSearchSection';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import {ListAlt, Window} from '@mui/icons-material';
import {FilterItem} from '../../../shared/Interface/common.interface';

const PREFIX = 'JobList';

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

const JobList = () => {
  const {messages, formatNumber} = useIntl();
  const router = useRouter();
  const {jobCategory} = router.query;
  const [jobFilters, setJobFilters] = useState<any>({
    page_size: PageSizes.EIGHT,
  });
  const authYouth = useAuthUser<YouthAuthUser>();
  const [youthSkillIdArray, setYouthSkillIdArray] = useState<any>([]);
  const [viewType, setViewType] = useState(0); //viewType 1== grid view
  const page = useRef<any>(1);

  const {
    data: jobs,
    metaData: jobsMetaData,
    isLoading,
    mutate: mutateJobs,
  } = useFetchPublicJobs(jobFilters);

  useEffect(() => {
    if (authYouth?.skills) {
      const skillIds = authYouth.skills.map((skill: any) => skill.id);
      setYouthSkillIdArray(skillIds);
    }
  }, [authYouth]);

  useEffect(() => {
    page.current = 1;
    switch (jobCategory) {
      case JobCategory.RECENT:
        setJobFilters((params: any) => ({
          ...params,
          type: JobCategory.RECENT,
          page: page.current,
        }));
        break;
      case JobCategory.POPULAR:
        setJobFilters((params: any) => ({
          ...params,
          type: JobCategory.POPULAR,
          page: page.current,
        }));
        break;
      case JobCategory.NEARBY:
        setJobFilters((params: any) => ({
          ...params,
          loc_district_id: authYouth?.loc_district_id,
          page: page.current,
        }));
        break;
      case JobCategory.SKILL_MATCHING:
        setJobFilters((params: any) => ({
          ...params,
          skill_ids: youthSkillIdArray,
          page: page.current,
        }));
        break;
    }
  }, [jobCategory, youthSkillIdArray]);

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
                  {!isLoading && (
                    <Grid item>
                      <H6 className={classes.titleStyle}>
                        <IntlMessages
                          id={'common.total_job_number'}
                          values={{
                            subject: formatNumber(jobs ? jobs.length : 0),
                          }}
                        />
                      </H6>
                    </Grid>
                  )}

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
              {isLoading ? (
                <PostLoadingSkeleton />
              ) : (
                jobs?.map((job: any) => {
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
                      />
                    </Grid>
                  );
                })
              )}

              {(!jobs || (jobs && jobs.length <= 0)) && (
                <NoDataFoundComponent messageType={messages['common.job']} />
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

export default JobList;
