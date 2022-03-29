import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const RPLLevelsPage = asyncComponent(
  () => import('../../../modules/dashboard/rplLevels/LevelPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['rpl_levels.label']} />
      <RPLLevelsPage />
    </>
  );
});
