import React from 'react';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const YouthTrainingPage = asyncComponent(
  () => import('../../../modules/youth/training'),
);
export default InstituteDefaultFrontPage(() => {
  return (
    <>
      <PageMeta title={'Training'} />
      <YouthTrainingPage />
    </>
  );
});
