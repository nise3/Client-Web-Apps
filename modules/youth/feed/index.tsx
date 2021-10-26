import React, {useCallback, useState} from 'react';
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

const useStyles = makeStyles((theme: CremaTheme) => ({
  container: {
    height: '81.5vh',
    boxSizing: 'border-box',
    overflow: 'hidden',
    marginTop: '40px',
  },
  root: {
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
  scrollBarStyle: {
    height: '82.5vh',
    overflowY: 'hidden',
    '&:hover': {
      overflowY: 'auto',
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

  const [filters, setFilters] = useState<any>({});

  const filterPost = useCallback(
    (filterKey: string, filterValue: number | null) => {
      const newFilter: any = {};
      newFilter[filterKey] = filterValue;

      setFilters((prev: any) => {
        return {...prev, ...newFilter};
      });
    },
    [],
  );

  return (
    <Scrollbar className={classes.rootScrollBar}>
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
          <Grid item xs={12} md={6}>
            <Scrollbar className={classes.scrollBar}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <OverviewSection addFilter={filterPost} />
                </Grid>
                <Grid item xs={12}>
                  <FeatureJobSection />
                </Grid>
                <Grid item xs={12}>
                  <PostSection filters={filters} />
                </Grid>
              </Grid>
            </Scrollbar>
          </Grid>
          <Grid item xs={12} md={3}>
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
    </Scrollbar>
  );
};

export default YouthFeedPage;
