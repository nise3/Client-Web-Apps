import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';

const NearByTrainingCenters = asyncComponent(
  () => import('../../../modules/youth/training/AllNearbyTrainingCenter'),
);
export default NiseFrontPage(() => {
  return (
    <>
      <PageMeta title={'Training'} />
      <NearByTrainingCenters />
    </>
  );
});
