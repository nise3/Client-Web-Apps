import React, {useCallback, useRef, useState} from 'react';
import {
  Box,
  Container,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Stack,
} from '@mui/material';
import {useIntl} from 'react-intl';
import {H6} from '../../../@softbd/elements/common';
import SearchIcon from '@mui/icons-material/Search';
import {styled} from '@mui/material/styles';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import PostLoadingSkeleton from '../../youth/common/PostLoadingSkeleton';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useFetchPublicJobs} from '../../../services/IndustryManagement/hooks';
import JobCardComponent from '../../../@softbd/elements/JobCardComponent';

const PREFIX = 'JobCircular';

const classes = {
  titleStyle: `${PREFIX}-titleStyle`,
  gridMargin: `${PREFIX}-gridMargin`,
  filterBox: `${PREFIX}-filterBox`,
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

  [`& .${classes.gridMargin}`]: {
    marginLeft: '15px',
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
      marginTop: '15px',
    },
  },

  [`& .${classes.filterBox}`]: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
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
  const inputFieldRef = useRef<any>();
  const page = useRef<any>(1);

  const {
    data: jobCircularList,
    isLoading: isLoadingJobCirculars,
    metaData: jobsMetaData,
  } = useFetchPublicJobs(jobFilters);

  const onSearch = useCallback(() => {
    page.current = 1;
    setJobFilters((params: any) => {
      return {
        ...params,
        ...{job_title: inputFieldRef.current?.value, page: page.current},
      };
    });
  }, []);

  const onPaginationChange = useCallback((event: any, currentPage: number) => {
    page.current = currentPage;
    setJobFilters((params: any) => {
      return {...params, ...{page: currentPage}};
    });
  }, []);

  return (
    <>
      <StyledContainer maxWidth='lg' sx={{marginBottom: '25px'}}>
        <Grid container mt={4} justifyContent={'center'}>
          <Grid item md={12}>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <Box className={classes.filterBox}></Box>
              </Grid>
              <Grid item>
                <Paper
                  style={{
                    display: 'flex',
                    width: 220,
                    height: '40px',
                  }}
                  className={classes.gridMargin}>
                  <InputBase
                    size={'small'}
                    style={{
                      paddingLeft: '20px',
                    }}
                    placeholder={messages['common.search'] as string}
                    inputProps={{'aria-label': 'Search'}}
                    inputRef={inputFieldRef}
                    onKeyDown={(event) => {
                      if (event.code == 'Enter') onSearch();
                    }}
                  />
                  <IconButton
                    sx={{p: '5px'}}
                    aria-label='search'
                    onClick={onSearch}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
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
