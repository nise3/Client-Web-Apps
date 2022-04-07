import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';

const Publications = asyncComponent(
  () => import('../../../modules/nise/publications/publications'),
);
export default NiseFrontPage(() => {
  return (
    <>
      <PageMeta title={'Publications'} />
      <Publications />
    </>
  );
});
