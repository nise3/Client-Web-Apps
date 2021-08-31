import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const ProgrammePage = asyncComponent(
  () => import('../../../modules/dashboard/programmes/ProgrammePage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Programme' />
    <ProgrammePage />
  </>
));
