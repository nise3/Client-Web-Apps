import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const InstitutePage = asyncComponent(
  () => import('../../../modules/dashboard/Institute/InstitutePage'),
);
export default AppPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['institute.label']} />
      <InstitutePage />
    </>
  );
});
