import React from 'react';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import {Box} from '@mui/material';

const YouthTrainingPage = asyncComponent(
  () => import('../../../modules/youth/training'),
);
export default InstituteDefaultFrontPage(() => {
  return (
    <>
      <PageMeta title={'Training'} />
      <Box mt={1 / 4}>
        <YouthTrainingPage />
      </Box>
    </>
  );
});
