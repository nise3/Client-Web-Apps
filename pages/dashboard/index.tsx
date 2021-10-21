import React from 'react';
import PageMeta from '../../@crema/core/PageMeta';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import Badge from '../../@crema/core/Badge';
import {Box, Card, Grid} from '@mui/material';
import AddButton from '../../@softbd/elements/button/AddButton/AddButton';
import AppCircularProgress from '../../@crema/core/AppCircularProgress';
import AppLinearProgress from '../../@crema/core/AppLinearProgress';
import AppMenu from '../../@crema/core/AppMenu';
import AppSelect from '../../@crema/core/AppSelect';
import AppsSideBarFolderItem from '../../@crema/core/AppsSideBarFolderItem';
import AppsStarredIcon from '../../@crema/core/AppsStarredIcon';
import EmptyResult from '../../@crema/core/EmptyResult';
import GridContainer from '../../@crema/core/GridContainer';
import Loader from '../../@crema/core/Loader';
import SearchBar from '../../@crema/core/SearchBar';
import SemiCircleProgress from '../../@crema/core/SemiCircleProgress';
import NiseFrontPage from '../../@softbd/layouts/hoc/NiseFrontPage';
import {useTheme} from '@mui/system';

export default NiseFrontPage(() => {
  const theme = useTheme();
  console.log(theme);
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

        <Grid item md={12}>
          <Card title={'AppCircularProgress'}>
            <AppCircularProgress value={50}>
              <AddButton onClick={() => null} />
            </AppCircularProgress>
          </Card>
        </Grid>

        <Grid item md={12}>
          <Card title={'AppLinearProgress'}>
            <AppLinearProgress value={50} />
          </Card>
        </Grid>

        <Grid item md={12}>
          <Card title={'AppMenu'}>
            <AppMenu />
          </Card>
        </Grid>

        <Grid item md={12}>
          <Card title={'AppSelect'}>
            <AppSelect
              menus={[1, 2, 3, 4, 5]}
              defaultValue={1}
              onChange={() => null}
            />
          </Card>
        </Grid>

        <Grid item md={12}>
          <Card title={'AppsSideBarFolderItem'}>
            <AppsSideBarFolderItem
              item={{id: 1, name: 'Business', icon: 'add_circle'}}
              path={'/dashboard'}
            />
          </Card>
        </Grid>

        <Grid item md={12}>
          <Card title={'AppsStarredIcon'}>
            <AppsStarredIcon
              item={{isStarred: true}}
              onChange={(checked, item) => (item.isStarred = checked)}
            />
          </Card>
        </Grid>

        <Grid item md={12}>
          <Card title={'Badge'}>
            <Badge count={1} />
          </Card>
        </Grid>

        <Grid item md={12}>
          <Card title={'EmptyResult'}>
            <EmptyResult
              actionTitle={'Take action'}
              description={'Hello world'}
              onAction={() => console.log('okay')}
            />
          </Card>
        </Grid>

        <Grid item md={12}>
          <Card title={'Loader in center of app.'}>
            {'Loader' || <Loader />}
          </Card>
        </Grid>

        <Grid item md={12}>
          <Card title={'SearchBar'}>
            <SearchBar borderLight placeholder='Search…' />
          </Card>
        </Grid>

        <Grid item md={12}>
          <GridContainer>
            <Grid item>
              <Card title={'GridContainer'}>GridContainer</Card>
            </Grid>
          </GridContainer>
        </Grid>

        <Grid item md={12}>
          <Card title={'SemiCircleProgress'}>
            <SemiCircleProgress percentage={20} strokeWidth={20} />
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
