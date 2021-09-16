import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import PageMeta from '../../@crema/core/PageMeta';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import Badge from '../../@crema/core/Badge';
import {Box, Grid} from '@material-ui/core';
import AppCard from '../../@crema/core/AppCard';
import AddButton from '../../@softbd/elements/button/AddButton/AddButton';
import AppCircularProgress from '../../@crema/core/AppCircularProgress';
import AppGrid from '../../@crema/core/AppGrid';
import AppLinearProgress from '../../@crema/core/AppLinearProgress';
import AppList from '../../@crema/core/AppList';
import AppMenu from '../../@crema/core/AppMenu';
import AppSelect from '../../@crema/core/AppSelect';
import AppsSideBarFolderItem from '../../@crema/core/AppsSideBarFolderItem';
import AppsStarredIcon from '../../@crema/core/AppsStarredIcon';
import EmptyResult from '../../@crema/core/EmptyResult';
import GridContainer from '../../@crema/core/GridContainer';
import Loader from '../../@crema/core/Loader';
import SearchBar from '../../@crema/core/SearchBar';
import SemiCircleProgress from '../../@crema/core/SemiCircleProgress';

export default AppPage(() => {
  const {successStack} = useNotiStack();

  const onShowMessage = () => {
    successStack(Math.random());
  };

  return (
    <React.Fragment>
      <PageMeta title='Dashboard' />
      <h1 onClick={() => onShowMessage()}>Welcome to Nise-3</h1>

      <Grid container spacing={5}>
        <Grid item>
          <Box style={{width: '50px'}}>
            <Badge count={'badge'} />
          </Box>
        </Grid>

        {/*<Grid item md={12}>*/}
        {/*    <AppAnimateGroup animation={'zoom'}> use case unknown. */}
        {/*      <AppCard>AppCard</AppCard>*/}
        {/*    </AppAnimateGroup>*/}
        {/*</Grid>*/}

        <Grid item md={12}>
          <AppCard
            title={'AppCard'}
            action={<AddButton onClick={() => null} />}>
            AppCard
          </AppCard>
        </Grid>

        <Grid item md={12}>
          <AppCard title={'AppCircularProgress'}>
            <AppCircularProgress value={50}>
              <AddButton onClick={() => null} />
            </AppCircularProgress>
          </AppCard>
        </Grid>

        {/*<Grid item md={12}>*/}
        {/*  <AppCard>*/}
        {/*    <AppErrorBoundary />*/}
        {/*  </AppCard>*/}
        {/*</Grid>*/}

        <Grid item md={12}>
          <AppCard title={'AppGrid'}>
            <AppGrid
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              renderRow={(item, index) => <li>{item}</li>}
            />
          </AppCard>
        </Grid>

        <Grid item md={12}>
          <AppCard title={'AppLinearProgress'}>
            <AppLinearProgress value={50} />
          </AppCard>
        </Grid>

        <Grid item md={12}>
          <AppCard title={'AppList'}>
            <AppList
              data={[1, 2, 3, 4, 5]}
              renderRow={(item, index) => <li>{item}</li>}
            />
          </AppCard>
        </Grid>

        <Grid item md={12}>
          <AppCard title={'AppMenu'}>
            <AppMenu />
          </AppCard>
        </Grid>

        {/*<Grid item md={12}>*/}
        {/*  <AppCard title={'AppNavLink not working.'}>*/}
        {/*    <AppNavLink to={'/dashboard'}>dashboard</AppNavLink>*/}
        {/*  </AppCard>*/}
        {/*</Grid>*/}

        <Grid item md={12}>
          <AppCard title={'AppSelect'}>
            <AppSelect
              menus={[1, 2, 3, 4, 5]}
              defaultValue={1}
              onChange={() => null}
            />
          </AppCard>
        </Grid>

        <Grid item md={12}>
          <AppCard title={'AppsSideBarFolderItem'}>
            <AppsSideBarFolderItem
              item={{id: 1, name: 'Business', icon: 'add_circle'}}
              path={'/dashboard'}
            />
          </AppCard>
        </Grid>

        <Grid item md={12}>
          <AppCard title={'AppsStarredIcon'}>
            <AppsStarredIcon
              item={{isStarred: true}}
              onChange={(checked, item) => (item.isStarred = checked)}
            />
          </AppCard>
        </Grid>

        <Grid item md={12}>
          <AppCard title={'Badge'}>
            <Badge count={1} />
          </AppCard>
        </Grid>

        <Grid item md={12}>
          <AppCard title={'EmptyResult'}>
            <EmptyResult
              actionTitle={'Take action'}
              description={'Hello world'}
              onAction={() => console.log('okay')}
            />
          </AppCard>
        </Grid>

        <Grid item md={12}>
          <AppCard title={'Loader in center of app.'}>
            {'Loader' || <Loader />}
          </AppCard>
        </Grid>

        <Grid item md={12}>
          <AppCard title={'SearchBar'}>
            <SearchBar borderLight placeholder='Search…' />
          </AppCard>
        </Grid>

        <Grid item md={12}>
          <GridContainer>
            <Grid item>
              <AppCard title={'GridContainer'}>GridContainer</AppCard>
            </Grid>
          </GridContainer>
        </Grid>

        <Grid item md={12}>
          <AppCard title={'SemiCircleProgress'}>
            <SemiCircleProgress percentage={20} strokeWidth={20} />
          </AppCard>
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
