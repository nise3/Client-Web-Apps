import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import InstituteFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const NISETrainingPage = asyncComponent(
  () => import('../../../modules/youth/training'),
);
export default InstituteFrontPage(() => {
  return (
    <>
      <PageMeta title={'Training'} />
      <NISETrainingPage />
    </>
  );
});
