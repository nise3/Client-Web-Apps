import React from 'react';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import {Grid, Paper} from '@mui/material';
import {H2} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';

const YouthTrainingPage = asyncComponent(
  () => import('../../../modules/youth/training'),
);

export default InstituteDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.training_courses']} />
      <Grid container sx={{maxWidth: '100%'}}>
        <Grid item xs={12} textAlign={'center'}>
          <Paper>
            <H2 py={5}>{messages['apply_liked_course.institute']}</H2>
          </Paper>
        </Grid>
      </Grid>
      <YouthTrainingPage />
    </>
  );
});
