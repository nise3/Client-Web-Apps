import React from 'react';
import {useIntl} from 'react-intl';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import PageMeta from '../../../@crema/core/PageMeta';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const FourIRContributionsPage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/4IRContributions/FourIRContributionsPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['4IR.contribution']} />
      <FourIRContributionsPage />
    </>
  );
});
