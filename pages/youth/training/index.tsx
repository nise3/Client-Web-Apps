import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const YouthTrainingPage = asyncComponent(
  () => import('../../../modules/youth/training'),
);
export default YouthFrontPage(() => {
  return (
    <>
      <PageMeta title={'Training'} />
      <YouthTrainingPage />
    </>
  );
});
