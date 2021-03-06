import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const FreelanceCornerPage = asyncComponent(
  () =>
    import('../../../modules/dashboard/freelanceCorner/FreelanceCornerPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['freelance_corner.label'] as string} />
      <FreelanceCornerPage />
    </>
  );
});
