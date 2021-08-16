import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';
import {APP_TITLE} from '../../../common/constants';


const InstitutePage = asyncComponent(
  () => import('../../../modules/dashboard/InstituteManagement/InstitutePage'),
);
export default AppPage(() => (
  <>
    <PageMeta title={APP_TITLE} />
    <InstitutePage />
  </>
));


