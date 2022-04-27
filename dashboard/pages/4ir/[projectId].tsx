import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const FourIRStepsPage = asyncComponent(
  () => import('../../../modules/dashboard/4IRSteppers'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['4IR_steps.label'] as string} />
      <FourIRStepsPage />
    </>
  );
});
