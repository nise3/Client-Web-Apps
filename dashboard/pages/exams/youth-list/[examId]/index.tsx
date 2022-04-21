import asyncComponent from '../../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const YouthListPage = asyncComponent(
  () => import('../../../../../modules/dashboard/exams/youthList/YouthList'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['examinee.label'] as string} />
      <YouthListPage />
    </>
  );
});
