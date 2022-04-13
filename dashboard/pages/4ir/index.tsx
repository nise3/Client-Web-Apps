import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const FourIRProjectListPage = asyncComponent(
  () => import('../../../modules/dashboard/4IRCS/FourIRCSPage'),
);

export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['4ir_project.label'] as string} />
      <FourIRProjectListPage />
    </>
  );
});
