import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import React from 'react';
import NiseFrontPage from '../../@softbd/layouts/hoc/NiseFrontPage';

const Jobs = asyncComponent(() => import('../../modules/jobs/index'));
export default NiseFrontPage(() => {
  return (
    <>
      <PageMeta title={'Jobs'} />
      <Jobs />
    </>
  );
});
