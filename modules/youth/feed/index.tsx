import React, {useCallback, useRef, useState} from 'react';
import BasicInfo from './BasicInfo';
import OverviewSection from './OverviewSection';
import FeatureJobSection from './FeatureJobSection';
import PostSection from './PostSection';
import RecentJobSection from './RecentJobSection';
import CourseListSection from './CourseListSection';
import SideMenu from '../../../@softbd/elements/YouthSideMenu';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import {Container, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';
import Scrollbar from '../../../@crema/core/Scrollbar';
import {debounce} from 'lodash';

const useStyles = makeStyles((theme: CremaTheme) => ({
  container: {
    marginTop: '0px',
    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 70px)',
      boxSizing: 'border-box',
      overflowY: 'hidden',
    },
  },
  root: {
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  scrollBarStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 70px)',
      overflowY: 'hidden',
      '&:hover': {
        overflowY: 'auto',
      },
    },
    '&>.ps__rail-y': {
      height: 'calc(100% - 40px) !important',
      marginBottom: 20,
      marginTop: 20,
    },
  },

  rootScrollBar: {
    overflowY: 'hidden',
  },

  scrollBar: {
    height: '82.5vh',
    overflowY: 'hidden',
    '&:hover': {
      $rootScrollBar: {
        overflowY: 'auto',
      },
    },
  },
}));

const YouthFeedPage = () => {
  const classes: any = useStyles();
  const [loadingMainPostData, setLoadingMainPostData] = useState(false);

  const [filters, setFilters] = useState<any>({page_size: 5});
  const pageIndex = useRef(1);

  const filterPost = useCallback(
    (filterKey: string, filterValue: number | null) => {
      const newFilter: any = {};
      newFilter[filterKey] = filterValue;
      pageIndex.current = 1;
      newFilter['page'] = pageIndex.current;

      setFilters((prev: any) => {
        return {...prev, ...newFilter};
      });
    },
    [filters],
  );

  const onScrollMainPostContent = (e: any) => {
    if (!loadingMainPostData) {
      console.log('loadingMainPostData', loadingMainPostData);
      setFilters((prev: any) => {
        return {...prev, page: pageIndex.current + 1};
      });
      pageIndex.current += 1;
    }
  };

  const onScrollUpPostContent = () => {
    if (pageIndex.current > 1) {
      setFilters((prev: any) => {
        return {...prev, page: pageIndex.current - 1};
      });
      pageIndex.current -= 1;
    }
  };

  return (
    <Container maxWidth={'lg'} className={classes.container}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={3}>
          <Scrollbar className={classes.scrollBarStyle}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <BasicInfo />
              </Grid>
              <Grid item xs={12}>
                <SideMenu />
              </Grid>
            </Grid>
          </Scrollbar>
        </Grid>
        <Grid item xs={12} md={6} order={{xs: 3, md: 2}}>
          <Scrollbar
            className={classes.scrollBarStyle}
            onYReachEnd={debounce(onScrollMainPostContent, 1000)}
            onYReachStart={debounce(onScrollUpPostContent, 1000)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <OverviewSection addFilter={filterPost} />
              </Grid>
              <Grid item xs={12}>
                <FeatureJobSection />
              </Grid>
              <Grid item xs={12}>
                <PostSection
                  filters={filters}
                  pageIndex={pageIndex.current}
                  setLoadingMainPostData={setLoadingMainPostData}
                />
              </Grid>
            </Grid>
          </Scrollbar>
        </Grid>
        <Grid item xs={12} md={3} order={{xs: 2, md: 3}}>
          <Scrollbar className={classes.scrollBarStyle}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <RecentJobSection />
              </Grid>
              <Grid item xs={12}>
                <CourseListSection />
              </Grid>
            </Grid>
          </Scrollbar>
        </Grid>
      </Grid>
    </Container>
  );
};

export default YouthFeedPage;