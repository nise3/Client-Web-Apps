import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const FourIRGuideline = asyncComponent(
  () => import('../../../modules/dashboard/4IRGuideline/4IRGuidelinePage'),
);

export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['4ir.guideline'] as string} />
      <FourIRGuideline />
    </>
  );
});
