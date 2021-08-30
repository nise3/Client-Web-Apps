import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import PageMeta from '../../@crema/core/PageMeta';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import Badge from '../../@crema/core/Badge';
import {Box, Grid} from '@material-ui/core';
import AppCard from '../../@crema/core/AppCard';
import AppAnimation from '../../@crema/core/AppAnimate';

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
        <Grid item md={12}>
          <Box>
            <AppCard>
              <AppAnimation animation='transition.slideUpIn' delay={200}>
                AppCard
              </AppAnimation>
            </AppCard>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
