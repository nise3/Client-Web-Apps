import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import PageMeta from '../../@crema/core/PageMeta';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import Badge from '../../@crema/core/Badge';
import {Box, Grid} from '@material-ui/core';
import AppCard from '../../@crema/core/AppCard';
import AddButton from '../../@softbd/elements/button/AddButton/AddButton';
import AppCircularProgress from '../../@crema/core/AppCircularProgress';

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
        {/*  <Box> */}
        {/*    <AppAnimateGroup animation={'zoom'}> use case unknown. */}
        {/*      <AppCard>AppCard</AppCard>*/}
        {/*    </AppAnimateGroup>*/}
        {/*  </Box>*/}
        {/*</Grid>*/}
        <Grid item md={12}>
          <Box>
            <AppCard
              title={'Hello world'}
              action={<AddButton onClick={() => null} />}>
              AppCard
            </AppCard>
          </Box>
        </Grid>

        {/*<Grid item md={12}>*/}
        {/*  <Box>*/}
        {/*    <AppCircularProgress value={}><AddButton onClick={() => null} /></AppCircularProgress>*/}
        {/*  </Box>*/}
        {/*</Grid>*/}
      </Grid>
    </React.Fragment>
  );
});
