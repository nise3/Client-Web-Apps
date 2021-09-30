import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import FrontPage from '../../@crema/hoc/FrontPage';
import React from 'react';

const YouthTrainingPage = asyncComponent(
  () => import('../../modules/youthTraining'),
);
export default FrontPage(() => {
  return (
    <>
      <PageMeta title={'Training'} />
      <YouthTrainingPage />
    </>
  );
});
